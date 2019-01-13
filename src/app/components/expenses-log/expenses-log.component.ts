import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CurrentDay } from 'src/app/models/current-day';
import { BudgetService } from 'src/app/services/budget/budget.service';
import { BudgetDate } from 'src/app/models/budget-date';

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

  @ViewChild("currentDaySpentInput") currentDaySpentInput: ElementRef;
  @ViewChild("currentDayEarnedInput") currentDayEarnedInput: ElementRef;

  //private currentDayEarnedInput: ElementRef;
  //@ViewChild('currentDayEarnedInput') set input(input: ElementRef) {
  //  if (input !== null) {
  //    this.currentDayEarnedInput = input;
  //  }
  //}

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private budgetService: BudgetService) { }

  ngOnInit() {
    this.currentDay = new BudgetDate({
      expenses: null,
      income: null
    });
  }

  ngAfterViewInit() {
    this.currentDaySpentInput.nativeElement.focus();
  }

  ngAterViewChecked() {
    // todo: use changeDetectorRef instead, https://stackoverflow.com/a/46043837/10845059
    console.log('spent complete? ', this.spentInputComplete);
    if (this.spentInputComplete) {
      //this.currentDayEarnedInput && this.currentDayEarnedInput.nativeElement.focus();
    }
    //this.changeDetectorRef.detectChanges();
    //if (typeof this.currentDayEarnedInput !== 'undefined') {
    //  this.currentDayEarnedInput.nativeElement.focus();
    //}
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

    if (this.spentInputComplete && this.earnedInputComplete) {
      this.budgetService.postBudgetDay(this.currentDay)
                        .subscribe({
                          next(result) {
                            console.log(result);
                          }
                        });
    }

    this.helperText();
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

}
