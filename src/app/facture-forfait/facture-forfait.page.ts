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
  selector: 'app-facture-forfait',
  templateUrl: './facture-forfait.page.html',
  styleUrls: ['./facture-forfait.page.scss'],
})
export class FactureForfaitPage implements OnInit { Globale;

	isItemAvailable: boolean = true;
	items:any;
	Items:any;
	LItems:any;
	AllItems;
	image:any;
	datas:any;
	Path:any;
	objet:any;
	contrat:any;
	format:any;
	client:any;
	constructor
	(
		private router: Router,
		private http: HttpClient,
private translate: TranslateService,
		private activatedRoute: ActivatedRoute,
		public loadingController: LoadingController,
		public alertController: AlertController,
		private device: Device,
		private webview: WebView
	) 
	{
		this.items = ["Recherche ..."]; 
		this.Globale =  new Constants.Totale(this.alertController,this.http,this.translate,this.router);
		this.Globale.traduire('factureforfait');
	}

	async ngOnInit() 
	{
		this.objet = this.activatedRoute.snapshot.paramMap.get('objet');
		this.contrat = "123456";
		this.client = this.activatedRoute.snapshot.paramMap.get('objet');
		this.datas = JSON.parse(localStorage.getItem('ABySessionData'));
		this.Path = localStorage.getItem('AbyPath');
		
		//identification du service
		let service = this.Globale.getService(this.objet);
		this.image = service.logo; 
		this.format = service.format;	
			
		this.isItemAvailable = true;
		const loading = await this.loadingController.create({
			  message: this.Globale.Translate.charge
			});
		this.presentLoading(loading);
		let tocken = this.Globale.Session.tocken;
		let url = Constants.API_URL+'&tken='+tocken+'&_ajx=facturels&client='+this.activatedRoute.snapshot.paramMap.get('objet')+'&contrat=123456';
		
		
		//Requête d'inscription de compte
		let result = this.http.get(url);

		result.subscribe 
		(
			data => //En cas de succès de la requête
			{
				if(data['error']==1)
				{
					this.Globale.alert(data['message']);
					loading.dismiss();
				}
				else if(data['error']==0)
				{
					let contrats = Array();
					let tcontrats = Array();
					for(var i in data['contrats'])
					{
						contrats.push(data['contrats'][i]);
						tcontrats.push(data['contrats'][i].date);
					}
					this.AllItems = contrats;
					this.Items = contrats;
					this.LItems = tcontrats;
					this.initializeItems();
					loading.dismiss();
				}
			},
			(err) => //En cas d'erreur
			{
			  this.Globale.alert(this.Globale.Translate.noconnect); 
			  loading.dismiss();
			  
			}
		);
	}
	initializeItems()
	{
		this.Items = this.AllItems; 
	}
	async presentLoading(loading) {
		return await loading.present();
	}
	getItems(ev: any) 
	{
		// Reset items back to all of the items
		this.initializeItems();

		// set val to the value of the searchbar
		const val = ev.target.value;

		// if the value is an empty string don't filter the items
		if (val && val.trim() != '') {
		this.isItemAvailable = true;
		this.Items = this.Items.filter((item) => {
		return (item.date.toLowerCase().indexOf(val.toLowerCase()) > -1);
		})
		}
	}
	
	moveToPage(page,obj,abonne)
	{
		let montant;
		if(abonne=='')
		{
			this.Globale.alert(this.Globale.Translate.oblige);
			return 1;
		}
		let number = abonne;
		let exp = new RegExp('^'+this.format+'$');
		var matches = number.match(exp);
		if(matches==null) 
		{
			alert('Format abonné incorrect');
			return false;
		}
		for(var i in this.Items)
		{
			if(this.Items[i].number==obj)
			{
				montant = this.Items[i].montant;
			}
		}
		let d = new Date();
		let n = d.getTime();
		this.router.navigate(["/facture-recap",{contrat: abonne,number: obj,client: this.objet,montant: montant}]);
	}
}
