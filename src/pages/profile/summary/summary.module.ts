import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SummaryPage } from './summary';
import { ProfileButtonComponentModule } from '../../../components/profile-button/profile-button.module';

@NgModule({
  declarations: [
    SummaryPage,
  ],
  imports: [
    ProfileButtonComponentModule,
  ],
})
export class SummaryPageModule {}