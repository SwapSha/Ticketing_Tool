import { Component, inject } from '@angular/core';
import { ChildApiIntegrationService } from '../../core/services/child-api-integration.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ParentApiIntegrationService } from '../../core/services/parent-api-integration.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  childApi = inject(ChildApiIntegrationService);
  parentApi = inject(ParentApiIntegrationService);
  formBuild = inject(FormBuilder);
  childCategory:any[] = [];
  parentCategory:any[] = [];
  isForEdit:boolean = false;
  childCategoryForm:FormGroup|any;
  parentCategoryId:number = 0;
  constructor(){}
  ngOnInit(){
    this.getChildCategory();
    this.getParentCategory();
    this.childCategoryForm = this.formBuild.group({
      childCategoryId: 0,
      categoryName: "",
      parentCategoryId: 0
    })
  }

  getParentCategory(){
    this.parentApi.getCategoryList().subscribe((res:any)=>{
      if(res.data){
        this.parentCategory = res.data;
      }
    })
  }
  getChildCategory(){
    this.childApi.getChildCategory().subscribe({
      next: (res:any)=>{
        if(res.result){
          this.childCategory = res.data;
        }
      },
      error: (err:any)=>{}
    })
  }
  submitChildCategory(){
    let payload = {
      childCategoryId : 0,
      categoryName : this.childCategoryForm.value.categoryName,
      parentCategoryId : this.childCategoryForm.value.parentCategoryId
    }

    this.childApi.CreateChildCategory(payload).subscribe({
      next:(res:any)=>{
        if(res.result){
          this.childCategoryForm.reset();
          this.getChildCategory();
        }
      },
      error:(err:any)=>{}
    })
  }
  onEditClick(category:any){
    this.isForEdit = true;
    console.log(category);
    this.childCategoryForm.patchValue({
      childCategoryId: category.childCategoryId,
      categoryName: category.categoryName,
    });
    this.parentCategoryId = category.parentCategoryName
    this.parentCategory.map((item:any)=>{
      // console.log(this.parentCategory);
      if(item.categoryName === category.parentCategoryName){
        console.log(item);
        this.childCategoryForm.get('parentCategoryId').setValue(item.categoryId);
      }
    })
  }
  onEditSubmit(){
    console.log(this.childCategoryForm.value);
    this.childApi.updateChildCategory(this.childCategoryForm.value).subscribe({
      next:(res:any)=>{
        this.childCategoryForm.reset();
        this.getChildCategory();
        this.isForEdit = false;
      },
      error:(err:any)=>{

      }
    })
  }

  onDeleteClick(categoryId:number){
    this.childApi.DeleteChildCategory(categoryId).subscribe((res:any)=>{
      if(res.result){
        this.getChildCategory();
      }
    })
  }
}
