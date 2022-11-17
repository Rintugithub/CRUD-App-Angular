import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  formValue!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],

    })
  }
  login() {
    this.http.get<any>("http://localhost:3000/signup").subscribe(res => {
      //match email and password

      const user = res.find((a: any) => {
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password


      })

      //codition for login
      if (user) {
        
        alert("successfully logged in");
        this.loginForm.reset();
        this.router.navigate(['student']);

        localStorage.setItem('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c")

      } else {
        alert("Invalid username or password");
      }

    },
      err => {
        alert("something went wrong");
      })

  }


}
