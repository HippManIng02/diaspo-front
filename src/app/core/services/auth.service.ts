import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User, AuthResponse, LoginRequest, RegisterRequest } from '../models/user.model';

const MOCK_USER: User = {
  id: 1,
  firstname: 'Kwame', lastname: 'Adjété',
  email: 'kwame@email.com', tel: '+33 6 12 34 56 78',
  pays: 'France', disponibility: 'disponible', visible: true,
  roles: [{ name: 'Ingénieur', field: 'btp' }],
  profile: {
    title: 'Ingénieur Génie Civil',
    resume: 'Ingénieur civil spécialisé en infrastructures urbaines avec 8 ans d\'expérience en France et en Afrique. Désireux de contribuer au développement du Togo.',
    desiredLocation: 'Lomé, Togo'
  },
  experiences: [
    { poste: 'Chef de projet BTP', entreprise: 'Bouygues Construction', dateDebut: '2020-01', dateFin: null, description: 'Pilotage de projets d\'infrastructures urbaines en Île-de-France.' },
    { poste: 'Ingénieur structures', entreprise: 'VINCI Énergies', dateDebut: '2017-03', dateFin: '2020-01', description: 'Calcul et dimensionnement de structures béton armé.' },
  ],
  formations: [
    { diplome: 'Master Génie Civil', ecole: 'École des Ponts ParisTech', annee: 2015 },
    { diplome: 'Licence Sciences de l\'ingénieur', ecole: 'Université de Lomé', annee: 2013 },
  ],
  competences: [
    { nom: 'AutoCAD', niveau: 'expert' }, { nom: 'BIM / Revit', niveau: 'expert' },
    { nom: 'Gestion de projet', niveau: 'intermediaire' }, { nom: 'Béton armé', niveau: 'intermediaire' },
    { nom: 'VRD', niveau: 'intermediaire' }, { nom: 'SIG', niveau: 'debutant' },
  ],
  langues: [
    { name: 'Français', level: 'Natif', pct: 100 }, { name: 'Ewé', level: 'Courant', pct: 90 },
    { name: 'Anglais', level: 'Avancé', pct: 75 }, { name: 'Kabiyè', level: 'Notions', pct: 35 },
  ],
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(localStorage.getItem('tl_token'));

  readonly user  = this._user.asReadonly();
  readonly token = this._token.asReadonly();

  get isLoggedIn(): boolean { return !!this._token(); }
  get initials(): string {
    const u = this._user();
    return u ? (u.firstname[0] + u.lastname[0]).toUpperCase() : 'KA';
  }

  constructor(private router: Router) {
    if (this._token()) { this._user.set(MOCK_USER); }
  }

  async login(req: LoginRequest): Promise<void> {
    await this.delay(700);
    this._user.set({ ...MOCK_USER, email: req.email });
    this._token.set('mock-jwt-token-xyz');
    localStorage.setItem('tl_token', 'mock-jwt-token-xyz');
  }

  async register(req: RegisterRequest): Promise<void> {
    await this.delay(700);
    const u: User = { ...MOCK_USER, firstname: req.firstname, lastname: req.lastname, email: req.email, tel: req.tel, pays: req.pays };
    this._user.set(u);
    this._token.set('mock-jwt-token-xyz');
    localStorage.setItem('tl_token', 'mock-jwt-token-xyz');
  }

  logout(): void {
    this._user.set(null);
    this._token.set(null);
    localStorage.removeItem('tl_token');
    this.router.navigate(['/']);
  }

  updateUser(patch: Partial<User>): void {
    const current = this._user();
    if (current) this._user.set({ ...current, ...patch });
  }

  private delay(ms: number) { return new Promise(r => setTimeout(r, ms)); }
}
