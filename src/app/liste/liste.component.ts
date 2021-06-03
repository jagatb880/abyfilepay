import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import { ActivatedRoute,Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl,FormsModule  } from '@angular/forms';
import {NgForm} from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { LoadingController, AlertController} from '@ionic/angular';
import { NavController,NavParams} from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import * as Constants from '../../global';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss'],
})
export class ListeComponent implements OnInit { Globale;
	
	
	infos:any;
	nom:any;
	logo:any;
	val:any;
	items:any;
	all_items:any;
	isItemAvailable: boolean = true;
	constructor
	(
		public alertController: AlertController,
		private navCtrl: NavController,
		private http: HttpClient,
private translate: TranslateService,
		private router: Router,
		public navParams:NavParams,
		private popoverController: PopoverController,
		public loadingController: LoadingController
	){}
	ngOnInit() 
	{
		this.infos = this.navParams.get('infos');
		this.all_items = this.infos['infos'];
		this.items = this.all_items; 
	}
	async close(code) {
		let retour = {code:"",logo:"",nom:""};
		for(var i in this.infos['infos'])
		{
			if(this.infos['infos'][i].code==code)
			{
				 retour.code = this.infos['infos'][i].code; //= {code:,logo:this.infos['infos'][i].logo,nom:this.infos['infos'][i].nom};
				 retour.logo = this.infos['infos'][i].logo;
				 retour.nom = this.infos['infos'][i].nom;
				break;
			}
		}
	await this.popoverController.dismiss(retour);
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
		return (item.nom.toLowerCase().indexOf(val.toLowerCase()) > -1);
		})
		}
	}
}
