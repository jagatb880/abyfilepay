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
  selector: 'app-suscribe',
  templateUrl: './suscribe.page.html',
  styleUrls: ['./suscribe.page.scss'],
})
export class SuscribePage implements OnInit { 

	Globale;
	Translate;

  public showPassword: boolean = false;
  constructor(private router: Router,private translate: TranslateService,private http: HttpClient,public alertController: AlertController) 
  { 
	this.Globale =  new Constants.Totale(this.alertController,this.http,this.translate,this.router);
	sessionStorage.removeItem('Suscribe');
		this.Translate = {};
		this.translate.addLangs([this.Globale.Langue, 'klingon']);
		this.translate.setDefaultLang(this.Globale.Langue);
		this.translate.use(this.Globale.Langue);
		this.translate.get('suscribe').subscribe(
		  value => {
			// value is our translated string
			this.Translate =  value;
		  }
		);
  }

  ngOnInit() {
  }
  moveToPage(page,obj)
	{
		
		this.router.navigate([page, { objet: obj}]);
	}
	public onPasswordToggle(): void {
    this.showPassword = !this.showPassword;
  }

}
