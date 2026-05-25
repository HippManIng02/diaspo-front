// models/user.model.ts

export interface Role {
  name: string;
  field: string;
}

export interface Profile {
  title: string;
  resume: string;
  desiredLocation: string;
}

export interface Experience {
  poste: string;
  entreprise: string;
  dateDebut: string;
  dateFin: string | null;
  description: string;
}

export interface Formation {
  diplome: string;
  ecole: string;
  annee: number;
}

export interface Competence {
  nom: string;
  niveau: 'expert' | 'intermediaire' | 'debutant';
}

export interface Langue {
  name: string;
  level: string;
  pct: number;
}

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  passwordd?: string;
  tel: string;
  pays: string;
  disponibility: 'disponible' | 'ouvert' | 'indisponible';
  visible: boolean;
  roles: Role[];
  profile: Profile;
  experiences: Experience[];
  formations: Formation[];
  competences: Competence[];
  langues: Langue[];
}

export interface LoginRequest  { email: string; password: string; }
export interface RegisterRequest {
  firstname: string; lastname: string; email: string;
  password: string; tel: string; pays: string; role: string;
}
export interface AuthResponse  { user: User; token: string; }
