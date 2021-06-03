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
  selector: 'app-facture-recap',
  templateUrl: './facture-recap.page.html',
  styleUrls: ['./facture-recap.page.scss'],
})
export class FactureRecapPage implements OnInit { Globale;

  objet:any;
  Service;
  image:any;
  password:any;
  number:any;
  data:any;
  datas:any;
  Datas:any;
  Path:any;
  montant:any;
  contrat:any;
  name:any;
  format:any;
  client:any;
  type:any;
  retour;
 constructor(private activatedRoute: ActivatedRoute,private webview: WebView,public alertController: AlertController,private navCtrl: NavController,private http: HttpClient,
private translate: TranslateService,public loadingController: LoadingController,private router: Router) 
 { 
		this.Globale =  new Constants.Totale(this.alertController,this.http,this.translate,this.router);
		this.Globale.traduire('facturerecap');
	}

  async ngOnInit() {
    this.client = this.activatedRoute.snapshot.paramMap.get('client');
	this.retour = {objet:this.client};
    this.Service = this.Globale.getService(this.client);
	this.image = this.Service.logo; 
	this.format = this.Service.format;
    this.montant = this.activatedRoute.snapshot.paramMap.get('montant');
    this.number = this.activatedRoute.snapshot.paramMap.get('number');
    this.contrat = this.activatedRoute.snapshot.paramMap.get('contrat');
    this.type = this.activatedRoute.snapshot.paramMap.get('type');

    let tocken = this.Globale.Session.tocken;
    let url = Constants.API_URL+'&tken='+tocken+'&_ajx=facture&contrat='+this.contrat+'&number='+this.number+'&client='+this.client;

    let result = this.http.get(url);
    
    const loading = await this.loadingController.create({
        message: this.Globale.Translate.recap,
        duration: 20000
      });
      this.presentLoading(loading);
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
          this.Datas = Array();
		  this.datas = this.Globale.toIonicData(data);
		  for(var i in data['datas'])
		  {
			  this.Datas.push(data['datas'][i]);
		  }
		  this.datas['warning']= parseInt(this.datas['warning']);
		  
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
    let test = confirm(this.Globale.Translate.paye);
	if(!test) return false;
    const loading = await this.loadingController.create({
        message: this.Globale.Translate.fin,
        duration: 20000
      });
      this.presentLoading(loading);
    //Création du lien Json pour créer un compte 
    let tocken = this.Globale.Session.tocken;
    let url = Constants.API_URL+'&tken='+tocken+'&_ajx=factpay&numero='+this.number+'&montant='+this.montant+'&client='+this.client+'&contrat='+this.contrat;

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
          this.Globale.getSolde();
          this.router.navigate(["/transaction-detail",{trans: data['transactionid'],module:this.objet}]);
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
  onCancel()
  {
    this.navCtrl.back();
  }
  async presentLoading(loading) {
    return await loading.present();
  }

}
