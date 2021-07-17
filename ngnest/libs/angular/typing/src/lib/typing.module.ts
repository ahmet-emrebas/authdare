import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TypingComponent } from './typing.component';
import { MatButtonModule } from '@angular/material/button';
import { TableModule } from '@authdare/table';
import { ChartModule } from '@authdare/chart';
@NgModule({
  declarations: [TypingComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    TableModule,
    ChartModule,
  ],
  exports: [TypingComponent],
})
export class TypingModule {}
