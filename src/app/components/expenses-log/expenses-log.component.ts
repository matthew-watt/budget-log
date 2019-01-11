import { Component, OnInit } from '@angular/core';
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

  constructor() { }

  ngOnInit() {
    this.currentDay = new CurrentDay({
      spent: null,
      earned: null
    });
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

    console.log(this.spentInputComplete);
    console.log(this.earnedInputComplete);

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
