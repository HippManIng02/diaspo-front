import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { DataService } from '../../core/services/data.service';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-profile-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NavbarComponent],
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss'],
})
export class ProfileDetailComponent implements OnInit {
  profile!: User;
  message = signal('');
  messageSent = signal(false);

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private data: DataService,
  ) {}

  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id') || '1');
    this.profile = this.data.getProfileById(id) || this.data.profiles[0];
  }

  get initials(): string { return (this.profile.firstname[0] + this.profile.lastname[0]).toUpperCase(); }
  get similar(): User[]  { return this.data.profiles.filter(p => p.id !== this.profile.id); }

  get availClass(): string {
    const m: Record<string,string> = { disponible:'badge-green', ouvert:'badge-gold', indisponible:'badge-gray' };
    return m[this.profile.disponibility] || 'badge-gray';
  }
  get availLabel(): string {
    const m: Record<string,string> = { disponible:'● Disponible', ouvert:'◐ Ouvert aux offres', indisponible:'○ Indisponible' };
    return m[this.profile.disponibility] || '○ Indisponible';
  }

  get quickInfos() {
    return [
      { label: 'Disponibilité', value: this.availLabel },
      { label: 'Localisation',  value: this.profile.pays },
      { label: 'Destination',   value: this.profile.profile.desiredLocation },
      { label: 'Expériences',   value: `${this.profile.experiences.length} postes` },
      { label: 'Formations',    value: `${this.profile.formations.length} diplômes` },
      { label: 'Langues',       value: `${this.profile.langues.length} langues` },
    ];
  }

  formatDate(d: string | null): string {
    if (!d) return 'Présent';
    const [y, m] = d.split('-');
    const months = ['Jan','Fév','Mar','Avr','Mai','Juin','Juil','Aoû','Sep','Oct','Nov','Déc'];
    return `${months[parseInt(m) - 1]} ${y}`;
  }

  async sendMessage() {
    if (!this.message().trim()) return;
    await new Promise(r => setTimeout(r, 500));
    this.messageSent.set(true);
    this.message.set('');
    setTimeout(() => this.messageSent.set(false), 4000);
  }
}
