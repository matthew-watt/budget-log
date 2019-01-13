import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BudgetDate } from 'src/app/models/budget-date';
import * as moment from 'moment';
import { HostListener } from '@angular/core'
import { BudgetService } from 'src/app/services/budget/budget.service';
import { nextContext } from '@angular/core/src/render3';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  budgetDates: BudgetDate[] = [];
  dateCount: number = 5;
  previousDates: BudgetDate[] = [];
  screenWidth: number = window.innerWidth;
  @ViewChild('hover') hoverElement: ElementRef;

  constructor(private budgetService: BudgetService) { }

  ngOnInit() {    
    this.generateDates();
    const now = moment().toISOString();
    console.log('now', now);
    const startDate = moment().subtract('days', 4).format('YYYY-MM-DD').toString();
    const finishDate = moment().add('days', 4).format('YYYY-MM-DD').toString();
    console.log('days to ', startDate, '....... ',  finishDate);
    this.budgetService.getBudgetDay(startDate, finishDate).subscribe({
      next(budgetDates) {
        console.log('budget dates', budgetDates);
      }
    });
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
    else if (this.screenWidth > 600) {
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
