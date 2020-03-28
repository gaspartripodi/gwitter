import { Component, OnInit } from '@angular/core';
import { MomentModule } from 'ngx-moment';
import { faRetweet, faHeart } from '@fortawesome/free-solid-svg-icons';

import { ITweet } from '../../models/tweet';
import { ApiTwitterService } from '../../services/apitwitter/apitwitter.service';

@Component({
  selector: 'app-tweet-list',
  templateUrl: './tweet-list.component.html',
  styleUrls: ['./tweet-list.component.css']
})
export class TweetListComponent implements OnInit {

  tweets: ITweet[] = [];
  faRetweet = faRetweet;
  faHeart = faHeart;

  constructor(private apiTwitterService: ApiTwitterService) { }

  ngOnInit(): void {
    this.getTimeline();
  }

  getTimeline(): void {
    this.apiTwitterService.getTweets()
      .subscribe(tweets => this.tweets = tweets);
  }

}