import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import { ActivatedRoute,Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { LoadingController, AlertController} from '@ionic/angular';
import * as Constants from '../../global';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.page.html',
  styleUrls: ['./facture.page.scss'],
})
export class FacturePage implements OnInit { Globale;

	objet:any;
	Service;
	valide:any;
	isEneo:any;
	image:any;
	Path:any;
	format:any;
	datas:any;
	password:any;
	Label;
	constructor
	(
		private activatedRoute: ActivatedRoute,
		public alertController: AlertController,
		private http: HttpClient,
		private translate: TranslateService,
		public loadingController: LoadingController,
		private webview: WebView,
		private router: Router
	) 
	{ 
		this.Globale =  new Constants.Totale(this.alertController,this.http,this.translate,this.router);
		this.Globale.traduire('facture');
	}

	ngOnInit() 
	{
		this.isEneo = false;
		this.objet = this.activatedRoute.snapshot.paramMap.get('objet');

		if(this.objet=='eneofacture') this.isEneo = true;
		this.Service = this.Globale.getService(this.objet);
		this.image = this.Service.logo; 
		this.format = this.Service.format;
		this.valide = {number:false,contrat:false};
		switch(this.objet)
		{
			case 'eneofacture':
				this.Label = this.Globale.Translate.lcontrat;
			break;
			default: this.Label = this.Globale.Translate.labonne;
		}
	}
	onSubmit(verifForm: NgForm)
	{
		this.valide.number = false;
		this.valide.contrat = false;
		
		if(verifForm.controls['contrat'].value=='')
		{
			this.valide.contrat = this.Globale.Translate.vcontrat;
			
		}
		if(verifForm.controls['contrat'].value!='')
		this.moveToPage('/facture-liste',{objet: this.objet,number:verifForm.controls['number'].value,contrat:verifForm.controls['contrat'].value});
	}
	moveToPage(page,obj={})
	{
		this.router.navigate([page, obj]);
	}
	onCancel()
	{
		this.router.navigate(["/home"]);
	}

}
