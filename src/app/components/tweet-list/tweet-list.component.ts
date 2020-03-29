import { Component, HostListener } from '@angular/core';
import { faRetweet, faHeart, faAngleUp } from '@fortawesome/free-solid-svg-icons';

import { ITweet } from '../../models/tweet';
import { ApiTwitterService } from '../../services/apitwitter/apitwitter.service';

import { TOTAL_TWEETS, TWEETS_PER_PAGE, SHOW_SCROLL_HEIGHT, HIDE_SCROLL_HEIGHT } from '../../constants/constants';

@Component({
  selector: 'app-tweet-list',
  templateUrl: './tweet-list.component.html',
  styleUrls: ['./tweet-list.component.css']
})
export class TweetListComponent {

  tweets: ITweet[] = [];
  displayedTweets: ITweet[] = [];
  faRetweet = faRetweet;
  faHeart = faHeart;
  faAngleUp = faAngleUp;
  private actualTweets: number;
  showGoUpButton: boolean;

  constructor(private apiTwitterService: ApiTwitterService) {
    this.getTimeline();
    this.showGoUpButton = false;
  }

  getTimeline(): void {
    this.apiTwitterService.getTweets()
      .subscribe(tweets => {
        this.actualTweets = 25;
        this.tweets = tweets;
        this.displayedTweets = tweets.slice(0, TWEETS_PER_PAGE - 1);
      });
  }

  onScroll() {
    if (this.actualTweets < TOTAL_TWEETS) {
      this.getMoreTweets();
      this.actualTweets = this.actualTweets + TWEETS_PER_PAGE;
    }
  }

  getMoreTweets() {
    const array = this.tweets.slice(this.actualTweets, (this.actualTweets + TWEETS_PER_PAGE) - 1);
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
      document.body.scrollTop) > SHOW_SCROLL_HEIGHT) {
      this.showGoUpButton = true;
    } else if (this.showGoUpButton &&
      (window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop)
      < HIDE_SCROLL_HEIGHT) {
      this.showGoUpButton = false;
    }
  }

}