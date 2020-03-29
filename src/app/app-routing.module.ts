import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TweetListComponent } from './components/tweet-list/tweet-list.component';
//import { TweetDetailComponent } from './components/tweet-detail/tweet-detail.component';
import { SearchComponent } from './components/search/search.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';

import { ROOT, TWEET_DETAIL, SEARCH, CONFIGURATION } from './constants/routes';

const routes: Routes = [
  { path: ROOT, component: TweetListComponent },
  { path: TWEET_DETAIL, component: TweetListComponent }, //Change TweetListComponent to TweetDetailComponent
  { path: SEARCH, component: SearchComponent },
  { path: CONFIGURATION, component: ConfigurationComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}