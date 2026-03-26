import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AppComponent } from './app.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
imports: [
  BrowserModule,
  BrowserAnimationsModule,
  MatButtonModule,
  ReactiveFormsModule,
  HttpClientModule,
  MatFormFieldModule,
  MatInputModule,
],
declarations: [
  AppComponent,
  RegisterComponent,
  HomeComponent
],
providers: [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
],
bootstrap: [AppComponent],
})
export class AppModule {}
