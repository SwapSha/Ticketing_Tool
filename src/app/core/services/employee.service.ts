import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  apiURL:string = 'https://freeapi.miniprojectideas.com/api/TicketsNew'
  constructor(private http: HttpClient) { }

  getAllEmployee(){
    return this.http.get(`${this.apiURL}/GetEmployees`);
  }

  createEmployee(empData:any){
    return this.http.post(`${this.apiURL}/CreateEmployee`,empData)
  }

  updateEmployee(newEmpData:any){
    return this.http.patch(`${this.apiURL}/UpdateEmployee`,newEmpData)
  }

  deleteEmployee(empID:number){
    return this.http.delete(`${this.apiURL}/DeleteEmployee?id=${empID}`);
  }
}
