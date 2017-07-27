import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IdlePreloadModule, IdlePreload } from './idle.preload.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: '../../components/home/home.module#HomeModule',
    pathMatch: 'full'
  },
  {
    path: 'cases',
    loadChildren: '../../components/cases/cases.module#CasesModule'
  },
  {
    path: 'settings',
    loadChildren: '../../components/settings/settings.module#SettingsModule'
  },
  {
    path: '404',
    loadChildren: '../../components/notfound/notfound.module#NotFoundModule'
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [
    IdlePreloadModule.forRoot(),
    RouterModule.forRoot(
      routes,
      {
        useHash: false,
        preloadingStrategy: IdlePreload,
        initialNavigation: 'enabled'
      }
    )
  ],
  exports: [
    RouterModule
  ]
})

export class RoutingModule {}
