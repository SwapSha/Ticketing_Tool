import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParentApiIntegrationService {

  apiURL:string = 'https://freeapi.miniprojectideas.com/api/TicketsNew'
  constructor(private http: HttpClient) { }

  getCategoryList(){
   return this.http.get(`${this.apiURL}/getParentCategory`);
  }
  createCategory(categoryData:any){
   return this.http.post(`${this.apiURL}/CreateParentCategory`,categoryData);
  }
  updateCategory(newCategoryData:any){
   return this.http.put(`${this.apiURL}/UpdateParentCategory`,newCategoryData);
  }
  deleteCategory(categoryId:number){
   return this.http.delete(`${this.apiURL}/DeleteParentCategory?id=${categoryId}`);
  }
 
}
