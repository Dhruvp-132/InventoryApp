import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface InventoryItem {
  itemId: string;
  itemName: string;
  category: string;
  quantity: number;
  price: number;
  supplierName: string;
  stockStatus: string;
  specialNote?: string;
  featuredItem: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  
  private apiUrl = 'https://prog2005.it.scu.edu.au/ArtGalley';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
  constructor(private http: HttpClient) { }

  getAllItems(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  searchItemByName(itemName: string): Observable<any> {
    const encodedName = encodeURIComponent(itemName);
    return this.http.get(`${this.apiUrl}/${encodedName}`);
  }

  addItem(item: InventoryItem): Observable<any> {
    return this.http.post(this.apiUrl, item, { headers: this.headers });
  }

  updateItem(itemName: string, item: InventoryItem): Observable<any> {
    const encodedName = encodeURIComponent(itemName);
    return this.http.put(`${this.apiUrl}/${encodedName}`, item, { headers: this.headers });
  }

  deleteItem(itemName: string): Observable<any> {
    const encodedName = encodeURIComponent(itemName);
    return this.http.delete(`${this.apiUrl}/${encodedName}`);
  }
}