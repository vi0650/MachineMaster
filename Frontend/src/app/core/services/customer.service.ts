import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl = "https://localhost:7012/api/CustomerApi";

  constructor(private http: HttpClient) { }

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.baseUrl)
  }

  getCustomerById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  addCustomer(data: any) {
    console.log(data);
    return this.http.post(this.baseUrl, data);
  }

  updateCustomer(id: number, data: any) {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  deleteCustomer(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  newCustomerId(existingId: number[]): number {
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
