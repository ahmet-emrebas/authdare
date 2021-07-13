import { NgModule } from '@angular/core';
import { ImageComponent } from './image.component';
import { ImageCarouselComponent } from './image-carousel/image-carousel.component';
import { ImageGridComponent } from './image-grid/image-grid.component';
import { ImageDeckComponent } from './image-deck/image-deck.component';

@NgModule({
  declarations: [
    ImageComponent,
    ImageCarouselComponent,
    ImageGridComponent,
    ImageDeckComponent,
  ],
  imports: [],
  exports: [
    ImageComponent,
    ImageDeckComponent,
    ImageGridComponent,
    ImageCarouselComponent,
  ],
})
export class ImageModule {}
