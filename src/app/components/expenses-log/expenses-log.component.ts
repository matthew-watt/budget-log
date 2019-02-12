import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { BudgetService } from 'src/app/services/budget/budget.service';
import { BudgetTestService } from 'src/app/services/budget-test/budget-test.service';
import { TimelineService } from 'src/app/services/timeline/timeline.service';
import { BudgetDate } from 'src/app/models/budget-date';
import * as moment from 'moment';
import { Moment } from 'moment';

import { mergeMap, tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
  timezonesVisible: boolean = false;
  editMode: boolean = false;
  editBudgetDate: BudgetDate;
  spentInputLastValue: number = null;
  inputStep: number = 1;
  startDate: string;
  finishDate: string;
  todayComplete: boolean;

  @ViewChild("currentDaySpentInput") currentDaySpentInput: ElementRef;
  @ViewChild("currentDayEarnedInput") currentDayEarnedInput: ElementRef;

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private budgetService: BudgetService,
              private budgetTestService: BudgetTestService,
              private timelineService: TimelineService) { }

  ngOnInit() {
    let self = this;
    this.startDate = moment().subtract('days', 4).format('YYYY-MM-DD').toString();
    this.finishDate = moment().add('days', 4).format('YYYY-MM-DD').toString();
    
    this.getBudgetDates()    
        .subscribe({
          next(budgetDates) {
            console.log('fetched budget dates from server.');
            console.log('fetched dates from server', budgetDates);
            self.timelineBudgetDates = self.processDates(budgetDates);
            console.log('timeline dates', self.timelineBudgetDates);            
          },
          error(error) {
            // shouldn't nest rxjs like this, defeats the purpose
            self.budgetTestService.getBudgetDates(self.startDate, self.finishDate)
            
            .subscribe({
              next(budgetDates) {
                console.log('fetched budget dates from local test service.');
                self.timelineBudgetDates = budgetDates;                   
              },
              error(error) {}
            });
          }
        });

        // if new day, could be past, requires date
        // existing, requires id only
    

    this.currentDay = new BudgetDate({
      spent: null,
      earned: null,
      moment: moment(),
      onServer: false
    });
    console.log('current day', this.currentDay.moment.toString());
    //this.debugDay();

    this.timelineService.onBudgetDateEdit().subscribe({

      next(budgetDate: BudgetDate) {
        if (budgetDate.id) {
          self.editMode = true;
        }
        else {
          self.editMode = false;
        }

        self.inputHelperTextVisible = true;
        self.currentDay = budgetDate;
        self.todayComplete = false;        
        self.inputStep = 1;
        self.editBudgetDate = Object.assign({}, budgetDate);
        self.helperText();

        console.log('EDIT MODE = ' + self.editMode);
      },
      error(error) {
        console.log('error', error);
      }
    });
  }

  editingToday() {
    if (this.currentDay.moment.isSame(moment(), 'd')) {
      //console.log('edit day is today...');
      return true;
    }
  }

  ngAfterViewInit() {
    this.currentDaySpentInput.nativeElement.focus();
  }

  onKey(event: any) {
    if (event.key === 'Enter') {
      this.enterInput();      
    }
    this.helperText();
  }

  enterInput() {
    
    if (this.inputStep == 1) {
      this.changeDetectorRef.detectChanges();
      //this.currentDayEarnedInput.nativeElement.focus();
      this.inputStep++;
    }
    else if (this.inputStep == 2 && this.currentDaySpentInput !== null) {
      this.currentDay.saved = this.currentDay.earned - this.currentDay.spent;
      
      if (this.currentDayEarnedInput !== null) {
        if (this.editMode) {          
          this.updateBudgetInput();
        }
        else {
          this.saveBudgetInput();
        }
        this.todayComplete = true;        
        this.editMode = false;
      }

    }    
    
    console.log('@ step = ', this.inputStep);
    console.log('input step @ ', this.inputStep);
  }

  saveBudgetInput(): void {
    let self = this;
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

  updateBudgetInput(): void {
    let self = this;
    this.budgetService.putBudgetDay(this.currentDay)
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
      
    if (this.currentDay.spent && this.inputStep == 1) {
      this.inputHelperTextVisible = true;
    }
    else if (this.currentDay.earned && this.inputStep == 2) {
      this.inputHelperTextVisible = true;
    }
    else {
      this.inputHelperTextVisible = false;
    }
  }

  getBudgetDates() {
    this.timelineBudgetDates = [];
    return this.budgetService.getBudgetDays(this.startDate, this.finishDate).pipe(
      //mergeMap(budgetDates => budgetDates)
    );
  }

  processDates(objects) {
    let budgetDates: BudgetDate[] = [];
    for (let obj of objects) {

      // dates from server are UTC
      const budgetDate = new BudgetDate({
        id: obj.id,
        moment: moment(obj.date),
        date: moment(obj.date).format('YYYY-MM-DDTHH:mm:ss'),
        earned: obj.earned,
        spent: obj.spent,        
        onServer: true
      });
      budgetDates.push(budgetDate);      
    }

    // current day is not UTC it is local
    //budgetDates.push(this.currentDay);
    return budgetDates;
  }

  debugDay() {
    console.log('----------');
    console.log('timezone: ', this.currentDay.moment.utcOffset());
    console.log('date: ', this.currentDay.moment.toString());
    console.log('date ISO: ', this.currentDay.moment.toISOString());
    console.log('date: ', this.currentDay.moment.format('YYYY-MM-DDTHH:mm:ss'));
    console.log('----------');
  }

}
