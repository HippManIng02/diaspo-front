import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  selectedDispo = signal('disponible');

  stats = [
    { icon: '👁️', num: '43',  label: 'Vues ce mois' },
    { icon: '💼', num: '12',  label: 'Recruteurs intéressés' },
    { icon: '📨', num: '3',   label: 'Messages reçus' },
    { icon: '⭐', num: '98%', label: 'Score de profil' },
  ];

  dispos = [
    { value: 'disponible',   label: 'Disponible' },
    { value: 'ouvert',       label: 'Ouvert aux offres' },
    { value: 'indisponible', label: 'Indisponible' },
  ];

  recentViews = [
    { id: 1, initials: 'ST', name: 'SOS Talents RH',  company: 'Cabinet recrutement · Lomé', time: 'Il y a 2h' },
    { id: 2, initials: 'BT', name: 'BTP Togo SA',     company: 'Construction · Kara',        time: 'Hier' },
    { id: 3, initials: 'MF', name: 'MiniFin Togo',    company: 'Ministère · Lomé',           time: 'Il y a 3 jours' },
  ];

  constructor(public auth: AuthService) {}

  get user()    { return this.auth.user(); }
  get initials(){ return this.auth.initials; }

  get profileCompletion(): number {
    const u = this.user;
    if (!u) return 20;
    let s = 20;
    if (u.profile?.title) s += 15;
    if (u.profile?.resume) s += 15;
    if (u.experiences?.length) s += 20;
    if (u.formations?.length) s += 15;
    if (u.competences?.length) s += 10;
    if (u.langues?.length) s += 5;
    return Math.min(s, 100);
  }
}
