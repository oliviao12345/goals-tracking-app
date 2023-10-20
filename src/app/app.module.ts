import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CoursesComponent } from './courses/courses.component';
import { PricingComponent } from './pricing/pricing.component';
import { GoalsComponent } from './goals/goals.component';
import { FormsModule } from '@angular/forms';
import { GoalsService } from 'src/app/goals/GoalsService';
import { HttpClientModule } from '@angular/common/http';
import { UpdateGoalComponent } from './goals/update-goal/update-goal.component';
import { CreateGoalComponent } from './goals/create-goal/create-goal.component';
import { ViewGoalComponent } from './goals/view-goal/view-goal.component';
import { DeleteGoalComponent } from './goals/delete-goal/delete-goal.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    HomeComponent,
    AboutComponent,
    CoursesComponent,
    PricingComponent,
    GoalsComponent,
    UpdateGoalComponent,
    CreateGoalComponent,
    ViewGoalComponent,
    DeleteGoalComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [GoalsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
