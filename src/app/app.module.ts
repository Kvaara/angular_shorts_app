import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { NavComponent } from './nav/nav.component';
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ManageComponent } from './manage/manage.component';
import { UploadComponent } from './upload/upload.component';
import { ShortComponent } from './short/short.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import { ShortsListComponent } from './shorts-list/shorts-list.component';
// import { AngularFireStorageModule } from '@angular/fire/compat/storage';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    AboutComponent,
    ManageComponent,
    UploadComponent,
    ShortComponent,
    NotFoundComponent,
    EditComponent,
    ShortsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    SharedModule,
    ReactiveFormsModule,
    // AngularFireStorageModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
