import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = "https://localhost:7012/api/UserApi";

  constructor(private http:HttpClient) { }

  getUsers(){
    return this.http.get(this.baseUrl)
  }

  getUserById(id:number){
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  addUser(data:any){
    return this.http.post(this.baseUrl,data);
  }

  updateUser(id:number,data:any){
    return this.http.put(`${this.baseUrl}/${id}`,data);
  }

  deleteUser(id:number){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
