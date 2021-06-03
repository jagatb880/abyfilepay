import { LoadingController, AlertController} from '@ionic/angular';
import { ActivatedRoute,Router } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import {TranslateService} from "@ngx-translate/core";

//export const APP_URL = "http://localhost/web/vps.abyfou.cm/";
export const APP_URL = "https://cm.abyfoupay.com/"; 
export const APP_SESSION = "FlashPay";
export const APP_VERSION = "1.0.2";
export const BASE_URL= APP_URL+"live/";////18.130.13.165/";
export const PASS_PHRASE= "10d331d38a8d820b8fd0f67783863d3b";
export const LANGUES = '[{"code":"fr","logo":"https://s3.amazonaws.com/rld-flags/fr.svg","nom":"Français"},{"code":"en","logo":"https://s3.amazonaws.com/rld-flags/gb.svg","nom":"English"},{"code":"ar","logo":"https://s3.amazonaws.com/rld-flags/sa.svg","nom":"العربية"}]';

//localStorage.clear();
//
let version = "live";
let json = 'jsons';
let lang = localStorage.getItem(APP_SESSION+'Langue');
if(lang==null || lang=='null')
{
	localStorage.setItem(APP_SESSION+'Langue','fr');
	lang = localStorage.getItem(APP_SESSION+'Langue');
}	
export const API_URL= APP_URL+json+"/?lg="+lang+'&'+"version=1.1.1&";//jsons

export class Totale 
{
	Session:any;
	Device:any;
	Translate;
	GTranslate;
	Langue;
	Langues;
	API_URL;
	APP_SESSION;
	Errors;
	constructor
	(
		public alertController: AlertController,
		private http: HttpClient,
		private translate: TranslateService,
		private router: Router
	)
	{
		//Chargement des variables de la session
		this.loadSession();
		
		//Choix de la langue par défaut
		let lang = localStorage.getItem(APP_SESSION+'Langue');
		if(lang==null || lang=='null')
		{
			localStorage.setItem(APP_SESSION+'Langue','fr');
			lang = localStorage.getItem(APP_SESSION+'Langue');
		}
		this.API_URL = APP_URL+json+"/?lg="+lang+'&'+"version="+APP_VERSION+"&";
		this.APP_SESSION = APP_SESSION;
		
		//Choix des langues de l'application 
		let langs = localStorage.getItem(APP_SESSION+'Langues');
		if(langs==null || langs=='null')
		{
			localStorage.setItem(APP_SESSION+'Langues',LANGUES);
		}
		this.Langues = JSON.parse(localStorage.getItem(APP_SESSION+'Langues'));
	}
	traduire(page)
	{
		this.Translate = {};
		this.translate.addLangs([this.Langue, 'klingon']);
		this.translate.setDefaultLang(this.Langue);
		this.translate.use(this.Langue);
		this.translate.get(page).subscribe(
		  value => {
			// value is our translated string
			this.Translate =  value;
			this.translate.get('global').subscribe(
			  value => {
				// value is our translated string

				for(var i in value)
				{
					/*Object.defineProperty(this.Translate, i, {
					  value: value[i],
					  writable: true,
					  enumerable: true,
					  configurable: true
					});*/
					this.Translate[i]=value[i];
				}
				
				//A enlever
				
			  }
			);

			
		  }
		);
	}
	loadSession()
	{
		let session = sessionStorage.getItem(APP_SESSION+'Session');
		let device  = localStorage.getItem(APP_SESSION+'Device');
		
		let langue  = localStorage.getItem(APP_SESSION+'Langue');
		if(langue==null || langue=="") langue = "fr";
		this.Langue =  langue;
		
		if(session==null || session=="") session = "{}";
		if(device==null || device=="")
		{
			device = "{}";
		}
		this.Session = JSON.parse(session);
		this.Device =  JSON.parse(device);
		
		let errors  = localStorage.getItem(APP_SESSION+'Errors');
		if(errors==null || errors=="") errors = "{}";

		this.Errors  = JSON.parse(errors);
	}
	inArray(needle, haystack) 
	{
		var length = haystack.length;
		for(var i = 0; i < length; i++) {
			if(haystack[i] == needle) return true;
		}
		return false;
	}
	updateImei(imei)
	{
		let device  = JSON.parse(localStorage.getItem(APP_SESSION+'Device'));

		Object.defineProperty(device, "imei", {
			  value: imei,
			  writable: true,
			  enumerable: true,
			  configurable: true
			});
		sessionStorage.setItem(APP_SESSION+'Device',JSON.stringify(device));

	}
	navigate(page,obj={})
	{
		var d = new Date();
		var n = d.getTime();
		for(var i in obj)
		{
			if(i=='time') continue;
			Object.defineProperty(obj, i, {
			  value: obj[i],
			  writable: true,
			  enumerable: true,
			  configurable: true
			});
		}

			Object.defineProperty(obj, "time", {
				value: n,
				writable: true,
				enumerable: true,
				configurable: true
			});
		this.router.navigate([page, obj]);
	}
	CryptoJSAesEncrypt(passphrase, plain_text)
	{

		var salt = CryptoJS.lib.WordArray.random(256);
		var iv = CryptoJS.lib.WordArray.random(16);
		var key = CryptoJS.PBKDF2(passphrase, salt, { hasher: CryptoJS.algo.SHA512, keySize: 64/8, iterations: 999 });
		plain_text = plain_text.toString();
		var encrypted = CryptoJS.AES.encrypt(plain_text, key, {iv: iv});

		var data = 
		{
			ciphertext : CryptoJS.enc.Base64.stringify(encrypted.ciphertext),
			salt : CryptoJS.enc.Hex.stringify(salt),
			iv : CryptoJS.enc.Hex.stringify(iv)    
		}

		return JSON.stringify(data);
	}
	replace(chaine,from,replace)
	{
		//chaine = chaine.replace(from,replace);
		return chaine.toString().replace(new RegExp(from, 'g'), replace);
	}
	in_array(needle, haystack) 
	{
		for(var i in haystack) {
			if(haystack[i] == needle) return true;
		}
		return false;
	}
	array_unique(table) 
	{
		let atable = table;
		let ntable = Array();
		for(var i in table) {
			if(!this.in_array(table[i],ntable))
			{
				ntable.push(table[i]);
				table[i]=null;
			}				
		}
    return ntable;
}
	saveLogin(login)
	{
		let logins = localStorage.getItem(APP_SESSION+'Logins');
		let nlogins = Array();
		
		if(logins!=null && logins!="") nlogins = logins.split(',');
		nlogins.push(login);
		nlogins = this.array_unique(nlogins);
		logins = nlogins.join(',');
		localStorage.setItem(APP_SESSION+'Logins',logins);
	}
	saveLangues(langues)
	{
		langues = this.toIonicData(langues);
		let tlangs = JSON.stringify(langues);
		localStorage.setItem(APP_SESSION+'Langues',tlangs);
	}
	getLogin()
	{
		let logins = localStorage.getItem(APP_SESSION+'Logins');
		let nlogins = Array();
		
		if(logins!=null && logins!="") nlogins = logins.split(',');
		
		return nlogins;
	}
	alertHTTP(err)
	{
		let error = err['message'].replace(err['url'],'');
		let errors = error.split(' for');
		let url = err['url'].substring(0,75);
		error = errors[0];
		error = error.toUpperCase();
		error = this.replace(error, ' ','_');
		switch(error)
		{
			case 'HTTP_FAILURE_RESPONSE':
				this.alert(this.Translate.noconnect);
			break;
			default: this.alert(this.Translate.noconnect);
		}
		this.setError(error+' | '+url);
	}
	
