import { HttpClient } from '@angular/common/http';
import { FormBuilder ,FormGroup,Validators} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
 signupForm!:FormGroup;
  constructor(private formBuilder:FormBuilder,private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
name:['',Validators.required],
email:['',Validators.required],
mobile:['',Validators.required],
password:['',Validators.required],

    })
  }
  //creation
  signUp(){

this.http.post<any>("http://localhost:3000/signup",this.signupForm.value).subscribe(res=>{
alert("student registerd successfully");
this.signupForm.reset();
this.router.navigate(['login']);
}, err=>{
  alert("something went wrong");
})
  }

}
