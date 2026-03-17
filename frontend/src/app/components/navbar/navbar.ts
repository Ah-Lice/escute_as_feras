import { Component, signal, Output, EventEmitter } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule, MatButtonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {
  isMenuOpen = signal(false);
  isNavbarVisible = signal(true);
  isUserMenuOpen = signal(false);
  private hideTimeout: any;

  @Output() visibilityChange = new EventEmitter<boolean>();

  constructor(public authService: AuthService) {}

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
  }

  toggleUserMenu() {
    this.isUserMenuOpen.update(v => !v);
  }

  onMouseEnter() {
    clearTimeout(this.hideTimeout);
    this.isNavbarVisible.set(true);
    this.visibilityChange.emit(true);
  }

  onMouseLeave() {
    this.hideTimeout = setTimeout(() => {
      this.isNavbarVisible.set(false);
      this.isMenuOpen.set(false);
      this.isUserMenuOpen.set(false);
      this.visibilityChange.emit(false);
    }, 300);
  }

  navLinks = [
    { label: 'Acontecendo', path: '/acontecendo' },
    { label: 'Biblioteca Clandestina', path: '/biblioteca' },
    { label: 'Solte suas Feras', path: '/solte-suas-feras' },
    { label: 'Eventos', path: '/eventos' },
    { label: 'Quem Somos', path: '/quem-somos' },
    { label: 'Arquivo', path: '/arquivo' },
  ];
}