	async alert(texte)
	{
		const alert = await this.alertController.create({
		  header: this.Translate.msgalert,
		  message: texte,
		  buttons: [
			{
			  text: this.Translate.btncontinue,
			  role: 'cancel',
			  cssClass: 'secondary',			  
			  handler: () => {
				return false;
			  }
			}
		  ]
		});

		return await alert.present();
	}
	async confirm(texte)
	{
		const alert = await this.alertController.create({
		  header: this.Translate.msgconfirm,
		  message: texte,
		  buttons: [
			{
			  text: this.Translate.btncancel,
			  role: 'cancel',
			  cssClass: 'secondary',
			  handler: () => {
				return false;
			  }
			  
			}, {
			  text: this.Translate.btncontinue,
			  handler: () => {
				return true;
			  }
			}
		  ]
		});

		return await alert.present();
	}
	empty(value)
	{
		let val;
		let type = typeof value;
		if(type == 'undefined') val= false;
		else if(value =='' || value ==0)
		{
			val= false;
		}
		val= true;
		return val;
	}
	setSession(key,value)
	{
		sessionStorage.setItem(APP_SESSION+key,JSON.stringify(value));
		this.loadSession();
	}
	getSession(key)
	{
		let info = JSON.parse(sessionStorage.getItem(APP_SESSION+key));
		return info;
	}
	setDevice(value)
	{
		localStorage.setItem(APP_SESSION+'Device',JSON.stringify(value));
		this.loadSession();
	}
	getSolde()
	{
		let session1 = sessionStorage.getItem(APP_SESSION+'Session');
		let session = JSON.parse(session1);
		if(session==null || session=="") return false;
		let url = API_URL+'&tken='+this.Session.tocken+'&_ajx=solde&login=';

		let result = this.http.get(url);
		result.subscribe (data => //En cas de succès de la requête
		{
			
			session.solde = data['solde'];
			session.comm = data['commission'];
			sessionStorage.setItem(APP_SESSION+'Session',JSON.stringify(session));
			this.loadSession();
		},
		(err) => //En cas d'erreur
		{
			this.alertHTTP(err);

		}
		);

	}
	getService(key)
	{
		for(var i in this.Session.Services)
		{
			if(key==this.Session.Services[i].code)
			{
				return this.Session.Services[i];
			}
		}
		return '';
	}
	getGroupe(key)
	{
		for(var i in this.Session.Groupes)
		{
			if(key==this.Session.Groupes[i].code)
			{
				return this.Session.Groupes[i];
			}
		}
		return '';
	}
	logout()
	{
		sessionStorage.removeItem(APP_SESSION+'Session');
		sessionStorage.clear();
		//this.navigate('/login');
	}
	setError(erreur)
	{
		let serrors  = localStorage.getItem(APP_SESSION+'Errors');
		let nerrors = Array();
		let errors = Array();
		
		if(serrors==null || serrors=="" || serrors=="{}") {}
		else
		{
			errors = JSON.parse(serrors);
			for(var i in errors)
			{
				nerrors.push(errors[i]);
			}
			errors = nerrors;
		}
		let mdate = new Date();
		nerrors.unshift(''+mdate.toUTCString()+' | '+erreur);
		localStorage.setItem(APP_SESSION+'Errors',JSON.stringify(nerrors));
	}
	toIonicData(data)
	{
		let table,mdata;
		if(data==null || data=='null') data = "";
		let typedata = (typeof data);
		if(typedata!='object') return data;
		let keys = Object.keys(data);
		let test = parseInt(keys[0]);
		if(test==0)
		{
			table = Array();
			for(var i in data)
			{
				table.push(data[i]);
			}
			data=table;
		}
		else 
		{
			for(var i in data)
			{
				data[i] = this.toIonicData(data[i]);
			}
		}
		return data;
		
	}
}