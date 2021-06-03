import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {NgForm} from '@angular/forms';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Device } from '@ionic-native/device/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ActivatedRoute,Router } from '@angular/router';
import { LoadingController, AlertController} from '@ionic/angular';
import * as Constants from '../../global';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-identifie',
  templateUrl: './identifie.page.html',
  styleUrls: ['./identifie.page.scss'],
})

@Injectable()
export class IdentifiePage implements OnInit {

	Error:any;
	Phone:any;
	Datas:any;
	public showPassword: boolean = false;
	public cshowPassword: boolean = false;
	DeviceUrl:any;
	formdata:any;
	Globale:any;
	Resultat:any;
	constructor(
			private router: Router,
			private platform: Platform,
			public alertController: AlertController,
			private activatedRoute: ActivatedRoute,
			private http: HttpClient,
			private translate: TranslateService,
			public loadingController: LoadingController,
			private device: Device,
			private storage: NativeStorage
	) 
	{
		this.Globale =  new Constants.Totale(this.alertController,this.http,this.translate,this.router);
		this.Globale.traduire('identifie');
	}
	ngOnInit() 
	{
		let compte = this.activatedRoute.snapshot.paramMap.get('objet');
		this.formdata = JSON.parse(sessionStorage.getItem('Suscribe'));
		//if(this.formdata.datenais=='' or this.formdata.datenais=='')
		if(this.formdata != null)
		{
			if (this.formdata.datenais == null || this.formdata.datenais == 'null' || this.formdata.datenais == 'undefined')
			{
				this.formdata.datenais = '2000-01-01';
			}
		}
		else this.formdata = {};
	}
	async onSubmit(loginForm: NgForm)
	{
		
		//Création du lien Json pour créer un compte 
		let url = Constants.API_URL+'&_ajx=ident';
		if(loginForm.controls['password'].value!= loginForm.controls['cpassword'].value)
		{
			alert(this.Globale.Translate.spassword);
			return 1;
		}

		if(loginForm.controls['password'].value=='' || loginForm.controls['number'].value==''  || loginForm.controls['nom'].value=='')
		{
			alert(this.Globale.Translate.oblige);
			return 1;
		}
		if(loginForm.controls['datenais'].value>='2002-01-01')
		{
			alert(this.Globale.Translate.an18);
			return 1;
		}
		const loading = await this.loadingController.create(
		{
			message: this.Globale.Translate.verif+' ...',
			duration: 22000
		});
		this.presentLoading(loading);
		url = Constants.API_URL+'&_ajx=islogin&login='+loginForm.controls['number'].value;

		let result = this.http.get(url);
		result.subscribe (data => //En cas de succès de la requête
		{

			if(data['error']==1)
	      {
	      	this.Globale.alert(data['message']);
			loading.dismiss();
			return false;
	      }
	      else if(data['error']==0)
	      {
			let device = this.Globale.Device;
			let dev = Array();
			for(var i in device)
			{
				dev.push(i+'='+device[i]);
			}
			
			url += '&'+dev.join('&');
			//Ajouter le login et le mot de passe
			var objet = new Object ;
			let compte = this.activatedRoute.snapshot.paramMap.get('objet');
			objet['compte'] = compte;
			for(var key in loginForm.controls)
			{
					this.formdata[key] = loginForm.controls[key].value;
			}
			let save = JSON.stringify(this.formdata);
			sessionStorage.setItem('Suscribe',save);
			this.moveToPage('/localise','');
			loading.dismiss();
	      }
			
		},
		(err) => //En cas d'erreur
		{
			this.Globale.alertHTTP(err);
			loading.dismiss();
			return false;
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
  public onPasswordToggle(): void {
    this.showPassword = !this.showPassword;
    }
    public oncPasswordToggle(): void {
    this.cshowPassword = !this.cshowPassword;
    }
    moveToPage(page,obj)
	{
		
		this.router.navigate([page, { objet: obj}]);
	}
}
