import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { HappeningComponent } from './components/happening/happening';
import { LibraryComponent } from './components/library/library';
import { SpeakupComponent } from './components/speakup/speakup';
import { EventsComponent } from './components/events/events';
import { AboutComponent } from './components/about/about';
import { ArchiveComponent } from './components/archive/archive';
import { LoginComponent } from './components/auth/login/login';
import { RegisterComponent } from './components/auth/register/register';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'acontecendo', component: HappeningComponent },
  { path: 'biblioteca', component: LibraryComponent },
  { path: 'solte-suas-feras', component: SpeakupComponent },
  { path: 'eventos', component: EventsComponent },
  { path: 'quem-somos', component: AboutComponent },
  { path: 'arquivo', component: ArchiveComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: RegisterComponent },
  { path: '**', redirectTo: '' }
];
