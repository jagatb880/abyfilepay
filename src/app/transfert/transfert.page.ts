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
  selector: 'app-transfert',
  templateUrl: './transfert.page.html',
  styleUrls: ['./transfert.page.scss'],
})
export class TransfertPage implements OnInit { Globale;

	objet:any;
	datas:any;
	image:any;
	montant:any;
	Path:any;
	format:any;
	number:any;
	password:any;
	constructor
	(
		private activatedRoute: ActivatedRoute,
		private webview: WebView,
		private router: Router,
		private http: HttpClient,
private translate: TranslateService,
		public alertController: AlertController,
		public loadingController: LoadingController
	)
	{
		this.Globale =  new Constants.Totale(this.alertController,this.http,this.translate,this.router); 
		this.Globale.traduire('transfert');
	}

	ngOnInit() 
	{
		this.objet = this.activatedRoute.snapshot.paramMap.get('objet');
		this.datas = JSON.parse(localStorage.getItem('ABySessionData'));
		this.Path = localStorage.getItem('AbyPath');
		//identification du service
		let service = this.Globale.getService(this.objet);
		this.image = service.logo; 
		this.format = service.format;
		
		let pass = localStorage.getItem('AbyPass');
		if(pass=="1")
		{
			this.password = "**************************";
		}
		else this.password = 0;
	}
	onSubmit(verifForm: NgForm)
	{
		let pass = localStorage.getItem('AbyPass');
		if(!this.isOperator(verifForm.controls['number'].value,this.objet))
		{
			this.alerter(this.Globale.Translate.msgvnumber);
		}
		else
		{
			this.moveToPage('/transfert-recap',{objet: this.objet,montant: verifForm.controls['montant'].value,number:verifForm.controls['number'].value});
		}

	}
	onCancel()
	{
		this.router.navigate(["/home"]);
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
		number = this.replaceAll(number,'/+','');//number.replace('+','');
		number = this.replaceAll(number,' ','');
		if(number[0]=='+') number = number.substring(1);
		if(number[0]=='0') number = number.substring(1);
		var deb = number.substring(0,3);
		if(deb!=237 && (number[0]=='6'  || number[0]=='2' || number[0]=='3') && number.length==9)
		{
		  number = '237'+number;
		}
		else return false;
		
		let exp = new RegExp('^'+this.format+'$');
		var matches = number.match(exp);
		if(matches!=null) return true;
		
		return false;
	}
	async alerter(message) {
    const alert = await this.alertController.create({
      header: "Message d'alerte",
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

}
