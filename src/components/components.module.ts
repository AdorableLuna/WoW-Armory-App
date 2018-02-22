import { NgModule } from '@angular/core';
import { ProfileButton } from './profile-button/profile-button';
import { ErrorMessageComponent } from './error/error';
import { NavbarComponent } from './navbar/navbar';

@NgModule({
	declarations: [ProfileButton,
    ErrorMessageComponent,
    NavbarComponent],
	imports: [],
	exports: [ProfileButton,
    ErrorMessageComponent,
    NavbarComponent]
})
export class ComponentsModule {}
