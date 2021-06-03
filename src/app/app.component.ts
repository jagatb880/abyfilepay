import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Device } from '@ionic-native/device/ngx';
import { LoadingController, AlertController} from '@ionic/angular';
import * as Constants from '../global';//
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Uid } from '@ionic-native/uid/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
window['JSON_PATH'] = "";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

@Injectable()
export class AppComponent {
  
  Globale:any;
  infoListe: boolean = true;
  infoCompte: boolean = true;
  Connected:boolean = false;
  public appAdmin: any[];
  public appPerso : any[];
  public appAbout : any[];

  private url:any;
  Phone:any;
  IDUser:any;
  Profil:any;
  Device:any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private device: Device,
	private translate: TranslateService,
    private router: Router,
	private location: Location,
    private http: HttpClient,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private storage: NativeStorage,
	private uid: Uid, 
	private androidPermissions: AndroidPermissions,
    private navCtrl: NavController,
    private statusBar: StatusBar
  ) 
  {    
	this.initializeApp();
	this.Globale =  new Constants.Totale(this.alertController,this.http,this.translate,this.router);
	this.Globale.traduire('home');
	
	this.platform.backButton.subscribeWithPriority(9999, () => {
        let url =this.router.url;
		let trees = url.split(';');
		let current = trees[0];
		if (current == '/home') 
		{
			let val = confirm(this.Globale.Translate.disconnect);	
			if(val)
			{
				this.Globale.logout();
				this.Globale.navigate('/login');
			}
		} 
		else if (current == '/login') 
		{
			navigator['app'].exitApp();
		} 
		else if(this.Globale.Session == null || JSON.stringify(this.Globale.Session) == "{}")
		{
			if (current == '/localise') this.Globale.navigate('/suscribe');
			else if (current == '/suscribe') this.Globale.navigate('/login');
			else if (current == '/identifie') this.Globale.navigate('/suscribe');
			else this.Globale.navigate('/home');
		}
		else if (current == '/transaction-detail') 
		{
			this.Globale.navigate('/home');
		}
		else this.Globale.navigate('/home');
		
	});
	this.initTranslate();
  }
  
  initializeApp() 
  {
    this.platform.ready().then(() => 
	{
        if(this.device['uuid']==null || this.device==null)
		{
			this.simulDevice();
		}
		else
		{
			this.realDevice();
		}
		
		//because we don't want to ask users to log in each time they open the app
		let d = new Date();
		let Now = d.getTime();

		if(this.Globale.Session == null || JSON.stringify(this.Globale.Session) == "{}")
		{

			this.router.navigate(["/login", {time:Now}]);
		}
		else
		{
			this.router.navigate(["/home", {time:Now}]);
		}
		
		this.statusBar.styleDefault();
		this.splashScreen.hide();
    });
  }
	stop()
	{
	  
	}
	simulDevice()
	{

		let Device ={
			model:'Browser',
			cordova:'0.0',
			platform:'Browser',
			uuid:'123456987654321-456789',
			manufacturer:'Virtual',
			version:'0.0',
			serial:'123456789456321',
			imei:''
		};
		this.Globale.setDevice(Device);
		this.Globale.updateImei("VIRT-IMEI-1100111100");
	}
	realDevice()
	{
		let Device ={
			model:this.device['model'],
			cordova:this.device['cordova'],
			platform:this.device['platform'],
			uuid:this.device['uuid'],
			manufacturer:this.device['manufacturer'],
			version:this.device['version'],
			serial:this.device['serial'],
			imei:this.device['serial']
		};	
		this.Globale.setDevice(Device);
		this.getImei();
	}
	async getImei() 
	{
		const { hasPermission } = await this.androidPermissions.checkPermission(
		this.androidPermissions.PERMISSION.READ_PHONE_STATE
		);

		if (!hasPermission) {
		const result = await this.androidPermissions.requestPermission(
		this.androidPermissions.PERMISSION.READ_PHONE_STATE
		);

		if (!result.hasPermission) {
		throw new Error('Permissions required');
		}

		// ok, a user gave us permission, we can get him identifiers after restart app
		return;
		}
		this.Globale.updateImei(this.uid.IMEI);
	}
  async presentLoading(loading) {
    return await loading.present();
  }
  initTranslate() {
        // Set the default language for translation strings, and the current language.
        this.translate.setDefaultLang('en');


        if (this.translate.getBrowserLang() !== undefined) {
            this.translate.use(this.translate.getBrowserLang());
        } else {
            this.translate.use('en'); // Set your language here
        }

    }
}
