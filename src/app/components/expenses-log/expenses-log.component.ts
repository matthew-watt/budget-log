import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CurrentDay } from 'src/app/models/current-day';
import { BudgetService } from 'src/app/services/budget/budget.service';
import { BudgetTestService } from 'src/app/services/budget-test/budget-test.service';
import { TimelineService } from 'src/app/services/timeline/timline.service';
import { BudgetDate } from 'src/app/models/budget-date';
import * as moment from 'moment';
import { Moment } from 'moment';

@Component({
  selector: 'app-expenses-log',
  templateUrl: './expenses-log.component.html',
  styleUrls: ['./expenses-log.component.scss']
})
export class ExpensesLogComponent implements OnInit {
  inputHelperTextVisible: boolean = false;
  currentDay: BudgetDate;
  spentInput: number = null;
  earnedInput: number = null;
  spentInputComplete: boolean = false;
  earnedInputComplete: boolean = false;
  now: Moment;
  timelineBudgetDates: BudgetDate[];


  @ViewChild("currentDaySpentInput") currentDaySpentInput: ElementRef;
  @ViewChild("currentDayEarnedInput") currentDayEarnedInput: ElementRef;

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private budgetService: BudgetService,
              private budgetTestService: BudgetTestService,
              private timelineService: TimelineService) { }

  ngOnInit() {

    let self = this;
    this.getBudgetDates();
    this.currentDay = new BudgetDate({
      expenses: null,
      income: null,
      moment: moment(),
      onServer: false
    });
    this.timelineService.onBudgetDateEdit().subscribe({
      next(budgetDate: BudgetDate) {
        self.currentDay = budgetDate;
      },
      error(error) {
        console.log('error', error);
      }
    });
  }

  ngAfterViewInit() {
    this.currentDaySpentInput.nativeElement.focus();
  }

  onKey(event: any) {
    if (event.key === 'Enter') {
      // number = 22. 22 3 (include space)
      // non numeric
      if (this.currentDay.expenses) {
        this.spentInputComplete = true;
        this.changeDetectorRef.detectChanges();
        this.currentDayEarnedInput.nativeElement.focus();
      }
      if (this.currentDay.income) {
        this.earnedInputComplete = true;
        this.currentDay.saved = this.currentDay.income - this.currentDay.expenses;
      }
    }

    // completed budget logging for the day
    if (this.spentInputComplete && this.earnedInputComplete) {            
      this.saveBudgetInput();
    }

    this.helperText();
  }

  saveBudgetInput(): void {
    let self = this;
    // moment.toISOString coverts the date to a UTC (+0) datetime string, it is converted back to local timezone when fetch from server by moment()    
    console.log('day being edited', self.currentDay);
    this.budgetService.postBudgetDay(this.currentDay)        
        .subscribe({
          next(result) {
            self.currentDay.onServer = true;
          },
          error(error) {
            console.log(error);
          }
        });
  }

  helperText() {
    this.inputHelperTextVisible = false;
    if (this.currentDay.expenses && !this.spentInputComplete) {
      this.inputHelperTextVisible = true;
    }
    else if (this.currentDay.income && this.spentInputComplete && !this.earnedInputComplete) {
      this.inputHelperTextVisible = true;
    }
    else {
      this.inputHelperTextVisible = false;
    }
  }

  getBudgetDates() {
    const startDate = moment().subtract('days', 4).format('YYYY-MM-DD').toString();
    const finishDate = moment().add('days', 4).format('YYYY-MM-DD').toString();

    let self = this;
    this.timelineBudgetDates = [];

    this.budgetService.getBudgetDays(startDate, finishDate).subscribe({
      next(budgetDates) {
        self.timelineBudgetDates = self.processDates(budgetDates);
      },
      error(error) {
        console.log('error: could not fetch budgetDates');
        console.log('fetching budget dates from test service');
        self.budgetTestService.getBudgetDates(startDate, finishDate).subscribe({
          next(budgetDates) {
            self.timelineBudgetDates = budgetDates;
            //self.changeDetectorRef.detectChanges();
          },
          error(error) {}
        });
      }
    });
  }

  processDates(objects) {
    let budgetDates: BudgetDate[] = [];
    for (let obj of objects) {

      // dates from server are UTC
      const budgetDate = new BudgetDate({
        moment: moment(obj.Date),
        date: moment(obj.Date).format('YYYY-MM-DDTHH:mm:ss'),
        income: obj.Income,
        expenses: obj.Expenses,        
        onServer: true
      });
      budgetDates.push(budgetDate);      
    }

    // current day is not UTC it is local
    budgetDates.push(this.currentDay);
    return budgetDates;
  }

}
