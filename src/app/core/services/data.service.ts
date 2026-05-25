import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class DataService {
  readonly profiles: User[] = [
    {
      id: 1, firstname: 'Kwame', lastname: 'Adjété',
      email: 'kwame@email.com', tel: '+33 6 12 34 56 78',
      pays: 'France', disponibility: 'disponible', visible: true,
      roles: [{ name: 'Ingénieur', field: 'btp' }],
      profile: { title: 'Ingénieur Génie Civil', resume: 'Ingénieur civil spécialisé en infrastructures urbaines avec 8 ans d\'expérience en France et en Afrique subsaharienne. Désireux de contribuer au développement du Togo en apportant mon expertise acquise en Europe.', desiredLocation: 'Lomé, Togo' },
      experiences: [
        { poste: 'Chef de projet BTP', entreprise: 'Bouygues Construction', dateDebut: '2020-01', dateFin: null, description: 'Pilotage de projets d\'infrastructures urbaines en Île-de-France.' },
        { poste: 'Ingénieur structures', entreprise: 'VINCI Énergies', dateDebut: '2017-03', dateFin: '2020-01', description: 'Calcul et dimensionnement de structures béton armé.' },
        { poste: 'Ingénieur junior', entreprise: 'SOGEA-SATOM', dateDebut: '2015-09', dateFin: '2017-02', description: 'Supervision de chantiers à Lomé.' },
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
    },
    {
      id: 2, firstname: 'Abena', lastname: 'Mensah',
      email: 'abena@email.com', tel: '+33 7 98 76 54 32',
      pays: 'France', disponibility: 'disponible', visible: true,
      roles: [{ name: 'Médecin', field: 'sante' }],
      profile: { title: 'Médecin Spécialiste Cardiologue', resume: 'Cardiologue avec 10 ans de pratique hospitalière en France. Prête à rejoindre une structure de santé en Afrique de l\'Ouest pour contribuer au développement du système de santé togolais.', desiredLocation: 'Kara, Togo' },
      experiences: [
        { poste: 'Cardiologue', entreprise: 'CHU de Bordeaux', dateDebut: '2018-09', dateFin: null, description: 'Consultations et interventions cardiologiques, 200+ patients/mois.' },
        { poste: 'Interne en médecine', entreprise: 'CHU Pellegrin', dateDebut: '2014-09', dateFin: '2018-08', description: 'Formation clinique polyvalente.' },
      ],
      formations: [
        { diplome: 'Doctorat en Médecine', ecole: 'Université de Bordeaux', annee: 2018 },
        { diplome: 'PACES', ecole: 'Université Toulouse III', annee: 2014 },
      ],
      competences: [
        { nom: 'Cardiologie', niveau: 'expert' }, { nom: 'Échocardiographie', niveau: 'expert' },
        { nom: 'Médecine interne', niveau: 'intermediaire' }, { nom: 'Urgences', niveau: 'intermediaire' },
      ],
      langues: [
        { name: 'Français', level: 'Natif', pct: 100 }, { name: 'Anglais', level: 'Courant', pct: 85 },
        { name: 'Ewé', level: 'Notions', pct: 30 },
      ],
    },
    {
      id: 3, firstname: 'Kofi', lastname: 'Dossou',
      email: 'kofi@email.com', tel: '+33 6 55 44 33 22',
      pays: 'France', disponibility: 'ouvert', visible: true,
      roles: [{ name: 'Développeur', field: 'tech' }],
      profile: { title: 'Développeur Full-Stack Senior', resume: 'Développeur passionné spécialisé en Angular et Node.js. 6 ans d\'expérience dans des startups françaises, cherche à impulser la transformation numérique au Togo.', desiredLocation: 'Lomé, Togo' },
      experiences: [
        { poste: 'Lead Developer', entreprise: 'Startup FinTech Paris', dateDebut: '2021-01', dateFin: null, description: 'Architecture et développement de la plateforme de paiement.' },
        { poste: 'Développeur Full-Stack', entreprise: 'Agence Web Lyon', dateDebut: '2018-06', dateFin: '2021-01', description: 'Développement d\'applications web sur mesure.' },
      ],
      formations: [
        { diplome: 'Master Informatique', ecole: 'Université Claude Bernard Lyon 1', annee: 2018 },
      ],
      competences: [
        { nom: 'Angular', niveau: 'expert' }, { nom: 'Node.js', niveau: 'expert' },
        { nom: 'PostgreSQL', niveau: 'expert' }, { nom: 'Docker', niveau: 'intermediaire' },
        { nom: 'React', niveau: 'intermediaire' }, { nom: 'Python', niveau: 'debutant' },
      ],
      langues: [
        { name: 'Français', level: 'Natif', pct: 100 }, { name: 'Anglais', level: 'Avancé', pct: 80 },
        { name: 'Ewé', level: 'Courant', pct: 70 },
      ],
    },
  ];

  getProfileById(id: number): User | undefined {
    return this.profiles.find(p => p.id === id);
  }

  searchProfiles(query: string, dispo: string, location: string): User[] {
    return this.profiles.filter(p => {
      if (!p.visible) return false;
      if (dispo && p.disponibility !== dispo) return false;
      if (location && !p.profile.desiredLocation.includes(location)) return false;
      if (query) {
        const q = query.toLowerCase();
        return p.firstname.toLowerCase().includes(q) ||
               p.lastname.toLowerCase().includes(q) ||
               p.profile.title.toLowerCase().includes(q) ||
               p.competences.some(c => c.nom.toLowerCase().includes(q));
      }
      return true;
    });
  }
}
