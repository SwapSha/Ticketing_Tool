import { Component, inject,OnInit } from '@angular/core';
import { ApiIntegrationService } from '../../core/services/api-integration.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,DatePipe],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent implements OnInit {
  api = inject(ApiIntegrationService);
  formBuild = inject(FormBuilder);
  departList:any[] = [];
  departForm:FormGroup | any;
  departID:number = 0;
  isForEdit:boolean = false;
  constructor(){}

  ngOnInit(){
    this.getDepartments();
    this.departForm = this.formBuild.group({
      deptId: new FormControl(0),
      deptName: new FormControl(''),
      createdDate: new FormControl(''),
    });
    console.log(this.departForm);
  }

  getDepartments(){
    this.api.getAllDepartment().subscribe({
      next:(res:any)=>{
        this.departList = res.data;
      },
      error:(err:any)=>{}
    })
  }

  submitDepartment(){
    console.log(this.departForm.value);
    this.api.createNewDepartment(this.departForm.value).subscribe({
      next:(res:any)=>{
        if(res.result){
          this.departForm.reset();
          this.getDepartments();
        }
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }

  onEditClick(dept:any){
    this.isForEdit = true;
    let date = dept.createdDate.slice(0,10)
    this.departForm.setValue({
      deptId: dept.deptId,
      deptName: dept.deptName,
      createdDate: date,
    });
    console.log(this.departForm);
  }

  onEditSubmit(){
    this.api.updateDepartment(this.departForm.value).subscribe({
      next:(res:any)=>{
        if(res.result){
          this.departForm.reset();
          this.isForEdit = false;
          this.getDepartments();
        }
      },
      error:(err:any)=>{}
    })
  }

  onDeleteClick(id:string){
    this.api.deleteDepartment(id).subscribe({
      next:(res:any)=>{
        this.getDepartments();
      },
      error:(err:any)=>{}
    })
  }
}
