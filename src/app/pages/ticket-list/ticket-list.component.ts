import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TicketIntegrationService } from '../../core/services/ticket-integration.service';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.css'
})
export class TicketListComponent {
  selectMode:string = '1'
  ticketApi = inject(TicketIntegrationService);
  loggedIn:any;
  ngOnInit(){
    const loggedIn = localStorage.getItem('ticketUser')
    if(loggedIn){
      this.loggedIn = JSON.parse(loggedIn);
    }
    this.getMyTicketById(this.loggedIn.employeeId);
  }

  getMyTicketById(id:number){
    this.ticketApi.getTicketsCreatedByLoggedEmp(id).subscribe({
      next:(res:any)=>{
        console.log(res);
      },
      error:(err:any)=>{
        console.log(err);        
      }
    })
  }

  changeMode(mode:string){
    this.selectMode = mode;
  }
}
