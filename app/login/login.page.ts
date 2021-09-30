import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../shared/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  loginError: string;
  
  constructor(private modalController: ModalController, private authService: AuthService) {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
      });
   }

  ngOnInit() {
  }

  login() {
    this.authService.login(
      this.loginForm.value.email, this.loginForm.value.password)
      .then(
      user => this.modalController.dismiss()
      )
      .catch(
      error => this.loginError = error.message
      );
    }
}
