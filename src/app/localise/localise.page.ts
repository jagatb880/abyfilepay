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
import * as CryptoJS from 'crypto-js';
import {TranslateService} from "@ngx-translate/core";

import { PopoverController } from '@ionic/angular';
import { ListeComponent } from '../liste/liste.component';

@Component({
  selector: 'app-localise',
  templateUrl: './localise.page.html',
  styleUrls: ['./localise.page.scss'],
})
export class LocalisePage implements OnInit { Globale;

	Error:any;
	Pays:any;
	Phone:any;
	Datas:any;
	public showPassword: boolean = false;
	public cshowPassword: boolean = false;
	DeviceUrl:any;
	formdata:any;
	pays:any;

	constructor(
			private router: Router,
			private activatedRoute: ActivatedRoute,
			private http: HttpClient,
			private translate: TranslateService,
			public alertController: AlertController,
			public loadingController: LoadingController,
			public popoverController: PopoverController,
			private device: Device,
			private storage: NativeStorage
	) 
	{
		this.Globale =  new Constants.Totale(this.alertController,this.http,this.translate,this.router);
		this.Globale.traduire('localise');
	}
	async ngOnInit() 
	{
		let compte = this.activatedRoute.snapshot.paramMap.get('objet');
		const loading = await this.loadingController.create(
		{
			message: this.Globale.Translate.charge,
			duration: 22000
		});

		this.formdata = JSON.parse(sessionStorage.getItem('Suscribe'));
		if(this.formdata == null) this.formdata = {};
		
		this.pays = {code:"CM",logo:"https://s3.amazonaws.com/rld-flags/cm.svg",nom:"Cameroon (+237)"};
		this.presentLoading(loading);
		let url = Constants.API_URL+'&_ajx=country&numero=';
		let result = this.http.get(url);
		result.subscribe (data => //En cas de succès de la requête
		{
			let infos = Array();
			for(var i in data)
			{
				infos.push({code:data[i].Code,logo:data[i].Flag,nom:data[i].Nom+' ('+data[i].Indicatif+')'})
			}
			this.Pays = {titre:"Liste des pays",infos:infos};
			loading.dismiss();
		},
		(err) => //En cas d'erreur
		{
		this.Globale.alertHTTP(err);
		loading.dismiss();
		}
		);
	}
	retour(loginForm: NgForm)
	{
		for(var key in loginForm.controls)
		{
				this.formdata[key] = loginForm.controls[key].value;
		}
		let save = JSON.stringify(this.formdata);
		sessionStorage.setItem('Suscribe',save);
		alert(sessionStorage.getItem('Suscribe'));
		this.Globale.navigate('identifie');
	}
	async onSubmit(loginForm: NgForm)
	{
		const loading = await this.loadingController.create({
			  message: this.Globale.Translate.lcreation+' ...'
			});

		if(
			loginForm.controls['region'].value==''  
			|| loginForm.controls['piece'].value=='' 
			|| loginForm.controls['quartier'].value==''   
			|| loginForm.controls['ville'].value=='')
		{
			this.Globale.alert(this.Globale.Translate.oblige);
			return 1;
		}
		let device = this.Globale.Device;


		//Collecte des données url;
		var UrlDatas = Array();
		UrlDatas.push('pays='+this.pays.code);
		for(var key in device)//données appareils
		{
				UrlDatas.push('dev-'+key+'='+device[key]);//Données de formulaire
		}

		for(var key in loginForm.controls)//données formulaire
		{
				UrlDatas.push(key+'='+loginForm.controls[key].value);//Données de formulaire
		}
		
		var objet = JSON.parse(sessionStorage.getItem('Suscribe'));// donées formulaire precedent
		for(var i in objet)
		{
			UrlDatas.push(i+'='+objet[i]);
		}
		let data = UrlDatas.join('&');
		data = this.Globale.CryptoJSAesEncrypt(Constants.PASS_PHRASE,data);
		data = encodeURIComponent(data);

    	let url = Constants.API_URL+'&_ajx=ident&securedata='+ data;
		

		this.presentLoading(loading);
		let result = this.http.get(url);
		result.subscribe (data => //En cas de succès de la requête
		{
		  if(data['error']==1)
	      {
	      	this.Globale.alert(data['message']);
	      	if(data['verif']==1) this.router.navigate(["/verifie"]);
			
			loading.dismiss();
	      }
	      else if(data['error']==0)
	      {
			this.router.navigate(["/verifie",{user:data['user']}]);
			loading.dismiss();
	      }
	    },
	    (err) => //En cas d'erreur
	    {
		  this.Globale.alert(this.Globale.Translate.noconnect); loading.dismiss();
		  
	    }
	  );
		
	}
	toUrl(objet)//Converti un objet en valeur url GET
	{
		//alert(objet);
	}
	
	async presentLoading(loading) {
    return await loading.present();
  }
  public onPasswordToggle(): void {
    this.showPassword = !this.showPassword;
    }
    public oncPasswordToggle(): void {
    this.cshowPassword = !this.cshowPassword;
    }
    encode(str) 
    {
		var encoded = "";
		let i;
		for (i=0; i<str.length;i++) {
		var a = str.charCodeAt(i);
		var b = a ^ 51;    // bitwise XOR with any number, e.g. 123
		encoded = encoded+String.fromCharCode(b);
		}
		return encoded;
	}
    moveToPage(page,obj)
	{
		
		this.router.navigate([page, { objet: obj}]);
	}
	 async presentPopover(infos) 
  {
	
    const popover = await this.popoverController.create({
      component: ListeComponent,
      componentProps: {
        "infos": infos
      },
      translucent: true
    });
	popover.onDidDismiss().then((dataReturned) => {
	  if (dataReturned !== null) {
		dataReturned.data.nom;
		this.pays.code = dataReturned.data.code;
		this.pays.logo = dataReturned.data.logo;
		this.pays.nom = dataReturned.data.nom;
		
	  }
	});
	return await popover.present();
}

}
