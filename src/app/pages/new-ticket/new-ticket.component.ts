import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChildApiIntegrationService } from '../../core/services/child-api-integration.service';
import { ParentApiIntegrationService } from '../../core/services/parent-api-integration.service';
import { ApiIntegrationService } from '../../core/services/api-integration.service';
import { TicketIntegrationService } from '../../core/services/ticket-integration.service';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css'
})
export class NewTicketComponent {
  childData:any[] = [];
  departList:any[] = [];
  parentData:any[] = [];
  filterParent:any[] = [];
  employeeLogin:any;
  childApi = inject(ChildApiIntegrationService);
  parentApi = inject(ParentApiIntegrationService);
  department = inject(ApiIntegrationService);
  ticketApi = inject(TicketIntegrationService);
  ticketForm: FormGroup|any;
  formBuild = inject(FormBuilder);

  ngOnInit(){
    let loginData:any = localStorage.getItem('ticketUser');
    this.employeeLogin = JSON.parse(loginData)
    console.log(this.employeeLogin);
    this.ticketForm = this.formBuild.group({
      employeeId: new FormControl(this.employeeLogin.employeeId),
      severity: new FormControl(''),
      childCategoryId:new FormControl(0),
      deptId: new FormControl(0),
      requestDetails: new FormControl('')
    });
    this.getDepartment();
    this.getParentData();
    this.getChildData();
  }

  onSubmitTicket(){
    let payload = {
      employeeId: this.employeeLogin.employeeId,
      severity: this.ticketForm.value.severity,
      childCategoryId: Number(this.ticketForm.value.childCategoryId),
      deptId: Number(this.ticketForm.value.deptId),
      requestDetails: this.ticketForm.value.requestDetails
    }
    console.log(payload);
    this.ticketApi.createTicket(payload).subscribe({
      next:(res:any)=>{
        this.ticketForm.reset();
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }

  filterParentCategory(val:any){  
    this.filterParent = this.childData.filter((item:any)=> { return item.parentCategoryName == val.value })
    return this.filterParent 

  }

  getDepartment(){
    this.department.getAllDepartment().subscribe({
      next:(res:any)=>{
        this.departList = res.data
      },
      error:(err:any)=>{}
    })
  }

  getChildData(){
    this.childApi.getChildCategory().subscribe({
      next:(res:any)=>{
        this.childData = res.data;
      },
      error:(err:any)=>{}
    });
  }

  getParentData(){
    this.parentApi.getCategoryList().subscribe({
      next:(res:any)=>{
        this.parentData = res.data;
      },
      error:(res:any)=>{}
    })
  }
}
