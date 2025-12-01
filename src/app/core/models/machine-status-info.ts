export interface MachineStatusInfo {
  Id: number;
  machineId: number;
  customerId:number;
  isOnline:boolean | null;
  isActive: boolean | null;
  description : string | null;
  createdDate: string | null;
  updatedDate: string | null;
  ipAddress: string | null | any;
  location: string | null | any;
  machineCode : string | null;
}