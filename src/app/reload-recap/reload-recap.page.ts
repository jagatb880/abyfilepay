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
  selector: 'app-reload-recap',
  templateUrl: './reload-recap.page.html',
  styleUrls: ['./reload-recap.page.scss'],
})
export class ReloadRecapPage implements OnInit { Globale;

  Pays:any;
  Operas:any;
  isnumber:any;
  opera:any;
  montant:any;
  number:any;
  frais:any;
  total:any;
  Path:any;
  datas:any;
  image:any;
  format:any;
  objet:any;
  data:any;
  password:any;
  constructor (
	private activatedRoute: ActivatedRoute,
	public alertController: AlertController,
	private webview: WebView,
	private navCtrl: NavController,
	private http: HttpClient,
private translate: TranslateService,
	public loadingController: LoadingController,
	private router: Router
	) {
		this.Globale =  new Constants.Totale(this.alertController,this.http,this.translate,this.router);
		this.Globale.traduire('reloadrecap');
		}

	async ngOnInit() 
	{
		const loading = await this.loadingController.create(
		{
			message: this.Globale.Translate.charge,
			duration: 22000
		});
		this.presentLoading(loading);
		let tocken = this.Globale.Session.tocken;
		let url = Constants.API_URL+'&tken='+tocken+'&_ajx=reload&numero='+this.activatedRoute.snapshot.paramMap.get('number')+'&montant='+this.activatedRoute.snapshot.paramMap.get('montant')+'&opera='+this.activatedRoute.snapshot.paramMap.get('opera')+'';
		let result = this.http.get(url);
		result.subscribe (data => //En cas de succès de la requête
		{
			this.data = data;
			this.montant = data['montant'];
			this.number = data['number'];
			this.opera = data['opera'];
			this.frais = data['frais'];
			this.total = data['total'];
			loading.dismiss();
		},
		(err) => //En cas d'erreur
		{
			this.Globale.alertHTTP(err);
			loading.dismiss();
		}
		);
		this.datas = JSON.parse(localStorage.getItem('ABySessionData'));
		this.Path = localStorage.getItem('AbyPath');4
		this.objet ='abyfounat';
		//identification du service
		let service = this.Globale.getService(this.objet);
		this.image = service.logo; 
		this.format = service.format;	
		
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
    let url = Constants.API_URL+'&tken='+tocken+'&_ajx=transfert&numero='+this.number+'&montant='+this.montant+'&opera=abyfounat&type='+this.activatedRoute.snapshot.paramMap.get('opera');

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
  moveToPage(page,obj)
	{
		this.router.navigate([page, obj]);
	}
  
  async presentLoading(loading) {
    return await loading.present();
  }

}
