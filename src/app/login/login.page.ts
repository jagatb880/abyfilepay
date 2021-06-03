import { Component, OnInit } from '@angular/core';
import { Platform,NavController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import {NgForm} from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Router,NavigationEnd} from '@angular/router';
import { Device } from '@ionic-native/device/ngx';
import { LoadingController, AlertController} from '@ionic/angular';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import * as Constants from '../../global';//
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import * as CryptoJS from 'crypto-js';
import { Geolocation } from '@ionic-native/geolocation';
import {TranslateService} from "@ngx-translate/core";

import { PopoverController } from '@ionic/angular';
import { ListeComponent } from '../liste/liste.component';

let winkeys = Array();
let WEBVIEW_FILE_PREFIX = false;
for(var i in window)
{
  if(i=='WEBVIEW_FILE_PREFIX') 
  {
  	WEBVIEW_FILE_PREFIX = true;
  	break;
  }
}
if(!WEBVIEW_FILE_PREFIX)
{
    interface Window {
        WEBVIEW_FILE_PREFIX: any;
        WEBVIEW_CONTENT_PREFIX: any;
    }
}

@Injectable({
  providedIn: 'root'
})
@Injectable()
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

	private blackLists: string[] = ['/tab/wall', '/event-list', '/tutorial', '/offline-message'];
	Session;
	Translate:any;
	GTranslate:any;
	Globale;
	Error:any;
	Login:any;
	passeye:any;
	passtype:any;
	Password:any;
	Code:any;
	Phone:any;
	mystorage:any;
	DeviceUrl:any;
	Config:any;
	LastLogin:any;
	Nouveau;
	Logins;
	langue;
	langues;
	Erreurs;
	constructor(
		private platform: Platform,
		private translate: TranslateService,
		private device: Device,
		private router: Router,
		private storage: NativeStorage,
		public loadingController: LoadingController,
		public alertController: AlertController,
		public popoverController: PopoverController,
		private transfer: FileTransfer,
		private file: File,
		private webview: WebView,
		public navCtrl: NavController,
		private http: HttpClient
		) 
	
	{
		
		
		this.Globale =  new Constants.Totale(this.alertController,this.http,this.translate,this.router);
		this.Globale.traduire('login');
		if(this.Globale.Session != null && JSON.stringify(this.Globale.Session) != "{}")
		{

			this.Globale.navigate("/home");
		}
		this.Logins = this.Globale.getLogin();
		this.LastLogin = "";
		if(this.Logins.length>0)
		{
			this.Nouveau = false;
			this.LastLogin = this.Logins[0];
		}
		else this.Nouveau = true;
		
		this.langue = this.Globale.Langues[0];
		let infos = this.Globale.Langues;
		
		if(this.Globale.Langue==null || this.Globale.Langue=='null')
		{
			this.Globale.Langue = 'fr';
		}
		
		for(var i in infos)
		{
			if(infos[i]['code']==this.Globale.Langue)
			{
				this.langue = infos[i];
			}
		}
		this.langues = {titre:this.Globale.Translate.choix,infos:infos};

		
	}
	
	nouveau(info) {
		
		if(info!='new_account') return false;
		let val = confirm(this.Globale.Translate.souhait);
		if(val) this.Nouveau = true;
	}
	ngOnInit() 
	{
		
		let val = localStorage.getItem('AByConfig');
		if(val==null || val=='null')
		{
			
		}
		else
		{
			this.Config = JSON.parse(localStorage.getItem('AByConfig'));
			this.Config.auth_free = parseInt(this.Config.auth_free);	
		}
		
		this.passtype = 'password';	
		this.passeye = 'eye';
		var options = {
		  enableHighAccuracy: true,
		  timeout: 5000,
		  maximumAge: 0
		};		
		navigator.geolocation.getCurrentPosition(this.success);
	}
	
	async onSubmit(verifForm: NgForm)
	{
		const loading = await this.loadingController.create({
			  message: this.Globale.Translate.ouvrir+" ...",
    		  duration: 45000
			});
		this.presentLoading(loading);
		let check = "0";
		
		
		if(verifForm.controls['password'].value=='' || verifForm.controls['number'].value=='')
		{
			this.Globale.alert(this.Globale.Translate.oblige);
			loading.dismiss();
			return 1;
		}
		let device = this.Globale.Device;

		//Collecte des données url;
		
		var UrlDatas = Array();
		UrlDatas.push('dev-latitude='+localStorage.getItem('latitude'));
		UrlDatas.push('dev-longitude='+localStorage.getItem('longitude'));
		for(var key in device)
		{
				UrlDatas.push('dev-'+key+'='+device[key]);//Données de formulaire
		}

		for(var key in verifForm.controls)
		{
				UrlDatas.push(key+'='+verifForm.controls[key].value);//Données de formulaire
		}
		let data = UrlDatas.join('&');
		data = this.Globale.CryptoJSAesEncrypt(Constants.PASS_PHRASE,data);
		data = encodeURIComponent(data);

    	let url = this.Globale.API_URL+'&_ajx=login&securedata='+ data;
		let result = this.http.get(url);

		result.subscribe (data => //En cas de succès de la requête
		{
		  localStorage.setItem("FlashLasLogin",verifForm.controls['number'].value);
		  if(data['error']==1)
	      {
	      	loading.dismiss();
			this.Globale.alert(data['message']);
			
	      }
	      else if(data['error']==0)
	      {
			this.Globale.saveLogin(data['login']);
			this.Globale.saveLangues(data['langues']);
			if(data['message']) this.Globale.alert(data['message']);
			data = this.Globale.toIonicData(data);
			this.Globale.setSession('Session',data);
			let d = new Date();
			let now = ';'+d.getTime();
			this.router.navigate(["/home",{ time: now}]);
			loading.dismiss();
	      }
	    },
	    (err) => //En cas d'erreur
	    {
			this.Globale.alertHTTP(err);
			loading.dismiss();
	    }
	    );
		
	}
	managePassword()
	{
		if(this.passeye == 'eye')
		{
			this.passtype = 'number';	
			this.passeye = 'eye-off';
		}
		else
		{
			this.passtype = 'password';	
			this.passeye = 'eye';
		}
	}
	success(pos) 
	{
	  var crd = pos.coords;
	  localStorage.setItem('longitude',crd.longitude);
	  localStorage.setItem('latitude',crd.latitude);
	}
	goToPage(page)
	{
	    this.Globale.navigate([page]);
	    return 0;
	}
	changeLangue(lang)
	{
		localStorage.setItem(Constants.APP_SESSION+'Langue',lang);
		this.Globale.navigate('/login');
	}
	
	exitApp()
	{
     navigator['app'].exitApp();
  	}
	async presentLoading(loading) {
    return await loading.present();
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
		if(this.langue.code!=dataReturned.data.code)
		{
			localStorage.setItem(Constants.APP_SESSION+'Langue',dataReturned.data.code);
			this.Globale.navigate('/login');
		}
		this.langue.code = dataReturned.data.code;
		this.langue.logo = dataReturned.data.logo;
		this.langue.nom = dataReturned.data.nom;
		
	  }
	});
	return await popover.present();
}

fingerprintLogin(){
	
}
}
