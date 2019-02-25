/**
 * @defoult Module
 * imports
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/**
 * @Add Module
 * imports
 */
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

/**
 * @Service
 * providers
 */
import { TodosService } from './todos.service';

/**
 * @Interceptor
 * imports
 */
import {InterceptorModule} from './oauth2.interceptor/oauth2.interceptor.module';



/**
 * @Components
 * declarations
 */
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    InterceptorModule
  ],
  providers: [TodosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
