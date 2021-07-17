import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TypingComponent } from './typing.component';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [TypingComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [TypingComponent],
})
export class TypingModule {}
