import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  lang: string = "En";
  formModel = {
    UserName: '',
    Password: ''
  }
  constructor(private service: UserService, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null)
      this.router.navigateByUrl('/home');
    let storedLang = localStorage.getItem("lang")
    if (storedLang) {
      this.lang = storedLang;
    }
  }

  onSubmit(form: NgForm) {
    this.service.login(form.value).subscribe(
      (res: any) => {
        debugger;
        if (res) {
          localStorage.setItem('token', res.token);
          this.router.navigateByUrl('/home');
        }
      },
      err => {
        if (err.status == 400) { alert('Incorrect username or password'); }
        else if (err.status == 500) {
          alert('Sorry, You are not an admin !!');
        }
        else { console.log(err); }
      }
    );
  }
}
