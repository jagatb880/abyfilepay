import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ReloadRecapPage } from './reload-recap.page';

const routes: Routes = [
  {
    path: '',
    component: ReloadRecapPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ReloadRecapPage]
})
export class ReloadRecapPageModule {}
