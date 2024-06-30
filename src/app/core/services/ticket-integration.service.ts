import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TicketIntegrationService {

  apiURL:string = 'https://freeapi.miniprojectideas.com/api/TicketsNew'
  constructor(private http: HttpClient) { }

  createTicket(ticketData:any){
    return this.http.post(`${this.apiURL}/CreateNewTicket`,ticketData);
  }

  getTicketsCreatedByLoggedEmp(id:number){
    return this.http.get(`${this.apiURL}/GetTicketsCreatedByEmpId?empId=${id}`);
  }

  getTicketAssignedToEmp(id:number){
    return this.http.get(`${this.apiURL}/GetAssignedTicketsByEmpId?empId=${id}`);
  }

  startTicketById(id:number){
    return this.http.post(`${this.apiURL}/startTicket?id=${id}`,{});
  }
  closeTicketById(id:number){
    return this.http.post(`${this.apiURL}/closeTicket?id=${id}`,{});
  }
}
