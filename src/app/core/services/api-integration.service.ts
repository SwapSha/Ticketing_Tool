import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiIntegrationService {
  apiURL:string = 'https://freeapi.miniprojectideas.com/api/TicketsNew'
  constructor(private http: HttpClient) { }

  login(loginData:any){
    return this.http.post(`${this.apiURL}/Login`,loginData);
  }

  getAllDepartment(){
    return this.http.get(`${this.apiURL}/GetDepartments`);
  }
  createNewDepartment(departData:any){
    return this.http.post(`${this.apiURL}/CreateDepartment`,departData);
  }
  updateDepartment(updateDepartData:any){
    return this.http.put(`${this.apiURL}/UpdateDepartment`,updateDepartData);
  }
  deleteDepartment(departId:any){
    return this.http.delete(`${this.apiURL}/DeleteDepartment?id=${departId}`);
  }
}
