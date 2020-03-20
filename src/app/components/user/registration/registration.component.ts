import { Component, OnInit } from '@angular/core';
import { RegisterVmodel } from 'src/app/models/register';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: []
})

export class RegistrationComponent implements OnInit {
  registerVModel: RegisterVmodel = new RegisterVmodel();
  lang: string = "En";
  constructor(public service: UserService) { }

  ngOnInit() {
    let storedLang = localStorage.getItem("lang")
    if (storedLang) {
      this.lang = storedLang;
    }
  }

  onSubmit() {
    if(!this.isValidForm()){
      return;
    }
    this.service.register(this.registerVModel).subscribe(
      (res: any) => {
        if (res.succeeded) {
          alert('Your Membership created successfully!');
          window.location.reload();
        } else {
          res.errors.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                alert('Username is already taken, Registration failed.');
                break;

              default:
                alert('Registration failed.');
                break;
            }
          });
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  isMatchedPasswords(): boolean {
    if (this.registerVModel.Password == this.registerVModel.Password) {
      return true;
    }
    alert("password and Confirm Password not matched !!");
    return false;
  }
  isValidPsswordLength(): boolean {
    if (this.registerVModel.Password.length >= 4) {
      return true;
    }
    alert("password length must be > or = 4 !!");
    return false;
  }

  isFilledRequiredFields(): boolean {
    if (
      this.registerVModel.Address
      && this.registerVModel.BirthDate
      && this.registerVModel.Email
      && this.registerVModel.FirsName
      && this.registerVModel.LastName
      && this.registerVModel.MembershipTypeName
      && this.registerVModel.Password
      && this.registerVModel.Phone
    ) { return true; }
    alert("please fill all required fields !!");
    return false;
  }

  isValidForm(): boolean {
    if (!this.isMatchedPasswords()) {
      return false;
    }
    else if (!this.isValidPsswordLength()) {
      return false;
    }
    else if (!this.isFilledRequiredFields()) {
      return false;
    }
    return true;
  }
}
