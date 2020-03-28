import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TweetListComponent } from './components/tweet-list/tweet-list.component';

const routes: Routes = [
  { path: '', component: TweetListComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}