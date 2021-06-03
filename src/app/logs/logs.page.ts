import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {NgForm} from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Device } from '@ionic-native/device/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ActivatedRoute,Router } from '@angular/router';
import { LoadingController, AlertController} from '@ionic/angular';
import * as Constants from '../../global';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.page.html',
  styleUrls: ['./logs.page.scss'],
})
export class LogsPage implements OnInit {

 Globale;
	Translate;
	Erreurs;

  public showPassword: boolean = false;
  constructor(private router: Router,private translate: TranslateService,private http: HttpClient,public alertController: AlertController) 
  { 
	this.Globale =  new Constants.Totale(this.alertController,this.http,this.translate,this.router);
	sessionStorage.removeItem('Suscribe');
	
  }

  ngOnInit() {
  }
  clearLog()
	{
		
		localStorage.setItem(this.Globale.APP_SESSION+'Errors',"");
		this.Globale.navigate('/login');
	}
	public onPasswordToggle(): void {
    this.showPassword = !this.showPassword;
  }

}
