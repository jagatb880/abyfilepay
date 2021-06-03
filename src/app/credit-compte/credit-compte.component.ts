import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import { ActivatedRoute,Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl,FormsModule  } from '@angular/forms';
import {NgForm} from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { LoadingController, AlertController} from '@ionic/angular';
import { NavController,NavParams } from '@ionic/angular';
import * as Constants from '../../global';

@Component({
  selector: 'app-credit-compte',
  templateUrl: './credit-compte.component.html',
  styleUrls: ['./credit-compte.component.scss'],
})
export class CreditCompteComponent implements OnInit { Globale;

	ID:any;
	Nom:any;
	constructor
	(
		public alertController: AlertController,
		private navCtrl: NavController,
		private http: HttpClient,
		private translate: TranslateService,
		private router: Router,
		public navParams:NavParams,
		public loadingController: LoadingController
	){
		this.Globale =  new Constants.Totale(this.alertController,this.http,this.translate,this.router);
		this.Globale.traduire('creditcompte');
		}

	ngOnInit() {
		this.ID = this.navParams.get('ID');
		this.Nom = this.navParams.get('Nom');
	}
	
	async rechargerAgent(myForm:NgForm) 
	{
		const loading = await this.loadingController.create({
		message: this.Globale.Translate.charge,
		duration: 5000
		});
		this.presentLoading(loading);
		let montant = myForm.controls['montant'].value;
		let tocken = this.Globale.Session.tocken;
		let val = confirm(this.Globale.Translate.recharge+" "+this.ID);
		if(!val)
		{
			loading.dismiss();
			return false;
		}	
		montant = parseFloat(montant);
		if(montant<=0) return false;
		return false;
		let url = Constants.API_URL+'&tken='+tocken+'&_ajx=agentload&ID='+this.ID+'&montant='+montant;
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
			this.Globale.alert(this.Globale.Translate.success);
			this.Globale.getSolde();
			this.router.navigate(["/transaction-detail",{trans: data['transactionid'],module:'reload'}]);
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
	async presentLoading(loading) 
	{
		return await loading.present();
	}

}
