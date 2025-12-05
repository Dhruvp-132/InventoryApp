import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { InventoryService, InventoryItem } from '../services/inventory.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page implements OnInit {

  newItem: InventoryItem = {
    itemId: '',
    itemName: '',
    category: '',
    quantity: 0,
    price: 0,
    supplierName: '',
    stockStatus: '',
    specialNote: '',
    featuredItem: false
  };

  featuredItems: InventoryItem[] = [];
  isLoadingFeatured = false;

  readonly categories = [
    'Electronics',
    'Furniture',
    'Clothing',
    'Tools',
    'Miscellaneous'
  ];

  readonly stockStatuses = [
    'In Stock',
    'Low Stock',
    'Out of Stock'
  ];

  constructor(
    private alertController: AlertController,
    private loadingController: LoadingController,
    private inventoryService: InventoryService
  ) {}

  ngOnInit(): void {
    this.loadFeaturedItems();
  }

  async loadFeaturedItems() {
    this.isLoadingFeatured = true;
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'crescent'
    });
    await loading.present();

    this.inventoryService.getAllItems().subscribe({
      next: (response: any) => {
        let items: any[] = [];
        if (Array.isArray(response)) {
          items = response;
        } else if (response?.data && Array.isArray(response.data)) {
          items = response.data;
        }

        this.featuredItems = items
          .map(raw => this.mapItem(raw))
          .filter(item => item.featuredItem);

        this.isLoadingFeatured = false;
        loading.dismiss();
      },
      error: () => {
        this.isLoadingFeatured = false;
        loading.dismiss();
        this.showAlert('Error', 'Failed to load featured items');
      }
    });
  }

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

  isFormValid(): boolean {
    return !!(this.newItem.itemName && this.newItem.category &&
              this.newItem.supplierName && this.newItem.stockStatus &&
              this.newItem.quantity >= 0 && this.newItem.price >= 0);
  }

  async submitNewItem() {
    if (!this.isFormValid()) {
      this.showAlert('Error', 'Please fill in all required fields');
      return;
    }

    const payload: any = {
      item_name: this.newItem.itemName.trim(),
      category: this.newItem.category,
      quantity: Math.round(Number(this.newItem.quantity)),
      price: Math.round(Number(this.newItem.price)),
      supplier_name: this.newItem.supplierName.trim(),
      stock_status: this.newItem.stockStatus,
      featured_item: this.newItem.featuredItem ? 1 : 0
    };

    if (this.newItem.specialNote && this.newItem.specialNote.trim() !== '') {
      payload.special_note = this.newItem.specialNote.trim();
    }

    const loading = await this.loadingController.create({
      message: 'Saving...',
      spinner: 'crescent'
    });
    await loading.present();

    this.inventoryService.addItem(payload as unknown as InventoryItem).subscribe({
      next: async () => {
        await loading.dismiss();
        this.showAlert('Success', 'Item added successfully');
        this.resetForm();
        this.loadFeaturedItems();
      },
      error: async () => {
        await loading.dismiss();
        this.showAlert('Error', 'Failed to add item');
      }
    });
  }

  resetForm() {
    this.newItem = {
      itemId: '',
      itemName: '',
      category: '',
      quantity: 0,
      price: 0,
      supplierName: '',
      stockStatus: '',
      specialNote: '',
      featuredItem: false
    };
  }

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
      message: 'Fill in all required fields to add a new item. Featured items are shown below.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

}
