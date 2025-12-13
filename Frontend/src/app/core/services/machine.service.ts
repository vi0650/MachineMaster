import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Machine } from '../models/machine';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class MachineService {

  private baseUrl = "https://localhost:7012/api/MachineApi";

  constructor(private http: HttpClient) { }

  getAllMachine(): Observable<Machine[]> {
    return this.http.get<Machine[]>(this.baseUrl)
  }

  getMachineById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  addMachine(data: any) {
    return this.http.post(this.baseUrl, data);
  }
  updateMachine(id: number, data: any) {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  deleteMachine(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  newMachineId(existingId: number[]): number {
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