import { Component, HostListener } from '@angular/core';
import { faSearch, faRetweet, faHeart, faAngleUp } from '@fortawesome/free-solid-svg-icons';

import { ITweet } from '../../models/tweet';
import { ApiTwitterService } from '../../services/apitwitter/apitwitter.service';

import { TOTAL_TWEETS, TWEETS_PER_PAGE, SHOW_SCROLL_HEIGHT, HIDE_SCROLL_HEIGHT } from '../../constants/constants';
import { ISearch } from '../../models/search';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  tweets: ITweet[] = [];
  searchTweet: ISearch;
  displayedTweets: ITweet[] = [];
  faSearch = faSearch;
  faRetweet = faRetweet;
  faHeart = faHeart;
  faAngleUp = faAngleUp;
  private actualTweets: number;
  showGoUpButton: boolean;

  constructor(private apiTwitterService: ApiTwitterService) {
    this.showGoUpButton = false;
  }

  searchedTerm(term: string): void {
    if (term != "") {
      this.apiTwitterService.searchTweets(term)
        .subscribe(searchTweet => {

          this.actualTweets = 25;
          for (let i = 0; i < searchTweet.statuses.length; i++) {
            this.tweets.push(searchTweet.statuses[i]);
          }
          this.displayedTweets = this.tweets.slice(0, TWEETS_PER_PAGE - 1);
        });
    }
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