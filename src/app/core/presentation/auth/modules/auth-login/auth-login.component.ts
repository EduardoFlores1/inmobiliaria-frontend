import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router, RouterModule } from '@angular/router';
import {MatProgressBarModule, ProgressBarMode} from '@angular/material/progress-bar';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, NonNullableFormBuilder, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { finalize, switchMap } from 'rxjs';
import { ProgressBarComponent } from '../../../shared/components/progress-bar/progress-bar.component';

@Component({
  selector: 'app-auth-login',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule,
    MatProgressBarModule,
    FormsModule,
    ReactiveFormsModule,
    ProgressBarComponent
  ],
  templateUrl: './auth-login.component.html',
  styleUrl: './auth-login.component.scss'
})
export default class AuthLoginComponent {

  // services
  private _authService = inject(AuthService);
  private _router = inject(Router);

  // builder
  private _formBuilder = inject(FormBuilder);

  // variables
  showProgressBar = signal<boolean>(false);
  modeProgressBar = signal<ProgressBarMode>('indeterminate');

  formGroup = this._formBuilder.group(
    {
    username : new FormControl<string>('', {nonNullable: true, 
      validators: [Validators.required, Validators.minLength(3)]}),
    password : new FormControl<string>('', {nonNullable: true, 
      validators: [Validators.required, Validators.minLength(3)]}),
    });

  login() {
    const req = this.formGroup.getRawValue();
    this.showProgressBar.set(true)
    this._authService.login(req)
    .pipe(
      finalize(() => this.showProgressBar.set(false)),
      switchMap(() => this._authService.getPerfil(req.username))
    )
    .subscribe({
      next: () => {
        console.log('exitos');
        this._router.navigateByUrl('/admin');
      },
      error: (message) => {
        console.log(message)
      }
    });
  }
}
