import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import { ActivatedRoute,Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { LoadingController, AlertController} from '@ionic/angular';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import * as Constants from '../../global';

@Component({
  selector: 'app-cash-recap',
  templateUrl: './cash-recap.page.html',
  styleUrls: ['./cash-recap.page.scss'],
})
export class CashRecapPage implements OnInit { Globale;

  objet:any;
  image:any;
  password:any;
  datas:any;
  data:any;
  format:any;
  total:any;
  montant:any;
  frais:any;
  number:any;
  cash:any;
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
	   this.Globale.traduire('cashrecap');
   }

	ngOnInit() 
	{
		this.objet = this.activatedRoute.snapshot.paramMap.get('objet');
		this.number = this.activatedRoute.snapshot.paramMap.get('number');
		this.montant = parseInt(this.activatedRoute.snapshot.paramMap.get('montant'));
		this.frais = 0;
		this.total = this.montant + this.frais;
		this.cash = this.activatedRoute.snapshot.paramMap.get('cash');
		
		this.data = new Object();
		this.data.number = this.number;
		this.data.montant = this.montant;
		this.data.frais = this.frais;
		this.data.total = this.montant + this.frais;
		
		switch(this.cash)
		{
			case 'in':
			case 'IN':
				this.cash = this.Globale.Translate.ldepot;
			break;
			case 'OUT':
			case 'out':
				this.cash = this.Globale.Translate.lretrait;
			break;
		}
		this.data.service = this.cash;
		
		this.datas = JSON.parse(localStorage.getItem('ABySessionData'));
		this.Path = localStorage.getItem('AbyPath');
		//identification du service
		let service = this.Globale.getService(this.objet);
		this.image = service.logo; 
		this.format = service.format;	
		
	}
	async onSubmit(verifForm: NgForm)
	{
		let test = confirm(this.Globale.Translate.termine);
		if(!test) return false;
		//Contrôle de la transaction
		const loading = await this.loadingController.create({
				  message: this.Globale.Translate.operation,
				  duration: 45000
				});
			this.presentLoading(loading);

		//Création du lien Json pour créer un compte 
		let tocken = this.Globale.Session.tocken;
		let number = this.activatedRoute.snapshot.paramMap.get('number');
		let montant = this.activatedRoute.snapshot.paramMap.get('montant');
		let cash = this.activatedRoute.snapshot.paramMap.get('cash');
		let url = Constants.API_URL+'&tken='+tocken+'&_ajx=argent&numero='+number+'&montant='+montant+'&opera='+this.objet+'&cash='+cash;

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
			  localStorage.setItem('ABySolde',data['aftersolde']);
			  this.router.navigate(["transaction-detail",{trans: data['transactionid']}]);
			  loading.dismiss();
			}
		  },
		  (err) => //En cas d'erreur
		  {
		   this.alerter(this.Globale.Translate.echec);
		  loading.dismiss();
		  }
		  );

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
	
	checkFocus(loginForm,champ)
	{
		document.getElementsByName(champ)[0].style.fontWeight = '';
		document.getElementsByName(champ)[0].style.color = '';
	}
	async alerter(message) 
	{
		const alert = await this.alertController.create(
		{
		  header: this.Globale.Translate.charge,
		  message: message,
		  buttons: ['OK']
		});

		await alert.present();
	}
}
