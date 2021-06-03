import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import {NgForm} from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';
import { Device } from '@ionic-native/device/ngx';
import { LoadingController, AlertController} from '@ionic/angular';
import * as Constants from '../../global';

@Component({
  selector: 'app-verifie',
  templateUrl: './verifie.page.html',
  styleUrls: ['./verifie.page.scss'],
})

export class VerifiePage implements OnInit { Globale;

	myForm: FormGroup;
	Error:any;
	Code:any;
	Data:any;
	Phone:any;
	Device:any;
	constructor(
		private router: Router,
		public loadingController: LoadingController,
		private activatedRoute: ActivatedRoute,
		private http: HttpClient,
		public alertController: AlertController,
		private translate: TranslateService,private device: Device,private storage: NativeStorage){ }
	ngOnInit() 
	{
		
		this.Globale =  new Constants.Totale(this.alertController,this.http,this.translate,this.router);
		this.Globale.traduire('verifie');
		this.loadData();
	}
	async loadData() 
	{
		const loading = await this.loadingController.create({
			  message: this.Globale.Translate.verif+' ...',
			  duration: 10000
			});

		let user = this.activatedRoute.snapshot.paramMap.get('user');
		let url = Constants.API_URL+'&_ajx=getcode'+'&user='+user;
		let result = this.http.get(url);
		this.presentLoading(loading);

		result.subscribe (data => //En cas de succès de la requête
		{
		  if(data['error']==1)
	      {
	      	loading.dismiss();
			alert(data['message']);			
	      }
	      else if(data['error']==0)
	      {
			this.Data = data;
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
	verifieSuscribe()
	{
		
		
	}
	moveToPage(page,obj)
	{
		this.router.navigate([page, obj]);
	}
	async presentLoading(loading) {
    return await loading.present();
  }
}
