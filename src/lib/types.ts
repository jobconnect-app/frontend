// Types partagés pour les entités admin

export interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  role: "CANDIDAT" | "ADMIN" | "RECRUTEUR";
  dateInscription: string; // Date ISO
  photoProfil?: string;
  linkedinId?: string;
  googleId?: string;
  isDeleted: boolean;
}

export interface Job {
  id: number;
  titre: string;
  description: string;
  entreprise: string;
  lieu: string;
  salaireMin?: number;
  salaireMax?: number;
  typeContrat: "CDI" | "CDD" | "FREELANCE" | "STAGE" | "ALTERNANCE";
  teletravail: boolean;
  datePublication: string; // Date ISO
  dateExpiration?: string; // Date ISO
  urlPostulation?: string;
  adminId: number;
  isDeleted: boolean;
  categories?: { categoryId: number; jobId: number }[];
  tags?: { tagId: number; jobId: number }[];
  categoryIds?: number[];
  tagIds?: number[];
}

export interface Category {
  id: number;
  nom: string;
  description?: string;
}

export interface Tag {
  id: number;
  nom: string;
}

export interface Application {
  id: number;
  userId: number;
  jobId: number;
  dateCandidature: string; // Date ISO
  statut: "EN_ATTENTE" | "ACCEPTEE" | "REFUSEE";
}
export interface ApplicationWithRelations extends Application {
  user?: {
    nom?: string;
    prenom?: string;
  };
  job?: {
    titre?: string;
  };
}

export interface Favorite {
  id: number;
  userId: number;
  jobId: number;
}

export interface CVRequest {
  id: number;
  userId?: number;
  nom: string;
  email: string;
  message?: string;
  statut: "NOUVEAU" | "EN_COURS" | "TRAITE";
  dateDemande: string; // Date ISO
}

export interface CVTemplate {
  id: number;
  nom: string;
  urlFichier: string;
  miniatureUrl?: string;
  prix?: number;
}

export interface Page {
  id: number;
  titre: string;
  slug: string;
  contenu: string;
  metaTitle?: string;
  metaDescription?: string;
  dateModification: string; // Date ISO
}

// Pas de modèle Setting dans Prisma, on laisse l'interface existante si utilisée côté front
export interface Setting {
  id: number;
  key: string;
  value: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}
