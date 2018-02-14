import { Component } from '@angular/core';

import { SummaryPage } from '../profile/summary/summary';
import { CharacterPage } from '../profile/character/character';
import { TalentsPage } from '../profile/talents/talents';
import { LoginPage } from '../login/login';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  summary = SummaryPage;
  character = CharacterPage;
  talents = TalentsPage;
  login = LoginPage;

  constructor() {

  }
}
