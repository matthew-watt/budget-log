import { Component, OnInit, Input, ElementRef, ViewChild, ChangeDetectorRef, HostListener, EventEmitter, Output  } from '@angular/core';
import * as moment from 'moment';
import { BudgetDate } from 'src/app/models/budget-date';
import { TimelineService } from 'src/app/services/timeline/timeline.service';

@Component({
  selector: 'app-timeline-date',
  templateUrl: './timeline-date.component.html',
  styleUrls: ['./timeline-date.component.scss']
})
export class TimelineDateComponent implements OnInit {

  hoverVisible: boolean = false;
  @Input() budgetDate: BudgetDate;
  @Output() editingChange = new EventEmitter();
  @Input() editing: boolean;
  @ViewChild('hover') hoverElement: ElementRef;
  offsetTopHover: number = 0;
  offsetLeftHover: number = 0;

  constructor(private timelineService: TimelineService,
              private elementRef: ElementRef,
              private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() { }

  onClick() {
    this.editing = true;
    this.timelineService.editBudgetDate(this.budgetDate);
  }

  onMouseEnter() {
    this.hoverVisible = true;
  }

  onMouseLeave() {
    this.hoverVisible = false;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.hoverElement) {
      //console.log('height', this.hoverElement.nativeElement.offsetHeight);
      this.offsetTopHover = -1 * (this.hoverElement.nativeElement.offsetHeight) + 20;
      this.offsetLeftHover = -1 * (this.hoverElement.nativeElement.offsetWidth - this.elementRef.nativeElement.offsetWidth) / 2 // date.width - hover.width / 2
      this.changeDetectorRef.detectChanges();
    }
  }

}
