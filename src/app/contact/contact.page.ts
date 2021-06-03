import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import { ActivatedRoute,Router } from '@angular/router';
import { LoadingController, AlertController} from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import * as Constants from '../../global';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit { 

	Globale;
	Error;
	constructor
	(
		public alertController: AlertController,
		private http: HttpClient,
private translate: TranslateService,
		private router: Router
	) 
	{
		this.Globale =  new Constants.Totale(this.alertController,this.http,this.translate,this.router); 
		this.Globale.traduire('contact');
		this.Error = false;
		if(this.Globale.Errors.length>0)
		{
			this.Error = true;
			
		}
	}

  ngOnInit() {
  }
  openLink()
  {
  	window.open('https://wa.me/237676888888?text=', '_system', 'location=yes'); 
  	return false;
  }
}
