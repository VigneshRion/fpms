import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import {
  login,
  loginSuccess,
  register,
  registerSuccess,
} from '../actions/auth.action';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap((action) =>
        this.authService.login(action).pipe(
          map((token) => loginSuccess({ token })),
          catchError((error) => of({ type: '[Auth] Login Failure', error }))
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(register),
      switchMap((action) =>
        this.authService.register(action).pipe(
          map((token) => registerSuccess({ token })),
          catchError((error) => of({ type: '[Auth] Register Failure', error }))
        )
      )
    )
  );
}
