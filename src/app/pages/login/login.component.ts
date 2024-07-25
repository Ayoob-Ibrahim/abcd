import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { GeneralService } from '../../service/general.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private generalser: GeneralService) { }
  ngOnInit(): void {
    this.generalser.clearstorage()
  }

  submitlogin() {
    this.generalser.setvalueinsession({
      language: 'en',
      token: true
    })
    this.generalser.presentloader();

    setTimeout(() => {
      this.generalser.dismissloader();
      this.router.navigateByUrl('/grid')
    }, 1000);
     
  }

}
