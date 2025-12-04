import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = "https://localhost:7012/api/UserApi";
  
  constructor(private http:HttpClient) { }

  login(data: any){
    return this.http.post(`${this.baseUrl}/login`, data);
  } 

  getUserById(id:number){
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}
