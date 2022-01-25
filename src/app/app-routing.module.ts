import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ClipComponent } from './clip/clip.component';
import { HomeComponent } from './home/home.component';
import { ManageComponent } from './manage/manage.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UploadComponent } from './upload/upload.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from "@angular/fire/compat/auth-guard";

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

const clipPage: Route = {
  path: "clip/:id",
  component: ClipComponent,
  data: {
    isAuthOnly: true,
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
  clipPage,
  {
    path: "manage-clips",
    redirectTo: "manage"
  },
  notFoundPage,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
