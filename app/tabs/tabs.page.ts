import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  isAdmin = false;

  constructor(private authService: AuthService) {
    this.authService.observeAuthState(user => {
      // User is logged in as administrator
      // For simplicity, there is only one fixed admin
      // Further enhancement would be to save the user role in Database
      if (user && user.email == 'admin@nyp.sg') {
      this.isAdmin = true;
      }
      // User has logged out or is NOT administrator
      else {
      this.isAdmin = false;
      }
      });
  }

}
