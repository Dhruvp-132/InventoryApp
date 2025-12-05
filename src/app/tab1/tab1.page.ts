import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { InventoryService, InventoryItem } from '../services/inventory.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false
})
export class Tab1Page implements OnInit {

  items: InventoryItem[] = [];
  searchName: string = '';
  searchedItem: InventoryItem | null = null;
  isLoading: boolean = false;

  constructor(
    private alertController: AlertController,
    private loadingController: LoadingController,
    private inventoryService: InventoryService
  ) {}

  // server returns different field names sometimes, need to handle both
  private mapItem(raw: any): InventoryItem {
    return {
      itemId: String(raw.itemId || raw.item_id || ''),
      itemName: String(raw.itemName || raw.item_name || raw.name || ''),
      category: String(raw.category || ''),
      quantity: Number(raw.quantity || 0),
      price: Number(raw.price || 0),
      supplierName: String(raw.supplierName || raw.supplier_name || ''),
      stockStatus: String(raw.stockStatus || raw.stock_status || ''),
      specialNote: raw.specialNote || raw.special_note || '',
      featuredItem: raw.featuredItem === true || Number(raw.featured_item || raw.featuredItem || 0) === 1
    };
  }

  ngOnInit() {
    this.loadAllItems();
  }

  async loadAllItems() {
    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'crescent'
    });
    await loading.present();

    this.inventoryService.getAllItems().subscribe({
      next: (response: any) => {
        // api sometimes returns array directly or wrapped in data object
        if (Array.isArray(response)) {
          this.items = response.map(r => this.mapItem(r));
        } else if (response?.data && Array.isArray(response.data)) {
          this.items = response.data.map((r: any) => this.mapItem(r));
        } else {
          this.items = [];
        }
        this.isLoading = false;
        loading.dismiss();
      },
      error: (error: any) => {
        this.isLoading = false;
        loading.dismiss();
        this.showAlert('Error', 'Failed to load items from server.');
      }
    });
  }

  async searchItem() {
    if (!this.searchName || this.searchName.trim() === '') {
      this.showAlert('Error', 'Please enter an item name');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Searching...',
      spinner: 'crescent'
    });
    await loading.present();

    this.inventoryService.searchItemByName(this.searchName.trim()).subscribe({
      next: (response: any) => {
        // handle single object or array response
        if (response && typeof response === 'object' && !Array.isArray(response)) {
          this.searchedItem = this.mapItem(response);
        } else if (Array.isArray(response) && response.length > 0) {
          this.searchedItem = this.mapItem(response[0]);
        } else {
          this.searchedItem = null;
          this.showAlert('Not Found', 'Item not found');
        }
        loading.dismiss();
      },
      error: () => {
        this.searchedItem = null;
        loading.dismiss();
        this.showAlert('Error', 'Failed to search item');
      }
    });
  }

  clearSearch() {
    this.searchName = '';
    this.searchedItem = null;
  }

  // returns color class for status badge
  getStockStatusColor(status: string): string {
    if (!status) return 'medium';
    const s = status.toLowerCase();
    if (s === 'in stock') return 'success';
    if (s === 'low stock') return 'warning';
    if (s === 'out of stock') return 'danger';
    return 'medium';
  }

  async showHelp() {
    const alert = await this.alertController.create({
      header: 'Help',
      message: 'Enter an item name to search. All items are listed below.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}