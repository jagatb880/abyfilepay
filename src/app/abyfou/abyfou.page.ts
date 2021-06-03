import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import { ActivatedRoute,Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import {NgForm} from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Device } from '@ionic-native/device/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { LoadingController, AlertController} from '@ionic/angular';
import * as Constants from '../../global';

@Component({
  selector: 'app-abyfou',
  templateUrl: './abyfou.page.html',
  styleUrls: ['./abyfou.page.scss'],
})
export class AbyfouPage implements OnInit { 

	Globale;
	Service;
	objet:any;
	datas:any;
	image:any;
	montant:any;
	Path:any;
	format:any;
	number:any;
	sender:any;
	password:any;
	/*
	
	private activatedRoute: ActivatedRoute,
	public alertController: AlertController,
	private webview: WebView,
	private navCtrl: NavController,
	private http: HttpClient,
	public loadingController: LoadingController,
	private router: Router
	*/
	constructor
	(
		private activatedRoute: ActivatedRoute,
		private webview: WebView,
		private router: Router,
		public alertController: AlertController,
		private http: HttpClient,
		private translate: TranslateService,
		public loadingController: LoadingController
	)
	{ 
		this.Globale =  new Constants.Totale(this.alertController,this.http,this.translate,this.router);
		this.Globale.traduire('abyfou');
	}

	ngOnInit() 
	{
		this.objet = this.activatedRoute.snapshot.paramMap.get('objet');
		this.Service = this.Globale.getService(this.objet);
		this.image = this.Service.logo;
		this.format = this.Service.format;
	}
	async onSubmit(verifForm: NgForm)
	{
		if(!this.isOperator(verifForm.controls['number'].value,this.objet))
		{
			this.alerter(this.Globale.Translate.msgvnumber);
		}
		
		else if(verifForm.controls['montant'].value%50!=0)
		{
			this.alerter(this.Globale.Translate.msgvmontant);
		}
		else
		{
			const loading = await this.loadingController.create({
			message: this.Globale.Translate.loadconv+'...',
			duration: 20000
		  });
		  this.presentLoading(loading);
			let tocken = this.Globale.Session.tocken;
			let url = Constants.API_URL+'&tken='+tocken+'&_ajx=convload&sender='+verifForm.controls['sender'].value+'&montant='+verifForm.controls['montant'].value+'&receiver='+verifForm.controls['number'].value+'&opera='+this.objet;
			let result = this.http.get(url);
			result.subscribe (data => //En cas de succès de la requête
			{
				if(data['error']==1)
				{
				  

				  if(data['expire']==1)
				  {
					  this.Globale.navigate('/session');
				  }
				  else this.Globale.alert(data['message']);/**/
				  
				  loading.dismiss();
				}

				else if(data['error']==0)
				{
				  this.moveToPage('/abyfou-recap',{objet: this.objet,montant: verifForm.controls['montant'].value,number:verifForm.controls['number'].value,sender:verifForm.controls['sender'].value});
				  loading.dismiss();
				}
			  },
			  (err) => //En cas d'erreur
			  {
			   this.Globale.alertHTTP(err);
			  loading.dismiss();
			  }
			  );
			//
		}

	}
	onCancel()
	{
		let d = new Date();	let time = d.getTime();
		this.router.navigate(["/home",{time:time}]);
	}
	moveToPage(page,obj)
	{
		this.router.navigate([page, obj]);
	}
	replaceAll(str, find, replace) 
	{
		return str.toString().replace(new RegExp(find, 'g'), replace);
	}
	valideNumber(loginForm)
	{
		if(!this.isOperator(loginForm.controls['number'].value,this.objet)) 
		{
			document.getElementsByName('number')[0].style.fontWeight = 'bold';
			document.getElementsByName('number')[0].style.color = 'red';
		}
	}
	valideMontant(loginForm)
	{
		if(loginForm.controls['montant'].value%50!=0) 
		{
			document.getElementsByName('montant')[0].style.fontWeight = 'bold';
			document.getElementsByName('montant')[0].style.color = 'red';
		}
	}
	checkFocus(loginForm,champ)
	{
		document.getElementsByName(champ)[0].style.fontWeight = '';
		document.getElementsByName(champ)[0].style.color = '';
	}
	
	isOperator(number,client)
	{
		if(this.format=='') return true;
		let exp = new RegExp('^'+this.format+'$');
		var matches = number.match(exp);
		if(matches!=null) return true;
		
		return false;
	}
	async alerter(message) {
    const alert = await this.alertController.create({
      header: this.Globale.Translate.msgalert,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
  async presentLoading(loading) {
    return await loading.present();
  }

}
