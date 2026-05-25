import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterModule, NavbarComponent],
  template: `
    <div class="page">
      <app-navbar></app-navbar>
      <div class="nf-wrapper">
        <div class="nf-box fade-up">
          <div class="nf-code">404</div>
          <h2 class="nf-title">Page introuvable</h2>
          <p class="nf-sub">La page que vous recherchez n'existe pas ou a été déplacée.</p>
          <a routerLink="/" class="btn btn-primary btn-lg">← Retour à l'accueil</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .nf-wrapper {
      min-height: calc(100vh - 60px);
      display: flex; align-items: center; justify-content: center;
      background: var(--sand);
    }
    .nf-box { text-align: center; padding: 3rem; }
    .nf-code {
      font-family: var(--font-display); font-size: 96px; font-weight: 700;
      color: var(--green-dark); opacity: .15; line-height: 1;
      margin-bottom: 1rem;
    }
    .nf-title { font-family: var(--font-display); font-size: 28px; color: var(--green-dark); margin-bottom: .75rem; }
    .nf-sub   { font-size: 15px; color: var(--text-muted); margin-bottom: 2rem; }
  `],
})
export class NotFoundComponent {}
