import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExpensesLogComponent } from './components/expenses-log/expenses-log.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { AchievementsComponent } from './components/achievements/achievements.component';
import { TimelineDateComponent } from './components/timeline-date/timeline-date.component';
import { GoalStatusComponent } from './components/goal-status/goal-status.component';

@NgModule({
  declarations: [
    AppComponent,
    ExpensesLogComponent,    
    TimelineComponent, AchievementsComponent, TimelineDateComponent, GoalStatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  //providers: [{ provide: 'moment', useValue: moment }],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
