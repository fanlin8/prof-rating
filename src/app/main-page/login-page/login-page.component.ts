import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from '../../services/message.service';
import { User } from '../../models/user';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  message: string;
  registerForm: FormGroup;
  loginForm: FormGroup;
  hidePassword: boolean = true;
  hasLoginError: boolean = false;

  constructor(private authService: AuthService, private registerService: RegisterService, public router: Router,
    private fb: FormBuilder, private messageService: MessageService) {
    this.setMessage();
    this.createForm();
  }

  private log(message: string) {
    this.messageService.add("LoginPageComponent: " + message);
  }

  private createForm() {
    this.loginForm = this.fb.group({
      'email': ["", [Validators.required, Validators.email]],
      'password': ["", Validators.required],
    });

    this.registerForm = this.fb.group({
      'username': ["", Validators.required],
      'email': ["", [Validators.required, Validators.email]],
      'password': ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  private rebuildForm() {
    this.registerForm.reset({
      username: "",
      email: "",
      password: ""
    });
  }

  ngOnInit() {
  }

  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn() ? 'in' : 'out');
  }

  login() {
    this.message = 'Trying to log in ...';
    const formModel = this.loginForm.value;

    this.authService.login(formModel.email as string, formModel.password as string).subscribe(user => {
      if (user) {
        this.hasLoginError = false;
        this.setMessage();

        if (this.authService.isLoggedIn()) {
          // Get the redirect URL from our auth service
          // If no redirect has been set, use the default
          let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/main';

          // Redirect the user
          this.router.navigate([redirect]);
        }
      } else {
        this.hasLoginError = true;
      }
    });
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  prepareNewUser(): User {
    const formModel = this.registerForm.value;

    const newUser: User = {
      username : formModel.username as string,
      email : formModel.email as string,
      password : formModel.password as string
    };

    return newUser;
  }

  onSubmit() {
    this.registerService.register(this.prepareNewUser()).subscribe(
      data => {
        if (data) {
          this.router.navigate(['/main']);
        } else {
          this.rebuildForm();
        }
      }
    );
  }

  reset() {
    this.rebuildForm();
  }

}
