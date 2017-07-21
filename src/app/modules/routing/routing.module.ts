import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IdlePreloadModule, IdlePreload } from './idle.preload.module';

import { HomeComponent } from '../../components/home/home.component';
import { CasesComponent } from '../../components/cases/cases.component';
import { CaseComponent } from '../../components/cases/case/case.component';
import { SettingsComponent } from '../../components/settings/settings.component';
import { NotFoundComponent } from '../../components/notfound/notfound.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'cases',
    component: CasesComponent,
  },
  {
    path: 'cases/case/:id',
    component: CaseComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: '404',
    component: NotFoundComponent,
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
