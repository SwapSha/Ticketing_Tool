import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../../core/services/employee.service';
import { ApiIntegrationService } from '../../core/services/api-integration.service';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {
  employeeForm :FormGroup|any;
  formBuild = inject(FormBuilder);
  employeeApi = inject(EmployeeService);
  departmentApi = inject(ApiIntegrationService);

  employeeList:any[] = [];
  isForEdit:boolean = false;
  deptList:any[] = [];
  roleList:any[] = [];
  ngOnInit(){
    this.employeeForm = this.formBuild.group({
      employeeId: new FormControl(0) ,
      employeeName: new FormControl(''),
      contactNo: new FormControl(''),
      emailId: new FormControl(''),
      deptId: new FormControl(0),
      password: new FormControl(''),
      gender: new FormControl(''),
      role: new FormControl('')
    });
    this.getEmployeeData();
    this.getDepartment();
    this.getRole();
  }

  getEmployeeData(){
    this.employeeApi.getAllEmployee().subscribe({
      next:(res:any)=>{
        this.employeeList = res.data
      },
      error:(err:any)=>{}
    })
  }

  getDepartment(){
    this.departmentApi.getAllDepartment().subscribe((res:any)=>{
      this.deptList = res.data;
    })
  }
  getRole(){
    this.departmentApi.getAllRole().subscribe((res:any)=>{
      this.roleList = res.data;
    })
  }
  onFormSubmit(){
    console.log(this.employeeForm.value);
    this.employeeApi.createEmployee(this.employeeForm.value).subscribe({
      next:(res:any)=>{
        this.employeeForm.reset();
        this.getEmployeeData();
      },
      error:(err:any)=>{}
    })
  }
  onEditClick(category:any){
    console.log(category);
    this.isForEdit = true;
    this.employeeForm.patchValue({
      employeeId: category.employeeId ,
      employeeName: category.employeeName,
      contactNo: category.contactNo,
      emailId: category.emailId,
      gender: category.gender,
      password: category.password
    });
    this.employeeForm.get('role').setValue(category.role);
    this.employeeForm.get('deptId').setValue(category.deptId);
  }

  onEditSubmit(){
    let payload = {
      employeeId: this.employeeForm.value.employeeId ,
      employeeName: this.employeeForm.value.employeeName,
      contactNo: this.employeeForm.value.contactNo,
      emailId: this.employeeForm.value.emailId,
      role: this.employeeForm.value.role,
      deptId: this.employeeForm.value.deptId,
      gender: this.employeeForm.value.gender,
      password: this.employeeForm.value.password
    }
    this.employeeApi.updateEmployee(payload).subscribe({
      next:(res)=>{
        console.log(res);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  onDeleteClick(employeeId:number){
    this.employeeApi.deleteEmployee(employeeId).subscribe({
      next:(res)=>{
        console.log(res);
        this.getEmployeeData();
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
