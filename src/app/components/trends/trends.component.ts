import { Component, OnInit } from '@angular/core';
import { ITrend } from '../../models/trends';
import { ApiTwitterService } from '../../services/apitwitter/apitwitter.service';

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.css']
})
export class TrendsComponent implements OnInit {
  
  trends: ITrend[] = [];

  constructor(private apiService: ApiTwitterService) { }

  ngOnInit(): void {
    this.getTrends();
  }

  getTrends(): void {
    this.apiService.getTrends()
      .subscribe(trends => {
        this.trends = trends[0].trends.slice(0, 10);
      });
  }

}