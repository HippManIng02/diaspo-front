import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  isLogin = true;
  loading = signal(false);
  error   = signal('');
  showPwd = signal(false);

  form = {
    firstname: '', lastname: '', email: '', password: '',
    tel: '', pays: 'France', role: 'membre'
  };

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.isLogin = this.route.snapshot.routeConfig?.path === 'login';
  }

  async submit() {
    this.loading.set(true);
    this.error.set('');
    try {
      if (this.isLogin) {
        await this.auth.login({ email: this.form.email, password: this.form.password });
      } else {
        await this.auth.register(this.form);
      }
      this.router.navigate(['/dashboard']);
    } catch (e) {
      this.error.set('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      this.loading.set(false);
    }
  }
}
