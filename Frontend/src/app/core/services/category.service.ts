import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = "https://localhost:7012/api/CategoryApi";

  constructor(private http:HttpClient) { }

  getAllCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(this.baseUrl)
  }

  getCategoryById(id:number){
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  addCategory(data:any){  
    return this.http.post(this.baseUrl,data);
  }

  updateCategory(id:number,data:any){
    return this.http.put(`${this.baseUrl}/${id}`,data);
  }

  deleteCategory(id:number){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  newCategoryId(existingId: number[]): number {
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