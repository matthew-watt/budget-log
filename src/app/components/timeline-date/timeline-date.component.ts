import { Component, OnInit, Input, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import * as moment from 'moment';
import { BudgetDate } from 'src/app/models/budget-date';

@Component({
  selector: 'app-timeline-date',
  templateUrl: './timeline-date.component.html',
  styleUrls: ['./timeline-date.component.scss']
})
export class TimelineDateComponent implements OnInit {

  @Input() hoverVisible: boolean = false;
  @Input() budgetDate: BudgetDate;
  @ViewChild('hover') hoverElement: ElementRef;
  offsetTopHover: number = 0;
  offsetLeftHover: number = 0;

  constructor(private elementRef: ElementRef,
              private changeDetectorRef: ChangeDetectorRef) {  }

  ngOnInit() {  }

  ngAfterViewChecked() {
    if (this.hoverElement) {
      console.log(this.hoverElement.nativeElement.offsetHeight);
      this.offsetTopHover = -1 * (this.hoverElement.nativeElement.offsetHeight);
      this.offsetLeftHover = -1 * (this.hoverElement.nativeElement.offsetWidth - this.elementRef.nativeElement.offsetWidth) / 2 // date.width - hover.width / 2
      this.changeDetectorRef.detectChanges();
    }
  }

  onMouseEnter() {
    console.log(this.budgetDate);
    this.hoverVisible = true;
  }

  onMouseLeave() {
    this.hoverVisible = false;
  }

}
