import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import { ActivatedRoute,Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { LoadingController, AlertController} from '@ionic/angular';
import { NavController } from '@ionic/angular';
import * as Constants from '../../global';
import { WebView } from '@ionic-native/ionic-webview/ngx';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.page.html',
  styleUrls: ['./transaction-detail.page.scss'],
})
export class TransactionDetailPage implements OnInit { Globale;

  service:any;
	Statut:any;
	number:any;
	data:any;
	montant:any;
	Path:any;
	image:any;
	Objet:any;
  constructor(private activatedRoute: ActivatedRoute,private webview: WebView,public alertController: AlertController,private navCtrl: NavController,private http: HttpClient,
private translate: TranslateService,public loadingController: LoadingController,private router: Router) 
{ 
	this.Globale =  new Constants.Totale(this.alertController,this.http,this.translate,this.router);
	this.Globale.traduire('transactiondetail');
}

  async ngOnInit() {
	  
	  const loading = await this.loadingController.create({
        message: this.Globale.Translate.charge,
        duration: 20000
      });
	  this.Statut = false;
	  this.presentLoading(loading);	
	  let trans = this.activatedRoute.snapshot.paramMap.get('trans');
	  //Création du lien Json pour créer un compte 
    let tocken = this.Globale.Session.tocken;
    let url = Constants.API_URL+'&tken='+tocken+'&_ajx=transact&trs='+trans;
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
			this.service = data['Trx_type'];
			let statut = data['Statut'].toLowerCase();
			if(statut=='pending') this.Statut = true;
			this.number =  data['Beneficiare'];
			this.montant = data['montant'];
			this.Objet = {objet:data['Logo']};
			if (this.Path == null || this.Path == 'null' || this.Path == 'undefined')
			{
				this.image = Constants.API_URL+'&_ajx=img&code='+data['Logo'];
			}
			else
			{
				this.image = this.webview.convertFileSrc(this.Path+data['Logo']+'.png');
			}
			this.data = data;
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
	moveToPage(page)
	{
		let d = new Date();
		let n = d.getTime();
		this.router.navigate([page,{time:n}]);
	}
	actualiser()
	{
		let d = new Date();
		let n = d.getTime();
		let trans = this.activatedRoute.snapshot.paramMap.get('trans');
		this.router.navigate(['/transaction-detail',{trans:trans,time:n}]);
	}
	async presentLoading(loading) {
	return await loading.present();
	}
}
