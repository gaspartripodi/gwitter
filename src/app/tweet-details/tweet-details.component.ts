import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ITweet } from '../models/tweet';
import { ApiTwitterService } from '../services/apitwitter/apitwitter.service';

@Component({
  selector: 'app-tweet-details',
  templateUrl: './tweet-details.component.html',
  styleUrls: ['./tweet-details.component.css']
})
export class TweetDetailsComponent implements OnInit {
  @Input() tweet: ITweet;
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiTwitterService,
    private location: Location
  ) {}


  ngOnInit(): void {
    this.getTweet();
  } 
  
  getTweet(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.apiService.getTweet(id)
      .subscribe(tweet => this.tweet = tweet);

  }

}
