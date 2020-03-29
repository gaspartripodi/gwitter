import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MomentModule } from 'ngx-moment';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { TweetListComponent } from './components/tweet-list/tweet-list.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    TopBarComponent,
    TweetListComponent,
    ConfigurationComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MomentModule,
    FontAwesomeModule,
    InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
