import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.html'
})
export class App implements OnInit {
  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.authService.fetchCurrentUser().subscribe();
    }
  }

  logout(): void {
    this.authService.logout();
  }
}