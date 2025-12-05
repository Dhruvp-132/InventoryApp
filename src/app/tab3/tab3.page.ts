import { Component } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { InventoryService, InventoryItem } from '../services/inventory.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {

  searchName = '';
  itemToEdit: InventoryItem | null = null;
  isLoading = false;

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

  async searchForEdit() {
    if (!this.searchName.trim()) {
      this.showAlert('Error', 'Please enter an item name');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Searching...',
      spinner: 'crescent'
    });
    await loading.present();

    this.inventoryService.searchItemByName(this.searchName.trim()).subscribe({
      next: async (response: any) => {
        await loading.dismiss();
        let raw: any | null = null;
        if (response && typeof response === 'object' && !Array.isArray(response)) {
          raw = response;
        } else if (Array.isArray(response) && response.length > 0) {
          raw = response[0];
        }

        if (!raw) {
          this.itemToEdit = null;
          this.showAlert('Not Found', 'Item not found');
          return;
        }

        this.itemToEdit = this.mapItem(raw);
      },
      error: async () => {
        await loading.dismiss();
        this.itemToEdit = null;
        this.showAlert('Error', 'Failed to search item');
      }
    });
  }

  // map server data format to our interface
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

  isEditValid(): boolean {
    if (!this.itemToEdit) return false;
    return !!(this.itemToEdit.itemName && this.itemToEdit.category &&
              this.itemToEdit.supplierName && this.itemToEdit.stockStatus &&
              this.itemToEdit.quantity >= 0 && this.itemToEdit.price >= 0);
  }

  // build payload in snake_case for api
  private buildUpdatePayload(): any {
    if (!this.itemToEdit) return null;

    const payload: any = {
      item_name: this.itemToEdit.itemName.trim(),
      category: this.itemToEdit.category,
      quantity: Math.round(Number(this.itemToEdit.quantity)),
      price: Math.round(Number(this.itemToEdit.price)),
      supplier_name: this.itemToEdit.supplierName.trim(),
      stock_status: this.itemToEdit.stockStatus,
      featured_item: this.itemToEdit.featuredItem ? 1 : 0
    };

    if (this.itemToEdit.specialNote && this.itemToEdit.specialNote.trim() !== '') {
      payload.special_note = this.itemToEdit.specialNote.trim();
    }

    return payload;
  }

  async updateItem() {
    if (!this.itemToEdit || !this.isEditValid()) {
      this.showAlert('Error', 'Please fix form errors');
      return;
    }

    const payload = this.buildUpdatePayload();
    const loading = await this.loadingController.create({
      message: 'Updating...',
      spinner: 'crescent'
    });
    await loading.present();

    this.inventoryService.updateItem(this.searchName.trim(), payload as unknown as InventoryItem).subscribe({
      next: async () => {
        await loading.dismiss();
        this.showAlert('Success', 'Item updated successfully');
      },
      error: async () => {
        await loading.dismiss();
        this.showAlert('Error', 'Failed to update item');
      }
    });
  }

  async deleteItem() {
    if (!this.searchName.trim()) {
      this.showAlert('Error', 'Please enter an item name');
      return;
    }

    // confirm before deleting
    const confirm = await this.alertController.create({
      header: 'Confirm Delete',
      message: `Delete "${this.searchName.trim()}"?`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete',
          role: 'destructive',
          handler: async () => {
            const loading = await this.loadingController.create({
              message: 'Deleting...',
              spinner: 'crescent'
            });
            await loading.present();

            this.inventoryService.deleteItem(this.searchName.trim()).subscribe({
              next: async () => {
                await loading.dismiss();
                this.itemToEdit = null;
                this.showAlert('Success', 'Item deleted successfully');
              },
              error: async () => {
                await loading.dismiss();
                this.showAlert('Error', 'Failed to delete item');
              }
            });
          }
        }
      ]
    });

    await confirm.present();
  }

  async showHelp() {
    const alert = await this.alertController.create({
      header: 'Help',
      message: 'Enter an item name to search, then edit or delete the item.',
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
