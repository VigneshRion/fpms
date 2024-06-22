import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { reducers } from './store/reducers';
import { AuthEffects } from './store/effects/auth.effects';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from './store/reducers';
import { map, take } from 'rxjs/operators';
// import { NgApexchartsModule } from 'ng-apexcharts';
// import { AgGridModule } from 'ag-grid-angular';
import { DashboardModule } from './components/dashboard.module';

function checkAuthState(
  authService: AuthService,
  router: Router,
  store: Store<AppState>
): () => Promise<void> {
  return () => {
    return new Promise((resolve) => {
      store
        .pipe(
          select('auth'),
          take(1),
          map((authState) => {
            if (authState.token) {
              router.navigate(['/dashboard']);
            } else {
              router.navigate(['/login']);
            }
            resolve();
          })
        )
        .subscribe();
    });
  };
}

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    DashboardModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
  ],
  providers: [
    AuthService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: checkAuthState,
      deps: [AuthService, Router, Store],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
