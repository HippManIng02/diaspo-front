import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { AuthService } from '../../core/services/auth.service';
import { DataService } from '../../core/services/data.service';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  constructor(public auth: AuthService, private data: DataService) {}

  get profile(): User { return this.auth.user() || this.data.profiles[0]; }
  get initials(): string { return (this.profile.firstname[0] + this.profile.lastname[0]).toUpperCase(); }

  get availBadge() {
    const map: Record<string, { cls: string; icon: string; label: string }> = {
      disponible:   { cls: 'badge-green', icon: '●', label: 'Disponible' },
      ouvert:       { cls: 'badge-gold',  icon: '◐', label: 'Ouvert aux offres' },
      indisponible: { cls: 'badge-red',   icon: '○', label: 'Indisponible' },
    };
    return map[this.profile.disponibility] || map['disponible'];
  }

  get stats() {
    return [
      { num: this.profile.experiences?.length || 0, label: 'Expériences' },
      { num: this.profile.formations?.length  || 0, label: 'Formations' },
      { num: this.profile.competences?.length || 0, label: 'Compétences' },
      { num: this.profile.langues?.length     || 0, label: 'Langues' },
    ];
  }

  formatDate(d: string | null): string {
    if (!d) return 'Présent';
    const [y, m] = d.split('-');
    const months = ['Jan','Fév','Mar','Avr','Mai','Juin','Juil','Aoû','Sep','Oct','Nov','Déc'];
    return `${months[parseInt(m) - 1]} ${y}`;
  }

  share() {
    navigator.clipboard?.writeText(window.location.href);
    alert('Lien copié dans le presse-papier !');
  }
}
