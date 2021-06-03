import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import { ActivatedRoute,Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { LoadingController, AlertController} from '@ionic/angular';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { NavController } from '@ionic/angular';
import * as Constants from '../../global';

import { PopoverController } from '@ionic/angular';
import { ListeComponent } from '../liste/liste.component';

@Component({
  selector: 'app-reload-client',
  templateUrl: './reload-client.page.html',
  styleUrls: ['./reload-client.page.scss'],
})
export class ReloadClientPage implements OnInit 
{
	Globale;
	test:any;
	Operas:any;
	Operateurs:any;
	isnumber:any;
	isRange:any;
	isFixed:any;
	password:any;
	Path:any;
	datas:any;
	image:any;
	format:any;
	objet:any;
	data:any;
	opera:any;
	odata:any;
	client:any;
	Forfaits:any;
	Pays:any;
	pays:any;
  constructor (
	private activatedRoute: ActivatedRoute,
	private webview: WebView,
	private navCtrl: NavController,
	private http: HttpClient,
private translate: TranslateService,
	public alertController: AlertController,
	public loadingController: LoadingController,
	public popoverController: PopoverController,
	private router: Router
	) 
	{
		this.Globale =  new Constants.Totale(this.alertController,this.http,this.translate,this.router); 
		this.Globale.traduire('reload'); 
	}

	async ngOnInit() 
	{
		this.isRange
		this.isFixed = 
		this.isnumber = false;
		this.datas = JSON.parse(localStorage.getItem('PossaSessionData'));
		this.Path = localStorage.getItem('PossaPath');
		this.objet ='abyfounat';
		this.test = "Merlino";
		this.pays = {code:"CM",logo:"https://s3.amazonaws.com/rld-flags/cm.svg",nom:"Cameroon (+237)"};
		this.opera = {code:"",logo:"",nom:""};
		this.datas = JSON.parse(localStorage.getItem('ABySessionData'));
		this.Path = localStorage.getItem('AbyPath');
		//identification du service
		let service = this.Globale.getService(this.objet);
		this.image = service.logo; 
		this.format = service.format;	
		this.data = {Flag:this.activatedRoute.snapshot.paramMap.get('flag'),Nom:this.activatedRoute.snapshot.paramMap.get('nom'),Indicatif:this.activatedRoute.snapshot.paramMap.get('indic')};
		
		const loading = await this.loadingController.create(
		{
			message: this.Globale.Translate.charge,
			duration: 22000
		});
		this.presentLoading(loading);
		let url = Constants.API_URL+'&_ajx=country&numero=';
		let result = this.http.get(url);
		result.subscribe (data => //En cas de succès de la requête
		{
			let infos = Array();
			for(var i in data)
			{
				infos.push({code:data[i].Code,logo:data[i].Flag,nom:data[i].Nom+' ('+data[i].Indicatif+')'})
			}
			this.Pays = {titre:"Liste des pays",infos:infos};
			JSON.stringify(this.Pays);
			loading.dismiss();
		},
		(err) => //En cas d'erreur
		{
		this.Globale.alertHTTP(err);
		loading.dismiss();
		}
		);
		this.getOperateur(this.pays.code);
		
	}
  async getOperateur(value)
  {
	 const loading = await this.loadingController.create({
        message: 'Chargement des operateurs ...',
        duration: 15000
      });
      this.presentLoading(loading);
	  let url = Constants.API_URL+'&_ajx=operator&pays='+value;
	let result = this.http.get(url);
    result.subscribe (data => //En cas de succès de la requête
    {
	  this.Operas = data;
	  let infos = Array();
	  this.opera = {code:data[0].ID,logo:data[0].Logo,nom:data[0].Nom};
	  for(var i in data)
	  {
		  infos.push({code:data[i].ID,logo:data[i].Logo,nom:data[i].Nom})
	  }
	  this.Operateurs = {titre:"Liste des opérateurs",infos:infos};
	 
	  loading.dismiss();
      },
      (err) => //En cas d'erreur
      {
		this.Globale.alertHTTP(err);
		loading.dismiss();
      }
      );
  }
  async presentPopover(infos) 
  {
	
    const popover = await this.popoverController.create({
      component: ListeComponent,
      componentProps: {
        "infos": infos
      },
      translucent: true
    });
	popover.onDidDismiss().then((dataReturned) => {
	  if (dataReturned !== null) {
		dataReturned.data.nom;
		this.pays.code = dataReturned.data.code;
		this.pays.logo = dataReturned.data.logo;
		this.pays.nom = dataReturned.data.nom;
		this.getOperateur(this.pays.code);
		
	  }
	});
	return await popover.present();
}

async presentOperator(infos) {
	
    const popover = await this.popoverController.create({
      component: ListeComponent,
      componentProps: {
        "infos": infos
      },
      translucent: true
    });
	popover.onDidDismiss().then((dataReturned) => {
  if (dataReturned !== null) {
    dataReturned.data.nom;
	this.opera.code = dataReturned.data.code;
	this.opera.logo = dataReturned.data.logo;
	this.opera.nom = dataReturned.data.nom;    
  }
});
    return await popover.present();
  }
	async valideNumber(opera,numero)
	{
		const loading = await this.loadingController.create({
		message: 'Verification du numéro ...',
		duration: 15000
		});
		this.presentLoading(loading);
		let url = Constants.API_URL+'&_ajx=vnumber&opera='+opera+'&number='+numero;
		let result = this.http.get(url);
		result.subscribe (data => //En cas de succès de la requête
		{
		if(data['error']==1)
		{
		this.isnumber = false;
		alert(data['message']);
		loading.dismiss();
		}
		else 
		{
		let forfaits = Array();
		this.isnumber = true;
		if(data['fixe']==0)
		{
		this.isRange = 0;
		this.isFixed = 1;
		}
		else
		{
		this.isRange = 1;
		this.isFixed = 0;
		for( var i in data['forfaits'])
		{
		forfaits.push(data['forfaits'][i]);
		}	
		}
		this.Forfaits = forfaits;
		this.odata = data;
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
  onSubmit(verifForm: NgForm)
  {
		if(this.isnumber) this.moveToPage('/reload-recap',{opera: verifForm.controls['opera'].value,pays: this.odata.id,montant: verifForm.controls['montant'].value,number:verifForm.controls['number'].value});
		else this.Globale.alert(this.Globale.Translate.vnumber);
	
  }
  moveToPage(page,obj)
	{
		this.router.navigate([page, obj]);
	}
  
  async presentLoading(loading) {
    return await loading.present();
  }

}
