import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CurrentDay } from 'src/app/models/current-day';

@Component({
  selector: 'app-expenses-log',
  templateUrl: './expenses-log.component.html',
  styleUrls: ['./expenses-log.component.scss']
})
export class ExpensesLogComponent implements OnInit {
  inputHelperTextVisible: boolean = false;
  currentDay: CurrentDay;
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

  constructor() { }

  ngOnInit() {
    this.currentDay = new CurrentDay({
      spent: null,
      earned: null
    });
  }

  ngAfterViewInit() {
    this.currentDaySpentInput.nativeElement.focus();
  }

  ngAfterViewChecked() {
    if (typeof this.currentDayEarnedInput !== 'undefined') {
      this.currentDayEarnedInput.nativeElement.focus();
    }    
  }

  onKey(event: any) {
    if (event.key === 'Enter') {
      // number = 22. 22 3 (include space)
      // non numeric

      if (this.currentDay.spent) {
        this.spentInputComplete = true;

        
      }
      if (this.currentDay.earned) {
        this.earnedInputComplete = true;
      }
      this.inputHelperTextVisible = false;
    }

    if (this.currentDay.spent && !this.spentInputComplete) {
      this.inputHelperTextVisible = true;
    }
    else if (this.currentDay.earned && this.spentInputComplete && !this.earnedInputComplete) {
      this.inputHelperTextVisible = true;
    }
    else {
      this.inputHelperTextVisible = false;
    }
  }

}
