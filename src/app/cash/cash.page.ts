import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import { ActivatedRoute,Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { LoadingController, AlertController} from '@ionic/angular';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import * as Constants from '../../global';

@Component({
  selector: 'app-cash',
  templateUrl: './cash.page.html',
  styleUrls: ['./cash.page.scss'],
})
export class CashPage implements OnInit { Globale;

  objet:any;
  image:any;
  password:any;
  datas:any;
  format:any;
  Path:any;
  constructor
  (
  	private activatedRoute: ActivatedRoute,
  	public loadingController: LoadingController,
	public alertController: AlertController,
  	private http: HttpClient,
private translate: TranslateService,
	private webview: WebView,
  	private router: Router
  )
   { 
   this.Globale =  new Constants.Totale(this.alertController,this.http,this.translate,this.router);
   this.Globale.traduire('cash');
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
	async onSubmit(verifForm: NgForm)
	{
		let pass = localStorage.getItem('AbyPass');
		if(!this.isOperator(verifForm.controls['number'].value,this.objet))
		{
			this.alerter(this.Globale.Translate.msgoperateur);
			return 1;
		}
		//Contrôle de la transaction
		

		//Création du lien Json pour créer un compte 
		let tocken = this.Globale.Session.tocken;
		let number = verifForm.controls['number'].value;
		let montant = verifForm.controls['montant'].value;
		let cash = verifForm.controls['radio'].value;
		
		this.router.navigate(["/cash-recap",{number: verifForm.controls['number'].value,montant: verifForm.controls['montant'].value,cash: verifForm.controls['radio'].value,objet:this.objet}]);
		//Passage à la transaction suivante

		/*
			this.moveToPage('/cdepot',{objet: this.objet,montant: verifForm.controls['montant'].value,number:verifForm.controls['number'].value,type:verifForm.controls['radio'].value});
		*/

	}
	async presentLoading(loading) 
	{
		return await loading.present();
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
	checkFocus(loginForm,champ)
	{
	document.getElementsByName(champ)[0].style.fontWeight = '';
	document.getElementsByName(champ)[0].style.color = '';
	}
	async alerter(message) 
	{
		const alert = await this.alertController.create(
		{
		  header: this.Globale.Translate.msgalert,
		  message: message,
		  buttons: ['OK']
		});

		await alert.present();
	}
}
