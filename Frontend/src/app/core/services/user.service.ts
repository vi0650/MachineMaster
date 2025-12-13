import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = "https://localhost:7012/api/UserApi";

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl)
  }

  getUserById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  addUser(data: any) {
    return this.http.post(this.baseUrl, data);
  }

  updateUser(id: number, data: any) {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  newUserId(existingId: number[]): number {
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
