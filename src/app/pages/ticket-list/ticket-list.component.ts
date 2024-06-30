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
  ticketList:any[] = [];
  ngOnInit(){
    const loggedIn = localStorage.getItem('ticketUser')
    if(loggedIn){
      this.loggedIn = JSON.parse(loggedIn);
    }
    console.log(this.loggedIn);
    this.changeMode(this.selectMode);
  }

  changeTicketState(state:string,ticket:number){
    if(state == 'Start'){
      this.ticketApi.startTicketById(ticket).subscribe((res:any)=>{
        if(res.result){
          this.changeMode(this.selectMode);
        }
      })
    }else if(state == 'Close'){
      this.ticketApi.closeTicketById(ticket).subscribe((res:any)=>{
        if(res.result){
          this.changeMode(this.selectMode);
        }
      })
    }
  }

  changeMode(mode:string){
    this.selectMode = mode;
    if(this.selectMode == '1'){
      this.getMyTicketById(this.loggedIn.employeeId);
    }else{
      this.getAssignedTicketById(this.loggedIn.employeeId);
    }
  }
  getMyTicketById(id:number){
    this.ticketApi.getTicketsCreatedByLoggedEmp(id).subscribe({
      next:(res:any)=>{
        this.ticketList = res.data;
      },
      error:(err:any)=>{
        console.log(err);        
      }
    })
  }
  getAssignedTicketById(id:number){
    this.ticketApi.getTicketAssignedToEmp(id).subscribe({
      next:(res:any)=>{
        this.ticketList = res.data;
      },
      error:(err:any)=>{
        console.log(err);        
      }
    })
  }

  
}
