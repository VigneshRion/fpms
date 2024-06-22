import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'FPMS';
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.loadToken();
  }
}
