import { Component, Input } from '@angular/core';
import { ProfileButton } from '../../components/profile-button/profile-button';

@Component({
  selector: 'navbar',
  templateUrl: 'navbar.html'
})
export class NavbarComponent {

  @Input() hideBackButton: boolean;
  @Input() profilebtn: boolean;
  @Input() menu: boolean;
}
