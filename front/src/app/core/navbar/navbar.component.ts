import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(
    private authService: AuthService,
    public router: Router
  ) { }

  logout() {
    this.authService.logout();
  }

  isProfilePage(): boolean {
    return this.router.isActive('/profile', true);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  mobileMenuOpen = false;

  toggleMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMenu(): void {
    this.mobileMenuOpen = false;
  }
}