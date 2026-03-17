import { Component, signal, Output, EventEmitter } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule, MatButtonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {
  isMenuOpen = signal(false);
  isNavbarVisible = signal(true);
  private hideTimeout: any;

  @Output() visibilityChange = new EventEmitter<boolean>();

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
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
      this.visibilityChange.emit(false);
    }, 200);
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
