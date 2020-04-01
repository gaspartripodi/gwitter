import { Component } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";

import { ITweet } from '../../models/tweet';
import { ApiTwitterService } from '../../services/apitwitter/apitwitter.service';

import { TWEET_LIMIT_PAGE, TWEET_CALLS_LIMIT } from '../../constants/constants';

@Component({
  selector: 'app-tweet-list',
  templateUrl: './tweet-list.component.html',
  styleUrls: ['./tweet-list.component.css']
})
export class TweetListComponent {

  tweets: ITweet[] = [];
  maxId: number;
  tweetCalls: number = 0;

  constructor(private apiTwitterService: ApiTwitterService, private spinner: NgxSpinnerService) {
    // this.tweets = []; // to reset pagination (not necessary in this component)
    // this.tweetCalls = 0; // to reset pagination (not necessary in this component)
    this.getTweets();
  }

  getTweets() {
    if (this.tweetCalls == 0) {
      this.apiTwitterService.getTimelineTweets(this.tweetCalls, TWEET_LIMIT_PAGE)
        .subscribe(tweets => { // or search
          // const tweets = search.statuses in search
          this.tweets = tweets;
          this.maxId = tweets[tweets.length - 1].id;
        });
    }
    else if (this.tweetCalls < TWEET_CALLS_LIMIT) {
      this.apiTwitterService.getTimelineTweets(this.tweetCalls, TWEET_LIMIT_PAGE, this.maxId)
        .subscribe(tweets => { // or search
          // const tweets = search.statuses in search
          this.spinner.show();
          this.maxId = tweets[tweets.length - 1].id;
          tweets.shift();
          this.tweets = this.tweets.concat(tweets);
          setTimeout(() => {
            this.spinner.hide();
          }, 1000);
        });
    }
    this.tweetCalls += 1;
  }

}