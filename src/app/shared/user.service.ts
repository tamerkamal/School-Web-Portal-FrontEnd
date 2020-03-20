import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { RegisterVmodel } from '../models/register';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }  
  readonly BaseURI = 'http://localhost:5000'; 
  
  register(registerVModel: RegisterVmodel) {
    debugger;   
    return this.http.post(this.BaseURI + '/Users/Register', registerVModel);
  }

  login(formData) {
    return this.http.post(this.BaseURI + '/Users/AdminLogin', formData);
  }

  getAllMembers() {
    return this.http.get(this.BaseURI + '/Users/Get');
  }

  getWithPagAndSort(pageNum:number,pageSize:number,sortBy:string,isSortDesc:Boolean){
    return this.http
    .get(this.BaseURI +`/Users/GetWithPagAndSort/${pageNum}/${pageSize}/${sortBy}/${isSortDesc}`);
  }

}
