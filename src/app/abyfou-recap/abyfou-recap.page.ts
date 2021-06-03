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
  selector: 'app-abyfou-recap',
  templateUrl: './abyfou-recap.page.html',
  styleUrls: ['./abyfou-recap.page.scss'],
})
export class AbyfouRecapPage implements OnInit { 

	Globale;
	Service;

  objet:any;
  image:any;
  password:any;
  number:any;
  sender:any;
  montant:any;
  datas:any;
  data:any;
  format:any;
  Path:any;
  type:any;
 constructor (
	private activatedRoute: ActivatedRoute,
	public alertController: AlertController,
	private webview: WebView,
	private navCtrl: NavController,
	private http: HttpClient,
	private translate: TranslateService,
	public loadingController: LoadingController,
	private router: Router
	) 
	{ 
		this.Globale =  new Constants.Totale(this.alertController,this.http,this.translate,this.router);
		this.Globale.traduire('abyfourecap');
	}

  async ngOnInit() {
	  
    this.objet = this.activatedRoute.snapshot.paramMap.get('objet');
    this.Service = this.Globale.getService(this.objet);
	this.image = this.Service.logo; 
	this.format = this.Service.format;
    this.montant = this.activatedRoute.snapshot.paramMap.get('montant');
    this.number  = this.activatedRoute.snapshot.paramMap.get('number');
	this.sender  = this.activatedRoute.snapshot.paramMap.get('sender');
    this.type    = this.activatedRoute.snapshot.paramMap.get('type');
	
	const loading = await this.loadingController.create({
        message: this.Globale.Translate.convload+' ...',
        duration: 45000
      });
      this.presentLoading(loading);
	  let tocken = this.Globale.Session.tocken;
    let url = Constants.API_URL+'&tken='+tocken+'&_ajx=convload&sender='+this.sender+'&montant='+this.montant+'&receiver='+this.number+'&opera='+this.objet;
	
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
  async onSubmit(loginForm: NgForm)
  {
   
	let val = confirm(this.Globale.Translate.debut+"  \n "+this.Globale.Translate.de+" "+this.data.sender+ "  \n "+this.Globale.Translate.vers+" "+this.data.receiver+"");
	if(!val) return false;
    const loading = await this.loadingController.create({
        message: this.Globale.Translate.loadretrait+' ...',
        duration: 20000
      });
      this.presentLoading(loading);
    //Création du lien Json pour créer un compte 
    let tocken = this.Globale.Session.tocken;
    let url = Constants.API_URL+'&tken='+tocken+'&_ajx=convert&sender='+this.data.sender+'&recever='+this.data.receiver+'&montant='+this.data.montant+'&opera='+this.objet+'';
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
		  let d = new Date();let n = d.getTime();
		  this.Globale.getSolde();
          this.router.navigate(["/transaction-detail",{trans: data['transactionid'],module:this.objet}]);
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
  onCancel()
  {
    this.navCtrl.back();
  }
  async presentLoading(loading) {
    return await loading.present();
  }

}
