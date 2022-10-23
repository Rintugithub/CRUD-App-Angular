import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { studentdata } from './student.model';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  loginForm!:FormGroup;
showadd!:boolean;
showupdate!:boolean;
formValue!:FormGroup;
studentModelObj:studentdata=new studentdata;
allStudentData:any;


  constructor(private formBuilder:FormBuilder,private api:ApiService,private router:Router) { }

  ngOnInit(): void {
    if(!localStorage.getItem('token')){
      alert("Please login");
      this.router.navigate(['login']);


    }
    this.formValue=this.formBuilder.group({
      name:['',Validators.required],
      email:['',Validators.required],
      mobile:['',Validators.required],
      city:['',Validators.required],

    })
    this.getData();
  }
  add(){
    this.showadd = true;
    this.showupdate = false;

  }
  edit(data:any){
    this.showadd = false;
    this.showupdate = true;
    this.studentModelObj.id = data.id;
    this.formValue.controls['name'].setValue(data.name)
    this.formValue.controls['email'].setValue(data.email)
    this.formValue.controls['mobile'].setValue(data.mobile)
    this.formValue.controls['city'].setValue(data.city)


  }
  //update on edit
  update(){
    this.studentModelObj.name = this.formValue.value.name;
    this.studentModelObj.email = this.formValue.value.email;
    this.studentModelObj.mobile = this.formValue.value.mobile;
    this.studentModelObj.city = this.formValue.value.city;
    this.api.putStudent(this.studentModelObj,this.studentModelObj.id).subscribe(res=>{
      this.formValue.reset();
      this.getData();
      alert("Record updated successfully");

    },
    err=>{
      alert("Something went wrong");
    })

  }
  addStudent(){
    this.studentModelObj.name = this.formValue.value.name;
    this.studentModelObj.email = this.formValue.value.email;
    this.studentModelObj.mobile = this.formValue.value.mobile;
    this.studentModelObj.city = this.formValue.value.city;
    this.api.postStudent(this.studentModelObj).subscribe(res=>{
      console.log(res);
      this.formValue.reset();
      this.getData();

      alert("Record added successfully");
    },
    err=>{
      alert("something went wrong");

    })

  }
  //getdata
  getData(){
    this.api.getStudent()
    .subscribe(res=>{
      this.allStudentData=res;

    })
  }
  logout(){
    if(confirm('Are you sure want to logout?'))

    localStorage.removeItem('token');
    this.router.navigate(['login']);

    this.loginForm.reset();



  }
  //delete
  DeleteStudent(data:any){
    if(confirm('Are you sure want to delete?'))
    this.api.deleteStudent(data.id)
    .subscribe(res=>{
      alert("Record delted successfully");
      this.getData();
    })
  }


}
