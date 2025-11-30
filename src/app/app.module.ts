import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutModule } from './layout/layout.module';
import { NgUIModule } from './shared/ng-ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHotToastConfig } from '@ngxpert/hot-toast';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutModule,
    NgUIModule
  ],
  bootstrap: [AppComponent],
  providers: [
    provideHotToastConfig()
  ]
})
export class AppModule {
  constructor() {
    console.log('Anguler UI Module is Live....');
  }
}
