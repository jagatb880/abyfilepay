import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {NgForm} from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Device } from '@ionic-native/device/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';
import { LoadingController, AlertController} from '@ionic/angular';
import * as Constants from '../../global';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.page.html',
  styleUrls: ['./credit.page.scss'],
})
export class CreditPage implements OnInit { Globale;
	data:any;
	items:any;
	all_items:any;
	isItemAvailable: boolean = true;
	constructor
	(
		private router: Router,
		private http: HttpClient,
private translate: TranslateService,
		public loadingController: LoadingController,
		public alertController: AlertController,
		private device: Device,
		private storage: NativeStorage
	) 
	{
		 
		this.Globale =  new Constants.Totale(this.alertController,this.http,this.translate,this.router);
		this.Globale.traduire('credit');
		this.items = ["Recherche ..."];
		
	}

	async ngOnInit() 
	{
		const loading = await this.loadingController.create({
			  message: this.Globale.Translate.charge
			});
		this.presentLoading(loading);
		//Création du lien Json pour créer un compte 
		let tocken = this.Globale.Session.tocken;
		let url = Constants.API_URL+'&tken='+tocken+'&_ajx=cashls';
		
		//Requête d'inscription de compte
		let result = this.http.get(url);
		result.subscribe (data => //En cas de succès de la requête
		{
		  if(data['error']==1)
	      {
	      	alert(data['message']);
			loading.dismiss();
	      }
	      else if(data['error']==0)
	      {
			let test = Array();
			for(var i in data['Services'])
			{
				data['Services'][i].Logo = Constants.API_URL+'&_ajx=img&code='+data['Services'][i].Logo;
				test.push(data['Services'][i]);
			}
			this.all_items = 
			this.items = test;
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
		this.items = this.all_items; 
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
		this.items = this.items.filter((item) => {
		return (item.Nom.toLowerCase().indexOf(val.toLowerCase()) > -1);
		})
		}
	}
	moveToPage(page,obj)
	{
		let nom= '';
		for(var i in this.all_items)
		{
			if(this.all_items[i].idservice==obj)
			{
				nom = this.all_items[i].Nom;
			}
		}
		this.router.navigate([page, { objet: obj,nom:nom}]);
	}
	async presentLoading(loading) {
		return await loading.present();
	}
}
