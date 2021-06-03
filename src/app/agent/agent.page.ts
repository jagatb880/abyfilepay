import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import { ActivatedRoute,Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { LoadingController, AlertController} from '@ionic/angular';
import { NavController } from '@ionic/angular';
import * as Constants from '../../global';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.page.html',
  styleUrls: ['./agent.page.scss'],
})
export class AgentPage implements OnInit { Globale;

  constructor(private activatedRoute: ActivatedRoute,public alertController: AlertController,private navCtrl: NavController,private http: HttpClient,private translate: TranslateService,public loadingController: LoadingController,private router: Router)
  {

	this.Globale =  new Constants.Totale(this.alertController,this.http,this.translate,this.router);
	this.Globale.traduire('agent');
	  }


  ngOnInit() {
  }

  async onSubmit(loginForm: NgForm)
	{
		
		const loading = await this.loadingController.create({
			  message:this.Globale.Translate.creation
			});
		
		//Création du lien Json pour créer un compte 
		let tocken = this.Globale.Session.tocken;
		let url = Constants.API_URL+'&tken='+tocken+'&_ajx=activer&code='+loginForm.controls['code'].value;

		if(loginForm.controls['code'].value=='')
		{
			this.Globale.alert(this.Globale.Translate.oblige);
			return 1;
		}
		this.presentLoading(loading);
		
		//Requête d'inscription de compte
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
			this.Globale.alert(this.Globale.Translate.cagent);
			this.router.navigate(["/agents"]);
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
	toUrl(objet)//Converti un objet en valeur url GET
	{
		//alert(objet);
	}
	
	async presentLoading(loading) {
    return await loading.present();
  }
}
