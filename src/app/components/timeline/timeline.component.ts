import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { BudgetDate } from 'src/app/models/budget-date';
import * as moment from 'moment';
import { Moment } from 'moment';
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
  timelineDates: BudgetDate[] = [];
  dateCount: number = 5;
  previousDates: BudgetDate[] = [];
  screenWidth: number = window.innerWidth;
  @ViewChild('hover') hoverElement: ElementRef;

  constructor(private budgetService: BudgetService,
              private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {    
    const now = moment().toISOString();
    const startDate = moment().subtract('days', 4).format('YYYY-MM-DD').toString();
    const finishDate = moment().add('days', 4).format('YYYY-MM-DD').toString();

    let self = this;
    this.budgetService.getBudgetDay(startDate, finishDate).subscribe({
      next(budgetDates) {
        self.budgetDates = self.budgetDatesFromObjects(budgetDates);
        console.log(self.budgetDates);
        self.timelineDates = self.generateDates();
        self.changeDetectorRef.detectChanges();
      }
    });    
  }

  budgetDatesFromObjects(objects) {
    let budgetDates: BudgetDate[] = [];
    for (let obj of objects) {
      const budgetDate = new BudgetDate({
        moment: moment(obj.Date),
        date: obj.Date,
        income: obj.Income,
        expenses: obj.Expenses
      });
      budgetDates.push(budgetDate);
    }
    return budgetDates;
  }

  generateDates() {
    let timelineDates: BudgetDate[] = [];

    var start = moment().subtract(7, 'd').startOf('d');
    var end = moment().add(1, 'd').startOf('d');
    var days: Moment[] = [];
    var day = start;

    while (day <= end) {
        days.push(day);
        day = day.clone().add(1, 'd');
    }

    for (let day of days) {
      let added = false;
      for (let budgetDay of this.budgetDates) {

        console.log(day);
        console.log(budgetDay);
        console.log('--------');
        if (day.isSame(budgetDay.moment)) {
          
          timelineDates.push(budgetDay);
          added = true;
        }
      }
      if (!added) {
        timelineDates.push(new BudgetDate({
          moment: day,
          date: day.format('YYYY-MM-DD'),
          expenses: 0,
          income: 0
        }));
      }
    }

    return timelineDates;
  }

  generateDatesFind() {
    // each day
    // find: day == budget day add
    // if not found: new/convert date
  }

  mouseEnter(event) {
    console.log(event);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = window.innerWidth;
    this.timelineDates = this.generateDates();
  }

}
