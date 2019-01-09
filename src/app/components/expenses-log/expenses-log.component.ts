import { Component, OnInit } from '@angular/core';
import { CurrentDay } from 'src/app/models/current-day';

@Component({
  selector: 'app-expenses-log',
  templateUrl: './expenses-log.component.html',
  styleUrls: ['./expenses-log.component.scss']
})
export class ExpensesLogComponent implements OnInit {
  inputHelperTextVisible: boolean = false;
  spentInput: number = null;
  earnedInput: number = null;
  currentDay: CurrentDay;
  inputComplete: boolean = false;

  inputLabelText: string;

  constructor() { }

  ngOnInit() {
    this.currentDay = new CurrentDay({
      spent: null,
      earned: null
    });
  }

  onKey(event: any) {
    if (event.key === 'Enter') {
      console.log('enter pressed!');
      this.currentDay.spent = this.spentInput;
    }
    
    if (this.spentInput === null) {
      this.inputHelperTextVisible = false;
    } else {
      this.inputHelperTextVisible = true;      
    }
  }

}
