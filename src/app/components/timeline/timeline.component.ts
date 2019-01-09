import { Component, OnInit } from '@angular/core';
import { BudgetDate } from 'src/app/models/budget-date';
import * as moment from 'moment';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  budgetDates: BudgetDate[] = [];
  days: number = 10;

  constructor() { }

  ngOnInit() {
    console.log(moment().format("MMM Do"));
    
    for (let i = -5; i < this.days; i++) {
      var budgetDate = new BudgetDate ({
        date: moment().add(i, 'days'),
        expenses: 0,
        income: 0,
      });

      this.budgetDates.push(budgetDate);
    }
  }

  getDates() {
    const currentDate = new Date();
    for (let i = 0; i < this.days; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + i);
      //this.dates.push(date);
    }
  }

  getStyle(date) {

  }

}
