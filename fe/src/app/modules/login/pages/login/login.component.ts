import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../../../core/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: any;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // convenience getter to easily access the form fields
  get loginFormControls() { 
    return this.loginForm.controls; 
  }

  onSubmit() {

    this.submitted = true;

    console.log(this.loginForm.value);

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loginService.login(this.loginFormControls.username.value, this.loginFormControls.password.value).subscribe((res: any) => {
      
      if (res['response'] == true) {
        console.log('Login successful');
        this.router.navigate(['/home']);
      } else {
        console.log(res['response'])
      }

    });

  }

}
