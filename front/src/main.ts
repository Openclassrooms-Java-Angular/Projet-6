import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/pages/home/home.component';
import { LoginComponent } from './app/pages/login/login.component';
import { RegisterComponent } from './app/pages/register/register.component';
import { FeedComponent } from './app/pages/feed/feed.component';
import { environment } from './environments/environment';

// Angular Material modules
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideHttpClient } from "@angular/common/http";
import { TopicsComponent } from './app/pages/topics/topics.component';
import { PostDetailComponent } from './app/pages/post-detail/post-detail.component';
import { CreatePostComponent } from './app/pages/create-post/create-post.component';
import { ProfileComponent } from './app/pages/profile/profile.component';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'feed', component: FeedComponent },
      { path: 'posts/:id', component: PostDetailComponent },
      { path: 'topics', component: TopicsComponent },
      { path: 'create-post', component: CreatePostComponent },
      { path: 'profile', component: ProfileComponent },
      { path: '**', redirectTo: '' }
    ]),

    // Animations (une seule méthode)
    provideAnimations(),

    provideHttpClient(),

    // Material modules
    importProvidersFrom([
      MatButtonModule,
      MatFormFieldModule,
      MatInputModule
      // + autres modules Material si besoin
    ])
  ]
})
  .catch(err => console.error(err));
