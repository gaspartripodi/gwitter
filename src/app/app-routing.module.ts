import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TweetListComponent } from './components/tweet-list/tweet-list.component';
//import { TweetDetailComponent } from './components/tweet-detail/tweet-detail.component';
//import { SearchComponent } from './components/search/search.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';

const routes: Routes = [
  { path: '', component: TweetListComponent },
  { path: 'detail/:id', component: TweetListComponent }, //Change TweetListComponent to TweetDetailComponent
  { path: 'search', component: TweetListComponent }, //Change TweetListComponent to SearchComponent
  { path: 'configuration', component: ConfigurationComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}