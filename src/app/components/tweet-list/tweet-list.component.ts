import { Component, OnInit, HostListener } from '@angular/core';
import { faRetweet, faHeart, faAngleUp } from '@fortawesome/free-solid-svg-icons';

import { ITweet } from '../../models/tweet';
import { ApiTwitterService } from '../../services/apitwitter/apitwitter.service';

@Component({
  selector: 'app-tweet-list',
  templateUrl: './tweet-list.component.html',
  styleUrls: ['./tweet-list.component.css']
})
export class TweetListComponent implements OnInit {

  tweets: ITweet[] = [];
  displayedTweets: ITweet[] = [];
  faRetweet = faRetweet;
  faHeart = faHeart;
  faAngleUp = faAngleUp;
  private totalTweets: number = 100;
  private actualTweets: number;
  private tweetsPerPage: number = 25;
  showGoUpButton: boolean;
  showScrollHeight: number = 400;
  hideScrollHeight: number = 200;

  constructor(private apiTwitterService: ApiTwitterService) {
    this.showGoUpButton = false;
  }

  ngOnInit(): void {
    this.getTimeline();
  }

  getTimeline(): void {
    this.apiTwitterService.getTweets()
      .subscribe(tweets => {
        this.actualTweets = 25;
        this.tweets = tweets;
        this.displayedTweets = tweets.slice(0, this.tweetsPerPage - 1);
      });
  }

  onScroll() {
    if (this.actualTweets < this.totalTweets) {
      this.getMoreTweets();
      this.actualTweets = this.actualTweets + this.tweetsPerPage;
    }
  }

  getMoreTweets() {
    let array = this.tweets.slice(this.actualTweets, (this.actualTweets + this.tweetsPerPage) - 1);
    this.displayedTweets = this.displayedTweets.concat(array);
  }

  scrollTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if ((window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop) > this.showScrollHeight) {
      this.showGoUpButton = true;
    } else if (this.showGoUpButton &&
      (window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop)
      < this.hideScrollHeight) {
      this.showGoUpButton = false;
    }
  }

}