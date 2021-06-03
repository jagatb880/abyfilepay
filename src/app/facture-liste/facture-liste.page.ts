import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import { ActivatedRoute,Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { LoadingController, AlertController} from '@ionic/angular';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { NavController } from '@ionic/angular';
import * as Constants from '../../global';

@Component({
  selector: 'app-facture-liste',
  templateUrl: './facture-liste.page.html',
  styleUrls: ['./facture-liste.page.scss'],
})
export class FactureListePage implements OnInit { Globale;

	objet:any;
	Service;
	contrat:any;
	number:any;
	client:any;
	image:any;
	Factures:any;
	Path:any;
	format:any;
	datas:any;
	password:any;
	Label;
	
	constructor
	(
		private activatedRoute: ActivatedRoute,
		public alertController: AlertController,
		private navCtrl: NavController,
		private http: HttpClient,
		private translate: TranslateService,
		private webview: WebView,
		public loadingController: LoadingController,
		private router: Router
	)
	{ 
		this.Globale =  new Constants.Totale(this.alertController,this.http,this.translate,this.router);
		this.Globale.traduire('factureliste');
	}


  async ngOnInit() {

     this.objet = this.activatedRoute.snapshot.paramMap.get('objet');
	this.Service = this.Globale.getService(this.objet);
	this.image = this.Service.logo; 
	this.format = this.Service.format;
	const loading = await this.loadingController.create({
        message: this.Globale.Translate.find,
        duration: 45000
      });
	 this.presentLoading(loading);
	this.objet = this.activatedRoute.snapshot.paramMap.get('objet');
    this.contrat = this.activatedRoute.snapshot.paramMap.get('contrat');
	this.number = this.activatedRoute.snapshot.paramMap.get('number');
   
    let trans = this.activatedRoute.snapshot.paramMap.get('trans');
    //Création du lien Json pour créer un compte 
    let tocken = this.Globale.Session.tocken;
    let url = Constants.API_URL+'&tken='+tocken+'&_ajx=facturels'+'&client='+this.objet+'&contrat='+this.contrat;
	
	switch(this.objet)
	{
		case 'eneofacture':
			this.Label = this.Globale.Translate.lcontrat;
		break;
		default: this.Label = this.Globale.Translate.labonne;
	}
    
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
         
            this.Factures = this.Globale.toIonicData(data['contrats']);
			
			
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
  async onSubmit(loginForm: NgForm)
  {
    
    const loading = await this.loadingController.create({
        message: this.Globale.Translate.detail,
        duration: 20000
      });
      this.presentLoading(loading);
    //Création du lien Json pour créer un compte 
    let numbers = Array();
	let index;
	let k = 0;
	for(var i in this.Factures)
	{
		index = this.Factures[i].number;
		
		if(loginForm.controls[index])
		{
			if(loginForm.controls[index].value)
			{
				numbers.push(index);
				k++;
			}
		}
	}
	if(k==0)
	{
		this.Globale.alert(this.Globale.Translate.vservice);
		loading.dismiss();
		return false;
	}
	let number =  numbers.join(',');
	
    let tocken = this.Globale.Session.tocken;
    let url = Constants.API_URL+'&tken='+tocken+'&_ajx=facture&contrat='+this.contrat+'&number='+number+'&client='+this.objet;
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
          this.router.navigate(["/facture-recap",{contrat: this.contrat,number: number,client: this.objet,montant: data['montant']}]);
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
  async presentLoading(loading) {
  return await loading.present();
  }
  onCancel()
  {
    this.router.navigate(["/home"]);
  }

}