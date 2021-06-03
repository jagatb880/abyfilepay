import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {NgForm} from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Device } from '@ionic-native/device/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ActivatedRoute,Router } from '@angular/router';
import { LoadingController, AlertController} from '@ionic/angular';
import * as Constants from '../../global';
@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.page.html',
  styleUrls: ['./recharge.page.scss'],
})
export class RechargePage implements OnInit { Globale;

data:any;
objet:any;
Logo:any;
Nom:any;
Service:any;
  constructor(
			private router: Router,
			private http: HttpClient,
			private translate: TranslateService,
			public alertController: AlertController,
			public loadingController: LoadingController,
			private device: Device,
			private activatedRoute: ActivatedRoute,
			private storage: NativeStorage
	) 
	{
		this.Globale =  new Constants.Totale(this.alertController,this.http,this.translate,this.router);
		this.Globale.traduire('recharge');
	}

	  ngOnInit() {
		  
		  this.objet = this.activatedRoute.snapshot.paramMap.get('objet');
		  this.Service =this.activatedRoute.snapshot.paramMap.get('objet');
		  this.Nom = this.activatedRoute.snapshot.paramMap.get('nom');
		  this.Logo = Constants.API_URL+'&_ajx=img&code='+this.objet;
	  }
	async onSubmit(loginForm: NgForm)
	{
		if(loginForm.controls['number'].value=='' || loginForm.controls['montant'].value=='' )
		{
			this.Globale.alert(this.Globale.Translate.oblige);
			return 1;
		}
		
		this.moveToPage('/credit-recap',{service: this.Service,montant: loginForm.controls['montant'].value,number:loginForm.controls['number'].value,nom:this.Nom});
	}
	toUrl(objet)//Converti un objet en valeur url GET
	{
		//alert(objet);
	}
	moveToPage(page,obj)
	{
		this.router.navigate([page, obj]);
	}
	
	async presentLoading(loading) {
    return await loading.present();
  }
}
