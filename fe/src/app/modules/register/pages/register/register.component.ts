import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RegisterUserService } from '../../../../core/services/register-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: any;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private registerUserService: RegisterUserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]] 
    });
  }

  // convenience getter to easily access the form fields
  get registerFormControls() { 
    return this.registerForm.controls; 
  }

  onSubmit() {

    this.submitted = true;

    // console.log(this.registerFormControls.firstName.value);

    this.registerUserService.registerUser(this.registerForm.value).subscribe((res: any) => {
      console.log(res);
      console.log('Registration successful');
      this.router.navigate(['../login']);
    });

  }
}
