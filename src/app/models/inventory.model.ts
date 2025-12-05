export interface InventoryItem {
  item_id?: number; // Auto-incrementing (optional on send)
  name: string;
  category: 'Electronics' | 'Furniture' | 'Clothing' | 'Tools' | 'Miscellaneous';
  quantity: number;
  price: number;
  supplier_name: string;
  stock_status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  featured_item: number; // 0 or 1
  special_note?: string; // Optional
}