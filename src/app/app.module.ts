import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Device } from '@ionic-native/device/ngx';

import { HttpClientModule,HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { CreditCompteComponent } from './credit-compte/credit-compte.component';
import { ListeComponent } from './liste/liste.component';
import { FormsModule } from '@angular/forms'

import { Uid } from '@ionic-native/uid/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

import { Geolocation } from '@ionic-native/geolocation';

import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateService} from "@ngx-translate/core";


@NgModule({
  declarations: [AppComponent,CreditCompteComponent,ListeComponent],
  entryComponents: [CreditCompteComponent,ListeComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
	ReactiveFormsModule,
    IonicModule.forRoot(),
	TranslateModule.forRoot({
          loader: {
              provide: TranslateLoader,
              useFactory: (HttpLoaderFactory),
              deps: [HttpClient]
          }
      }),
	FormsModule,
	ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    NativeStorage,
    Device,
    FileTransfer, 
    Uid,
    AndroidPermissions,
    File,
    WebView,
    FileTransferObject,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}