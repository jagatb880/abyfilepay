import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {NgForm} from '@angular/forms';
import { Platform,NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Device } from '@ionic-native/device/ngx';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Router,NavigationEnd } from '@angular/router';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { LoadingController, AlertController} from '@ionic/angular';
import * as Constants from '../../global';
import { HostListener } from '@angular/core';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage 
{
	Globale:any;
	Session;
	/*******************************
	
	*********************************/
	mySpace: boolean = false;
	openSpace: boolean = false;
	inSpace: boolean = false; 
	inAdmin: boolean = false; 
	inPerso: boolean = false; 
	inContact: boolean = false; 
	Phone:any;
	DeviceUrl:any;
	Login:any;
	GSolde:any;
	GComm:any;
	Password:any;
	inTop: boolean = true;
	Save:any;
	Connected:boolean = false;
	Beta:boolean = false;
	infoListe: boolean = true;
	infoCompte: boolean = true;
	public appAdmin: any[];
	public Global: any;
	public Services: any;
	public Menu: any[];
	public appPerso : any[];
	public appContact : any[];
	public  uid:any;
	private url:any;
	IDUser:any;
	Profil:any;
	Path:any;
	Solde:any;
	IsUser: boolean = true;
	Now:any;
	Comm:any;
	constructor
	(
		private platform: Platform,
		private splashScreen: SplashScreen,
		private router: Router,
		private http: HttpClient,
		private translate: TranslateService,
		private device: Device,
		public loadingController: LoadingController,
		private storage: NativeStorage,
		private webview: WebView,
		public alertController: AlertController,
		public navCtrl:NavController,
		private statusBar: StatusBar
	) 
	{
		let d = new Date();
		this.Now = d.getTime();
		this.GSolde ="...";
		this.Globale =  new Constants.Totale(this.alertController,this.http,this.translate,this.router);
		this.Session = this.Globale.Session;
		this.Globale.traduire('home');
		if(this.Globale.Session == null || JSON.stringify(this.Globale.Session) == "{}")
		{

			this.router.navigate(["/login", {time:this.Now}]);
		}
		this.Globale.getSolde();
		
	}
	
	async useCommission()
	{
		let val = confirm(this.Globale.Translate.remonte);
		if(!val) return false;
		const loading = await this.loadingController.create
		({
			message: this.Globale.translate.msgremonte,
			duration: 25000
		});
		
		this.presentLoading(loading);
		let tocken = this.Globale.Session.tocken;
		let url = Constants.API_URL+'&tken='+tocken+'&_ajx=ucommission&trs=';

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
			this.Globale.alert(data['message']);
			this.Globale.getSolde();
			this.moveToPage('/home')
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
	moveToPage(page,obj='')
	{
		this.router.navigate([page, { objet: obj,time:this.Now}]);
	}
  async presentLoading(loading) {
    return await loading.present();
  }
  toUrl()
  {

  }
  async doLogOut() {
	  sessionStorage.setItem('Previous','/hdfhdfhd');
    const alert = await this.alertController.create({
      header: this.Globale.Translate.btndisconnect,
      message: this.Globale.Translate.disconnect,
      buttons: [
        {
          text: this.Globale.Translate.btncancel,
          role: 'cancel',
          cssClass: 'secondary',handler: () => {
            sessionStorage.setItem('Previous',"/home");
          }
        }, {
          text: this.Globale.Translate.btncontinue,
          handler: () => {
            this.Globale.logout();
			this.Globale.navigate("/home");
          }
        }
      ]
    });

    await alert.present();
  }
  
  async doLogOut2()
	{
		const loading = await this.loadingController.create({
			  message: this.Globale.Translate.btndisconnect
			});
		this.presentLoading(loading);
		localStorage.removeItem('AbyConnected');
		localStorage.removeItem('AbyTocken');
		this.router.navigate(["/login"]);
		loading.dismiss();
	}
  onScroll(event) {
    // used a couple of "guards" to prevent unnecessary assignments if scrolling in a direction and the var is set already:
	 this.inTop = true;/*
    if (event.detail.deltaY > 30 ) 
    {
      this.inTop = false;
    } else if(event.detail.deltaY <= 30 ) {
      this.inTop = true;
    }*/
  }
  showError(text)
  {
    alert(text);
  }
}
