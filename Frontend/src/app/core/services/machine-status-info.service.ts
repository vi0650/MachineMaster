import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { MachineStatusInfo } from '../models/machine-status-info';

@Injectable({
  providedIn: 'root'
})
export class MachineStatusInfoService {
  private baseUrl = "https://localhost:7012/api/MachineStatusInfoApi";

  constructor(private http: HttpClient) { }

  getAllMachineStatus(): Observable<MachineStatusInfo[]> {
    return this.http.get<MachineStatusInfo[]>(this.baseUrl)
  }

  getMachineStatusById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  addMachineStatus(data: any) {
    return this.http.post(this.baseUrl, data);
  }

  updateMachineStatus(id: number, data: any) {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  deleteMachineStatus(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  newMachineStatusId(existingId: number[]): number {
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
