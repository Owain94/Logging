import { NgModule } from '@angular/core';

import { NewlinePipe } from './newline.pipe';

@NgModule({
  declarations: [
    NewlinePipe
  ],
  exports: [
    NewlinePipe
  ]
})
export class NewlinePipeModule {}
