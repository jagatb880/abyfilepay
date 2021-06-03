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
  selector: 'app-transfert-recap',
  templateUrl: './transfert-recap.page.html',
  styleUrls: ['./transfert-recap.page.scss'],
})
export class TransfertRecapPage implements OnInit { Globale;

  objet:any;
  image:any;
  password:any;
  number:any;
  montant:any;
  datas:any;
  format:any;
  Path:any;
  type:any;
  retour;
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
		this.Globale.traduire('transfertrecap');
	}

  ngOnInit() {
    this.objet = this.activatedRoute.snapshot.paramMap.get('objet');
    this.datas = JSON.parse(localStorage.getItem('ABySessionData'));
	this.Path = localStorage.getItem('AbyPath');
	this.retour = {objet:this.objet};
	//identification du service
	let service = this.Globale.getService(this.objet);
	this.image = service.logo; 
	this.format = service.format;	
    this.montant = this.activatedRoute.snapshot.paramMap.get('montant');
    this.number = this.activatedRoute.snapshot.paramMap.get('number');
    this.type = this.activatedRoute.snapshot.paramMap.get('type');
  }
  async onSubmit(loginForm: NgForm)
  {
    
    const loading = await this.loadingController.create({
        message: this.Globale.Translate.loadtransfert,
        duration: 20000
      });
      this.presentLoading(loading);
    //Création du lien Json pour créer un compte 
    let tocken = this.Globale.Session.tocken;
    let url = Constants.API_URL+'&tken='+tocken+'&_ajx=transfert&numero='+this.number+'&montant='+this.montant+'&opera='+this.objet+'&type='+this.type;

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
