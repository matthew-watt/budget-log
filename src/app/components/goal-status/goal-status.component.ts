import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-goal-status',
  templateUrl: './goal-status.component.html',
  styleUrls: ['./goal-status.component.scss']
})
export class GoalStatusComponent implements OnInit {

  goalCompletePercentage: number;
  totalSaved: number = 250;
  goalAmount: number = 1000;

  constructor() { }

  ngOnInit() {
    this.goalCompletePercentage = 100 * (this.totalSaved / this.goalAmount);
  }

}
