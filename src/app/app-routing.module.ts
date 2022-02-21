import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ShortComponent } from './short/short.component';
import { HomeComponent } from './home/home.component';
import { ManageComponent } from './manage/manage.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UploadComponent } from './upload/upload.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from "@angular/fire/compat/auth-guard";
import { ShortService } from './services/short.service';

const redirectUnauthorizedToHome = () => redirectUnauthorizedTo("/");

const homePage: Route = {
path: "",
component: HomeComponent,
};

const aboutPage: Route = {
path: "about",
component: AboutComponent,
};

const managePage: Route = {
  path: "manage",
  component: ManageComponent,
  canActivate: [AngularFireAuthGuard],
  data: {
    isAuthOnly: true,
    authGuardPipe: redirectUnauthorizedToHome,
  }
}

const uploadPage: Route = {
  path: "upload",
  component: UploadComponent,
  canActivate: [AngularFireAuthGuard],
  data: {
    isAuthOnly: true,
    authGuardPipe: redirectUnauthorizedToHome,
  }
}

const shortPage: Route = {
  path: "short/:id",
  component: ShortComponent,
  resolve: {
    short: ShortService
  }
}

const notFoundPage: Route = {
  path: "**",
  component: NotFoundComponent,
}

const routes: Routes = [
  homePage, 
  aboutPage, 
  managePage, 
  uploadPage, 
  shortPage,
  {
    path: "manage-shorts",
    redirectTo: "manage"
  },
  notFoundPage,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
