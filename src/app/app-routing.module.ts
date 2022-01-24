import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ManageComponent } from './manage/manage.component';
import { UploadComponent } from './upload/upload.component';

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
  data: {
    isAuthOnly: true,
  }
}

const uploadPage: Route = {
  path: "upload",
  component: UploadComponent,
  data: {
    isAuthOnly: true,
  }
}

const routes: Routes = [homePage, aboutPage, managePage, uploadPage];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
