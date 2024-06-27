import { Component, inject } from '@angular/core';
import { ParentApiIntegrationService } from '../../core/services/parent-api-integration.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiIntegrationService } from '../../core/services/api-integration.service';

@Component({
  selector: 'app-parent-category',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './parent-category.component.html',
  styleUrl: './parent-category.component.css'
})
export class ParentCategoryComponent {
  parentApi = inject(ParentApiIntegrationService);
  departApi = inject(ApiIntegrationService)
  formBuild = inject(FormBuilder);
  parentForm: FormGroup|any;
  isForEdit:boolean = false;
  parentCategoryList:any [] = [];
  departmentList:any[] = [];
  categoryList:any[] = [];
  categoryID:number = 0;
  ngOnInit(){
    this.parentForm = this.formBuild.group({
      categoryId: new FormControl(0),
      categoryName: new FormControl(''),
      deptId: new FormControl('')
    });
    this.departApi.getAllDepartment().subscribe((res:any)=>{
      this.departmentList = res.data;
    });
    this.getCategoryList()
  }
  getCategoryList(){
    this.parentApi.getCategoryList().subscribe({
      next:(res:any)=>{
        this.parentCategoryList = res.data
      },
      error:(err:any)=>{}
    })
  }

  submitCategory(){
    let payload = {
      categoryId: 0,
      categoryName: this.parentForm.value.categoryName,
      deptId: Number(this.parentForm.value.deptId)
    }
    this.parentApi.createCategory(payload).subscribe({
      next:(res:any)=>{
        if(res.result){
          this.parentForm.reset();
          this.getCategoryList();
        }
      },
      error:(err:any)=>[]
    })
  }
  onEditClick(categoryData:any){
    this.isForEdit = true;
   this.parentForm.setValue({
      categoryId: categoryData.categoryId,
      categoryName: categoryData.categoryName,
      deptId: categoryData.deptName
   });
   this.departmentList.map((item:any)=>{
    if(item.deptName == categoryData.deptName){
      this.categoryID = item.deptId
    }
   })
  }
  onDeleteClick(catId:number){
    this.parentApi.deleteCategory(catId).subscribe((res:any)=>{
      if(res.result){
        this.getCategoryList();
      }
    })
  };
  onEditSubmit() {
    let payload = {
      categoryId: this.parentForm.value.categoryId,
      categoryName: this.parentForm.value.categoryName,
      deptId: this.categoryID
    }
    this.parentApi.updateCategory(payload).subscribe((res:any)=>{
      if(res.result){
        this.parentForm.reset();
        this.getCategoryList();
        this.isForEdit = false;
      }
    })
  }
}
