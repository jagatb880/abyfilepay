import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ForfaitListePage } from './forfait-liste.page';

const routes: Routes = [
  {
    path: '',
    component: ForfaitListePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ForfaitListePage]
})
export class ForfaitListePageModule {}
