import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import { ActivatedRoute,Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { LoadingController, AlertController} from '@ionic/angular';
import { NavController } from '@ionic/angular';
import * as Constants from '../../global';
import { PopoverController } from '@ionic/angular';
import { CreditCompteComponent } from '../credit-compte/credit-compte.component';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.page.html',
  styleUrls: ['./agents.page.scss'],
})
export class AgentsPage implements OnInit { Globale;
	Factures:any;
	next:any;
	prev:any;
	last:any;
	ddate:any;
	fdate:any;
	deb:any;
	page:any;
	debut:any;
	fin:any;
	user;
	constructor
	(
		private activatedRoute: ActivatedRoute,
		public alertController: AlertController,
		private navCtrl: NavController,
		public popoverController: PopoverController,
		private http: HttpClient,
		private translate: TranslateService,
		public loadingController: LoadingController,
		private router: Router
	) 
	{ 
	this.Globale =  new Constants.Totale(this.alertController,this.http,this.translate,this.router);
	this.Globale.traduire('agents');
	}


 async ngOnInit() {

    const loading = await this.loadingController.create({
        message: this.Globale.Translate.charge,
        duration: 20000
      });
    this.page = this.activatedRoute.snapshot.paramMap.get('page');
    let debut =  this.activatedRoute.snapshot.paramMap.get('debut');
	let fin = this.activatedRoute.snapshot.paramMap.get('fin');
    let tocken = this.Globale.Session.tocken;
    let url = Constants.API_URL+'&tken='+tocken+'&_ajx=agents&pge='+this.page+'&debut='+debut+'&fin='+fin;
	this.user = {user:this.Globale.Session.idsession};
    let result = this.http.get(url);
    this.presentLoading(loading);
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
            //this.router.navigate(["/ftransfert",{trans: data['transactionid']}]);
            this.Factures = Array();
            this.next = data['next'];
			this.prev = data['prev'];
			this.page = data['page'];
			this.last = data['last'];
			this.deb = data['deb'];
			this.ddate = data['ddate'];
			this.fdate = data['fdate'];
            for(var i in data['liste'])
            {
              this.Factures.push(data['liste'][i]);
            }
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
  async presentPopover(id,name) {
    const popover = await this.popoverController.create({
      component: CreditCompteComponent,
      componentProps: {
        "ID": id,
        "Nom": name
      },
      translucent: true
    });
    return await popover.present();
  }
  moveTo(pge)
  {
    switch(pge)
    {
      case 'deb':
        this.moveToPage('/agents',{page:1,debut:this.debut,fin:this.fin});
      break;
      case 'next':
        this.moveToPage('/agents',{page:this.next,debut:this.debut,fin:this.fin});
      break;
      case 'last':
        this.moveToPage('/agents',{page:this.last,debut:this.debut,fin:this.fin});
      break;
      case 'prev':
        this.moveToPage('/agents',{page:this.prev,debut:this.debut,fin:this.fin});
      break;
    }
  }
  actualise(searchForm: NgForm)
  {
    let d = new Date();
    let n = d.getTime();
	this.debut = searchForm.controls['ddebut'].value;
	this.fin = searchForm.controls['dfin'].value;
    this.moveToPage('/agents',{page:1,debut:this.debut,fin:this.fin,test:n});
  }
  moveToPage(page,obj={})
  {
	this.Globale.navigate(page,obj);
  }
  goToPage(page,obj='')
  {
    let user;
	if(obj!='') user = {user:obj};
	else user = {};	
	this.Globale.navigate(page,user);
  }
  goToRecharge(page,obj='',obj2='')
  {
    let user;
	if(obj!='') user = {user:obj,name:obj2};
	else user = {};	
	this.Globale.navigate(page,user);
  }
  async presentLoading(loading) {
  return await loading.present();
  }

}
