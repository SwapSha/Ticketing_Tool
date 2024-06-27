import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiIntegrationService } from '../../core/services/api-integration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm:FormGroup | any;
  api = inject(ApiIntegrationService);
  router = inject(Router);
  constructor(private formBuild:FormBuilder){}
  ngOnInit(){
    this.loginForm = this.formBuild.group({
      emailId : new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    })
  }

  submitForm(){
    console.log(this.loginForm.value);
    this.api.login(this.loginForm.value).subscribe({
      next:(res:any)=>{
        if(res.result){
          localStorage.setItem('ticketUser',JSON.stringify(res.data));
          this.router.navigate(['/dashboard'])
        }
      },
      error: (err:any)=>{
        console.log(err);        
      }
    })
  }
}
