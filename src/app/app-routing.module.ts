import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CoursesComponent } from './courses/courses.component';
import { PricingComponent } from './pricing/pricing.component';
import { GoalsComponent } from './goals/goals.component';

// This specifies the endpoints for each page!
const routes: Routes = [
{
  path: '',
  component: HomeComponent
},
{
  path: 'about',
  component: AboutComponent
},
{
  path: 'contact',
  component: ContactComponent
},
{
  path: 'courses',
  component:CoursesComponent
},
{
  path: 'pricing',
  component: PricingComponent
},
{
  path: 'goals',
  component: GoalsComponent
}

];
// Note that the endpoints are CASE SENSITIVE!

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
