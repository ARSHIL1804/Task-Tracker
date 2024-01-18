import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { CustomDialogComponent } from './common/components/custom-dialog/custom-dialog.component';
import { MatExpansionModule} from '@angular/material/expansion';
import { NgxUiLoaderModule, NgxUiLoaderHttpModule } from 'ngx-ui-loader';
import { ProfileIconComponent } from './common/components/profile-icon/profile-icon.component';
import { HeaderComponent } from './common/components/header/header.component';
import { DrawerComponent } from './common/components/drawer/drawer.component';
import {FormsModule} from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    CustomDialogComponent,
    HeaderComponent,
    DrawerComponent,
  ],
  imports: [
    MatExpansionModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    NgxUiLoaderModule,
    FormsModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }