import { Component, OnInit, Input, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
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
  
  timelineDates: BudgetDate[] = [];  
  screenWidth: number = window.innerWidth;
  timelineLength: number;

  private _budgetDates;
  @Input()
  set budgetDates(dates: BudgetDate[]) {
    this._budgetDates = dates;
    this.updateTimeline();
  }
  get budgetDates(): BudgetDate[] {
    return this._budgetDates;
  }

  //@Input() currentDay: BudgetDate;
  @ViewChild('hover') hoverElement: ElementRef;

  constructor(private budgetService: BudgetService,
              private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    //this.timelineDates = this.updateTimeline();
  }

  updateTimeline() {
    this.updateTimelineLength(window.innerWidth);
    console.log(this.budgetDates);
    if (this.budgetDates.length > 0) {

      let rangeDates = this.datesOfRange(moment().subtract(this.timelineLength, 'd'), moment().add(1, 'd'));

      //this.budgetDates = this.fillRangeGaps(this.budgetDates);

      console.log('dates of range', rangeDates);
      console.log('all budget dates', this.budgetDates);

      let timelineDates = this.budgetDates.filter(bd => rangeDates.find(d => d.isSame(bd.moment)));
      console.log('timeline dates filtered to budget dates', timelineDates);
      // dates in rangeDates and not in timelineDates become Budget dates
      let incompleteDates = rangeDates.filter(rd => !timelineDates.find(td => rd.isSame(td.moment)));
      console.log('incomplete dates', incompleteDates);
      let incompleteBudgetDates = this.datesToBudgetDates(incompleteDates);
      console.log('incomlete BudgetDates', incompleteBudgetDates);
      this.timelineDates = timelineDates.concat(incompleteBudgetDates);
    }
  }

  datesOfRange(start: Moment, end: Moment) {
    let day = start;
    let dates: Moment[] = [];
    while (day.isSameOrBefore(end)) {
      let cloneDay = day.clone();
      cloneDay.startOf('d');
      dates.push(cloneDay);
      day.add(1, 'd');
    }
    return dates;
  }

  datesToBudgetDates(dates: Moment[], onServer: boolean = false): BudgetDate[] {
    let budgetDates: BudgetDate[] = [];
    for (let date of dates) {
      budgetDates.push(new BudgetDate({
        moment: date,
        onServer: onServer
      }));
    }
    return budgetDates;
  }

  updateTimelineLength(screenWidth: number) {
    console.log('width', screenWidth);
    if (screenWidth < 400) {
      this.timelineLength = 2;
    }
    else if (screenWidth < 720) {
      this.timelineLength = 3;
    }
    else if (screenWidth < 1200) {
      this.timelineLength = 4;
    }
    else {
      this.timelineLength = 5;
    }
  }

  mouseEnter(event) {
    console.log(event);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {    
    this.updateTimeline();
  }

}
