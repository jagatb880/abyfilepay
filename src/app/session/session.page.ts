import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import { ActivatedRoute,Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { LoadingController, AlertController} from '@ionic/angular';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { NavController } from '@ionic/angular';
import * as Constants from '../../global';


@Component({
  selector: 'app-session',
  templateUrl: './session.page.html',
  styleUrls: ['./session.page.scss'],
})
export class SessionPage implements OnInit { Globale;
passeye:any;
passtype:any;
  constructor(
		private router: Router,
		public loadingController: LoadingController,
		public alertController: AlertController,
		private webview: WebView,
		private translate: TranslateService,
		private http: HttpClient
		) 
		{ 
			this.Globale =  new Constants.Totale(this.alertController,this.http,this.translate,this.router);
			this.Globale.traduire('session');
		}

  ngOnInit() {
	  this.passtype = 'password';	
		this.passeye = 'eye';	
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
	async doLogOut() {
		const alert = await this.alertController.create({
		  header: 'Déconnexion',
		  message: 'Êtes vous sûre de vouloir vous déconnecter ?',
		  buttons: [
			{
			  text: 'Annuler',
			  role: 'cancel',
			  cssClass: 'secondary'
			}, {
			  text: 'OK',
			  handler: () => {
				localStorage.removeItem('AbyConnected');
				localStorage.removeItem('AbyTocken');
				localStorage.removeItem('ABySolde');
				localStorage.removeItem('AByComm');
				localStorage.removeItem('ABySessionData');
				localStorage.removeItem('AbyPass');
				this.router.navigate(["/login"]);
			  }
			}
		  ]
		});

		await alert.present();
	  }
	async onSubmit(verifForm: NgForm)
	{
		const loading = await this.loadingController.create({
			  message: this.Globale.Translate.loadrefresh,
    		  duration: 25000
			});
		this.presentLoading(loading);
		let check = "0";
		let tocken = this.Globale.Session.tocken;
		
		
		var UrlDatas = Array();
		UrlDatas.push('tken='+tocken);
		UrlDatas.push('rpass='+verifForm.controls['password'].value);
		let data = UrlDatas.join('&');
		
		data = this.Globale.CryptoJSAesEncrypt(Constants.PASS_PHRASE,data);
		data = encodeURIComponent(data);
		
		let url = Constants.API_URL+'&tken='+tocken+'&_ajx=refresh&securedata='+ data;
		
		//let url = Constants.API_URL+'&_ajx=refresh&login='+verifForm.controls['number'].value+'&imeicode='+device.imei+'&'+Values.join('&');
		
		
		let result = this.http.get(url);
		
		result.subscribe (data => //En cas de succès de la requête
		{
		  if(data['error']==1)
	      {
	      	loading.dismiss();
			alert(data['message']);
			
	      }
	      else if(data['error']==0)
	      {
			this.router.navigate(["/home"]);
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
	async presentLoading(loading) {
    return await loading.present();
  }
}
