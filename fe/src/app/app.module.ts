import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './shared/pipes/filter.pipe';
// import { ChartsModule } from 'ng2-charts';
import { HeaderComponent } from './core/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { SpinnerInterceptor } from './core/interceptors/spinner-interceptor'; 
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    HeaderComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    // ChartsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    OverlayModule,
    MatButtonModule,
    MatIconModule,
    NgxPaginationModule,
    NgxChartsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
