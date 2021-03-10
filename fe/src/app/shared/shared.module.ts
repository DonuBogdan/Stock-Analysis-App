import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FilterPipe } from './pipes/filter.pipe';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    SpinnerComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    SpinnerComponent,
    FilterPipe
  ],
})
export class SharedModule { }
