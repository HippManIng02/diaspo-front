import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { DataService } from '../../core/services/data.service';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NavbarComponent],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  query    = signal('');
  dispo    = signal('');
  location = signal('');
  sortBy   = signal('name');

  sectors = ['BTP & Génie Civil','Santé & Médecine','Informatique','Finance','Droit','Éducation','Agriculture'];
  dispos  = [
    { value: '',           label: 'Tous' },
    { value: 'disponible', label: 'Disponible' },
    { value: 'ouvert',     label: 'Ouvert aux offres' },
  ];

  constructor(private data: DataService, private router: Router) {}

  get filtered(): User[] {
    let list = this.data.searchProfiles(this.query(), this.dispo(), this.location());
    if (this.sortBy() === 'name') list = [...list].sort((a,b) => a.lastname.localeCompare(b.lastname));
    if (this.sortBy() === 'exp')  list = [...list].sort((a,b) => b.experiences.length - a.experiences.length);
    return list;
  }

  availClass(d: string): string {
    return d === 'disponible' ? 'badge-green' : d === 'ouvert' ? 'badge-gold' : 'badge-gray';
  }
  availLabel(d: string): string {
    return d === 'disponible' ? '● Disponible' : d === 'ouvert' ? '◐ Ouvert' : '○ Indisponible';
  }

  reset() { this.query.set(''); this.dispo.set(''); this.location.set(''); }
  goTo(id: number) { this.router.navigate(['/profile', id]); }
}
