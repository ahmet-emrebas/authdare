import { NgModule } from '@angular/core';
import { UtilsComponent } from './utils.component';
import { AssetPipe } from './asset.pipe';



@NgModule({
  declarations: [
    UtilsComponent,
    AssetPipe
  ],
  imports: [
  ],
  exports: [
    UtilsComponent,
    AssetPipe
  ]
})
export class UtilsModule { }
