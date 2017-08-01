import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderModule } from '../main/header/header.module';

import { NotFoundComponent } from './notfound.component';

@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(
      [
        {
          path: '',
          component: NotFoundComponent,
          pathMatch: 'full'
        }
      ]
    ),

    HeaderModule
  ]
})
export class NotFoundModule {}
