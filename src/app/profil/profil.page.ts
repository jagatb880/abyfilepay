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
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit { Globale;

  Infos:any;
  constructor(
	private activatedRoute: ActivatedRoute,
	private webview: WebView,
	private navCtrl: NavController,
	private http: HttpClient,
private translate: TranslateService,
	public loadingController: LoadingController,
	public alertController: AlertController,
	private router: Router
  ) {
	  this.Globale =  new Constants.Totale(this.alertController,this.http,this.translate,this.router); 
	  this.Globale.traduire('profil');
	 }

  async ngOnInit() {
	  const loading = await this.loadingController.create(
		{
			message: this.Globale.Translate.charge,
			duration: 22000
		});
		this.presentLoading(loading);
		let tocken = this.Globale.Session.tocken;
    let url = Constants.API_URL+'&tken='+tocken+'&_ajx=profil&numero=';
    let result = this.http.get(url);

	result.subscribe (data => //En cas de succès de la requête
	{
	  this.Infos = data;
	  loading.dismiss();
	},
	(err) => //En cas d'erreur
	{
	 this.Globale.alertHTTP(err);
	  loading.dismiss();
	}
	);
		
  }
  async presentLoading(loading) {
    return await loading.present();
  }
}
