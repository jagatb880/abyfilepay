import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { LoadingController, AlertController} from '@ionic/angular';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import * as Constants from '../../global';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit { Globale;

  constructor
  (
	private http: HttpClient,
private translate: TranslateService,
	public alertController: AlertController,
	private router: Router,
	public loadingController: LoadingController
  ) 
  {
	  this.Globale =  new Constants.Totale(this.alertController,this.http,this.translate,this.router);
	  this.Globale.traduire('password');
	}

  ngOnInit() {
  }
  async onSubmit(searchForm: NgForm)
  {
		const loading = await this.loadingController.create({
        message: this.Globale.Translate.msgupdate,
        duration: 15000
      });
	  
	  
      this.presentLoading(loading);
		let tocken = this.Globale.Session.tocken;
		let lpass = searchForm.controls['lpass'].value;
		let cpass = searchForm.controls['cpass'].value;
		let npass = searchForm.controls['npass'].value;
		var UrlDatas = Array();
		UrlDatas.push('lpass='+lpass);
		UrlDatas.push('npass='+npass);
		UrlDatas.push('cpass='+cpass);
		
		let data = UrlDatas.join('&');
		data = this.Globale.CryptoJSAesEncrypt(Constants.PASS_PHRASE,data);
		data = encodeURIComponent(data);
		
		let url = Constants.API_URL+'&tken='+tocken+'&_ajx=upassword&securedata='+ data;
		
		let result = this.http.get(url);		
		result.subscribe (data => //En cas de succès de la requête
		{
		alert(data['message']);
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
