import { UserService } from '../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Member } from 'src/app/models/member';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  lang: string = "En";
  members: Member[];
  totalRecords: number;
  pageNum: number = 1;
  sortBy: string = null;
  direction: string = "Asc";
  pageSize: number;
  isDisableNext:boolean=true;

  constructor(private router: Router, private service: UserService) { }

  ngOnInit() {
    let storedLang = localStorage.getItem("lang")
    if (storedLang) {
      this.lang = storedLang;
    }
    this.service.getAllMembers().subscribe(
      res => {
        console.log(res);
        this.members = res as Member[];
        this.totalRecords = this.pageSize = this.members.length;
      },
      err => {
        console.log(err);
      },
    );
  }

  switchLang(lang) {
    debugger;
    switch (lang) {
      case "Ar": {
        this.lang = "Ar"
      }
      case "En": {
        this.lang = "En"
      }
    }
    localStorage.setItem("lang", lang);
    window.location.reload();
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

  getWithPagAndSort() {  
    let isSortDesc = false;
    if (this.direction == "Desc") {
      isSortDesc = true;
    }
    this.service.getWithPagAndSort(this.pageNum, this.pageSize, this.sortBy, isSortDesc)
      .subscribe(
        res => {
          console.log(res);
          this.members = res as Member[];
          if (this.pageNum>= this.getTotalPages()){
            this.isDisableNext=true;
          }
          else{
            this.isDisableNext=false;
          }
        },
        err => {
          console.log(err);
        },
      );
  }
  nextFunc() 
  {
    if (this.pageNum <= this.getTotalPages()) {
      this.pageNum += 1;
      this.getWithPagAndSort();
    }
    else{
      this.isDisableNext=true;
    }
  }

  prevFunc() {
    if(this.pageNum>1){
    this.pageNum -= 1;
    this.getWithPagAndSort();
    }
  }

  getTotalPages(): number {
    let totalPages = 1;
    let remainder = (this.totalRecords % this.pageSize);
    if (remainder > 0) {
      totalPages = 1 + ((this.totalRecords - remainder) / this.pageSize);
    }
    else { totalPages = (this.totalRecords / this.pageSize); }
    return totalPages
  }
}
