import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExpensesLogComponent } from './components/expenses-log/expenses-log.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { AchievementsComponent } from './components/achievements/achievements.component';

@NgModule({
  declarations: [
    AppComponent,
    ExpensesLogComponent,    
    TimelineComponent, AchievementsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  //providers: [{ provide: 'moment', useValue: moment }],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
