import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  steps = [
    { icon: '👤', title: 'Créez votre profil', desc: 'Renseignez vos expériences, formations, compétences et langues parlées en quelques minutes.' },
    { icon: '🔍', title: 'Soyez découvert',    desc: 'Les recruteurs togolais et africains peuvent rechercher des profils correspondant à leurs besoins.' },
    { icon: '🤝', title: 'Connectez-vous',     desc: 'Échangez directement avec les recruteurs et saisissez les opportunités qui vous correspondent.' },
  ];

  sectors = [
    { icon: '🏗️', name: 'BTP & Génie Civil' }, { icon: '🏥', name: 'Santé & Médecine' },
    { icon: '💻', name: 'Informatique & Tech' }, { icon: '⚖️', name: 'Droit & Justice' },
    { icon: '📊', name: 'Finance & Banque' },   { icon: '🌾', name: 'Agriculture' },
    { icon: '🎓', name: 'Éducation' },          { icon: '🏭', name: 'Industrie' },
    { icon: '✈️', name: 'Transport & Logistique' }, { icon: '🌍', name: 'ONG & Développement' },
  ];
}
