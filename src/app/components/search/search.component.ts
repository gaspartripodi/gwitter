import { Component, HostListener } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';

import { ITweet } from '../../models/tweet';
import { ApiTwitterService } from '../../services/apitwitter/apitwitter.service';

import { TWEET_LIMIT_PAGE, SHOW_SCROLL_HEIGHT, HIDE_SCROLL_HEIGHT } from '../../constants/constants';
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
  page: number = 1;
  offset: number;
  totalRows: number;
  totalPages: number;
  showGoUpButton: boolean;
  faAngleUp = faAngleUp;

  constructor(private apiTwitterService: ApiTwitterService, private spinner: NgxSpinnerService) {
    this.showGoUpButton = false;
  }

  searchedTerm(term: string): void {
    if (term != "") {
      this.apiTwitterService.searchTweets(term)
        .subscribe(searchTweet => {
          this.resetPagination();
          searchTweet.statuses.forEach((e) => this.tweets.push(e));
          this.totalRows = this.tweets.length;
          this.totalPages = Math.ceil(this.totalRows / TWEET_LIMIT_PAGE);
          this.getMoreTweets();
        });
    }
  }

  resetPagination() {
    this.tweets = [];
    this.displayedTweets = [];
    this.page = 1;
  }

  getMoreTweets() {
    this.offset = (this.page - 1) * TWEET_LIMIT_PAGE;
    this.displayedTweets = this.displayedTweets.concat(this.tweets.slice(this.offset, this.offset + TWEET_LIMIT_PAGE));
    this.page += 1;
  }

  onScroll() {
    if (this.page <= this.totalPages) {
      this.spinner.show();
      setTimeout(() => {
        this.getMoreTweets();
        this.spinner.hide();
      }, 500);
    }
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