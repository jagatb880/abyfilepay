import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import { ActivatedRoute,Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { LoadingController, AlertController} from '@ionic/angular';
import { NavController } from '@ionic/angular';
import * as Constants from '../../global';
@Component({
  selector: 'app-credit-recap',
  templateUrl: './credit-recap.page.html',
  styleUrls: ['./credit-recap.page.scss'],
})
export class CreditRecapPage implements OnInit { Globale;
	service:any;
	number:any;
	montant:any;
	infos:any;
	Logo:any;
	constructor
	(
		private activatedRoute: ActivatedRoute,
		public alertController: AlertController,
		private navCtrl: NavController,
		private http: HttpClient,
private translate: TranslateService,
		public loadingController: LoadingController,
		private router: Router
	) {
		this.Globale =  new Constants.Totale(this.alertController,this.http,this.translate,this.router);
		this.Globale.traduire('creditrecap');
		}

	ngOnInit() {
	  this.infos = {service:'',number:'',montant:''};
	  this.service = this.activatedRoute.snapshot.paramMap.get('service');
	  this.number = this.activatedRoute.snapshot.paramMap.get('number');
	  this.montant = this.activatedRoute.snapshot.paramMap.get('montant');
	  this.infos.service = this.activatedRoute.snapshot.paramMap.get('nom');
	  this.infos.number =this.activatedRoute.snapshot.paramMap.get('number');
	  this.infos.montant = this.activatedRoute.snapshot.paramMap.get('montant');
	  this.Logo = Constants.API_URL+'&_ajx=img&code='+this.service;
	  
	}
	async onSubmit(loginForm: NgForm)
	{
		const loading = await this.loadingController.create({
        message: this.Globale.Translate.titre,
        duration: 20000
      });
      this.presentLoading(loading);
		let tocken = this.Globale.Session.tocken;
		let number = this.activatedRoute.snapshot.paramMap.get('number');
		let montant = this.activatedRoute.snapshot.paramMap.get('montant');
		let cash = this.activatedRoute.snapshot.paramMap.get('cash');
		let url = Constants.API_URL+'&tken='+tocken+'&_ajx=cashrcap&numero='+this.number+'&montant='+this.montant+'&opera='+this.service+'&cash=OUT';
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
			this.Globale.getSolde();
			  this.router.navigate(["/transaction-detail",{trans: data['transactionid'],module:this.service}]);
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
	async presentLoading(loading)
	{
		return await loading.present();
	}
  

}
