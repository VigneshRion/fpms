// register.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/reducers';
import { register } from '../../../store/actions/auth.action';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthState } from '../../../store/reducers/auth.reducer';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  authState$: Observable<AuthState>;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.authState$ = this.store.select('auth');
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.authState$.subscribe((authState) => {
      if (authState.token) {
        localStorage.setItem('token', authState.token);
        this.router.navigate(['/dashboard']);
      }
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.store.dispatch(register(this.registerForm.value));
    }
  }

  get name() {
    return this.registerForm.controls['name'];
  }

  get email() {
    return this.registerForm.controls['email'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }
}
