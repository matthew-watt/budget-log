import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BudgetDate } from 'src/app/models/budget-date';
import * as moment from 'moment';
import { HostListener } from '@angular/core'

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  budgetDates: BudgetDate[] = [];
  dateCount: number = 5;
  screenWidth: number = window.innerWidth;
  @ViewChild('hover') hoverElement: ElementRef;

  constructor() { }

  ngOnInit() {
    console.log(moment().format("MMM Do"));
    this.generateDates();
  }

  ngAfterViewChecked() {
    //this.hoverElement.nativeElement.offsetLeft;
    //console.log(this.hoverElement.nativeElement.offsetLeft);
  }

  generateDates() {
    // start with existing budgeted dates, fetch from server
    // append the future dates
    

    if (this.screenWidth > 1200) {
      this.dateCount = 4;
    }
    else if (this.screenWidth > 800) {
      this.dateCount = 3;
    }
    else if (this.screenWidth > 520) {
      this.dateCount = 2;
    }
    else {
      this.dateCount = 1;
    }

    this.budgetDates = [];
    for (let i = -1 * this.dateCount; i < this.dateCount + 1; i++) {
      var budgetDate = new BudgetDate ({
        date: moment().add(i, 'days'),
        expenses: 0,
        income: 0,
      });

      this.budgetDates.push(budgetDate);
    }
  }

  mouseEnter(event) {
    console.log(event);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = window.innerWidth;
    this.generateDates();
  }

}
