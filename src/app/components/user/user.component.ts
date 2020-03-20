import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: []
})
export class UserComponent implements OnInit {
  lang: string = "En";
  constructor() { }

  ngOnInit() {
    let storedLang = localStorage.getItem("lang")
    if (storedLang) {
      this.lang = storedLang;
    }
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
}
