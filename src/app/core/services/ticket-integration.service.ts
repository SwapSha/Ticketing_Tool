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
    return this.http.get(`${this.apiURL}/GetTicketsCreatedByEmpId?id=${id}`);
  }

  getTicketAssignedToEmp(id:number){
    return this.http.get(`${this.apiURL}/GetAssignedTicketsByEmpId?id=${id}`);
  }
}
