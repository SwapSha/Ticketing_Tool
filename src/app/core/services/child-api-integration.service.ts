import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChildApiIntegrationService {

  apiURL:string = 'https://freeapi.miniprojectideas.com/api/TicketsNew'
  constructor(private http: HttpClient) { }

  getChildCategory(){
    return this.http.get(`${this.apiURL}/GetChildCategory`)
  }
  CreateChildCategory(childData:any){
    return this.http.post(`${this.apiURL}/CreateChildCategory`,childData)
  }
  updateChildCategory(newChildData:any){
    return this.http.put(`${this.apiURL}/UpdateChildCategory`,newChildData)
  }
  DeleteChildCategory(childId:number){
    return this.http.delete(`${this.apiURL}/DeleteChildCategory?id=${childId}`)
  }
}
