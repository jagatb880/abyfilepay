import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import { ActivatedRoute,Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { LoadingController, AlertController} from '@ionic/angular';
import { NavController } from '@ionic/angular';
import * as Constants from '../../global';

@Component({
  selector: 'app-mouvement',
  templateUrl: './mouvement.page.html',
  styleUrls: ['./mouvement.page.scss'],
})
export class MouvementPage implements OnInit {
	//////////////////////////////////////
	Globale;
	Resultat;
	filtre:any;
	page:any;
	IsDate: boolean = true;
	IsFiltre: boolean = true;
	////////////////////////////////////////////////////
	/*next:any;
	prev:any;
	last:any;
	deb:any;
	ddate:any;
	fdate:any;
	
	debut:any;
	
	fin:any;*/
  constructor(private activatedRoute: ActivatedRoute,public alertController: AlertController,private navCtrl: NavController,private http: HttpClient,
private translate: TranslateService,public loadingController: LoadingController,private router: Router) 
  {
		this.Globale =  new Constants.Totale(this.alertController,this.http,this.translate,this.router);
		this.Globale.traduire('mouvement');
  }


 async ngOnInit() {

    const loading = await this.loadingController.create({
        message: this.Globale.Translate.charge,
        duration: 20000
      });
    
    this.page = this.activatedRoute.snapshot.paramMap.get('page');
    let tocken = this.Globale.Session.tocken;
	let debut =  this.activatedRoute.snapshot.paramMap.get('debut');
	let fin = this.activatedRoute.snapshot.paramMap.get('fin');
	let filtre = this.activatedRoute.snapshot.paramMap.get('filtre');
	let user =  this.activatedRoute.snapshot.paramMap.get('user');
	
    let url = Constants.API_URL+'&tken='+tocken+'&_ajx=mouvement&pge='+this.page+'&debut='+debut+'&filtre='+filtre+'&fin='+fin+'&user='+user;
	

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
           this.Resultat = this.Globale.toIonicData(data);
		   this.filtre = this.Resultat.search;
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
   moveTo(pge)
  {
  	let d = new Date();
	let n = d.getTime();
	if(this.filtre=='undefined') this.filtre='';
	let user =  this.activatedRoute.snapshot.paramMap.get('user');
	let variable = {page:1,debut:this.Resultat.ddate,fin:this.Resultat.fdate,user:user,filtre:this.Resultat.search,time:n};
	switch(pge)
  	{
  		
		case 'deb':
			variable.page = 1
  			this.moveToPage('/mouvement',variable);
  		break;
  		case 'next':
			variable.page = this.Resultat.next;
  			this.moveToPage('/mouvement',variable);
  		break;
  		case 'last':
			variable.page = this.Resultat.last;
  			this.moveToPage('/mouvement',variable);
  		break;
  		case 'prev':
			variable.page = this.Resultat.prev;
  			this.moveToPage('/mouvement',variable);
  		break;
  	}
  }

  actualise(searchForm: NgForm)
	{
		let d = new Date();
		let n = d.getTime();
		this.Resultat.ddate = searchForm.controls['ddebut'].value;
		this.Resultat.fdate = searchForm.controls['dfin'].value;
		this.Resultat.search = searchForm.controls['filtre'].value;
		let user =  this.activatedRoute.snapshot.paramMap.get('user');
		this.moveToPage('/mouvement',{page:1,debut:this.Resultat.ddate,user:user,fin:this.Resultat.fdate,time:n,filtre:this.Resultat.search});
	}
  	moveToPage(page,obj)
	{
		this.router.navigate([page, obj]);
	}
  	
  async presentLoading(loading) {
  return await loading.present();
  }

}
