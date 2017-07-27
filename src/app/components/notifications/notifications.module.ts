import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsComponent } from './notifications.component';
import { NotificationComponent } from './notification/notification.component';
import { NotificationsService } from './../../services/notifications.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NotificationComponent,
    NotificationsComponent
  ],
  providers: [
    NotificationsService
  ],
  exports: [
    NotificationsComponent
  ]
})
export class NotificationModule {}
