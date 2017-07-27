import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutingModule } from '../../modules/routing/routing.module';

import { MainComponent } from './main.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    MainComponent,
    MenuComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,

    RoutingModule
  ],
  exports: [
    MainComponent
  ]
})
export class MainModule {}
