import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpensesLogComponent } from './components/expenses-log/expenses-log.component';

const routes: Routes = [
  { path: 'expenses', component: ExpensesLogComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
