import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FactureForfaitPage } from './facture-forfait.page';

const routes: Routes = [
  {
    path: '',
    component: FactureForfaitPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FactureForfaitPage]
})
export class FactureForfaitPageModule {}
