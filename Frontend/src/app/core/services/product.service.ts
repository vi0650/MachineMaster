import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { v4 as uuidv4 } from 'uuid';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = "https://localhost:7012/api/ProductApi";

  constructor(private http:HttpClient) { }

  getAllProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl)
  }

  getProductById(id:number){
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  addProduct(data:any){
    console.log(data);
    return this.http.post(this.baseUrl,data);
  }

  updateProduct(id:number,data:any){
    return this.http.put(`${this.baseUrl}/${id}`,data);
  }

  deleteProduct(id:number){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  newProductId(existingId: number[]): number {
      let id: number;
      do {
        const uuid = uuidv4();
        const numeric = uuid.replace(/\D/g, '');
        let sub = numeric.substring(0, 5);
        sub = sub.padStart(5, '0');
        id = Number(sub);
        if (id < 10000) {
          id += 10000;
        }
      } while (existingId.includes(id))
      return id;
    }

}
