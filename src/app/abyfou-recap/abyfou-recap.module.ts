import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AbyfouRecapPage } from './abyfou-recap.page';

const routes: Routes = [
  {
    path: '',
    component: AbyfouRecapPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AbyfouRecapPage]
})
export class AbyfouRecapPageModule {}
