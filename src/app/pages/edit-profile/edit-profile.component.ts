import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { AuthService } from '../../core/services/auth.service';
import { DataService } from '../../core/services/data.service';
import { User, Experience, Formation, Competence, Langue } from '../../core/models/user.model';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NavbarComponent],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  activeTab = signal('info');
  saving    = signal(false);
  saved     = signal(false);

  tabs = [
    { key: 'info',        icon: '👤', label: 'Infos' },
    { key: 'profile',     icon: '📝', label: 'Profil' },
    { key: 'experiences', icon: '💼', label: 'Expériences' },
    { key: 'formations',  icon: '🎓', label: 'Formations' },
    { key: 'competences', icon: '⚡', label: 'Compétences' },
    { key: 'langues',     icon: '🌍', label: 'Langues' },
  ];

  form!: User;

  constructor(public auth: AuthService, private data: DataService) {}

  ngOnInit() {
    const src = this.auth.user() || this.data.profiles[0];
    this.form = JSON.parse(JSON.stringify(src));
  }

  addExp()       { this.form.experiences.push({ poste: '', entreprise: '', dateDebut: '', dateFin: null, description: '' }); }
  removeExp(i: number) { this.form.experiences.splice(i, 1); }
  addFormation() { this.form.formations.push({ diplome: '', ecole: '', annee: new Date().getFullYear() }); }
  removeFormation(i: number) { this.form.formations.splice(i, 1); }
  addComp()      { this.form.competences.push({ nom: '', niveau: 'intermediaire' }); }
  removeComp(i: number) { this.form.competences.splice(i, 1); }
  addLang()      { this.form.langues.push({ name: '', level: 'Intermédiaire', pct: 50 }); }
  removeLang(i: number) { this.form.langues.splice(i, 1); }

  updatePct(l: Langue) {
    const map: Record<string,number> = { Natif: 100, Courant: 90, 'Avancé': 75, 'Intermédiaire': 55, Notions: 30 };
    l.pct = map[l.level] || 50;
  }

  async save() {
    this.saving.set(true);
    await new Promise(r => setTimeout(r, 700));
    this.auth.updateUser(this.form);
    this.saving.set(false);
    this.saved.set(true);
    setTimeout(() => this.saved.set(false), 3000);
  }

  trackByIndex(index: number) { return index; }
}
