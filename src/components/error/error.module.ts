import { NgModule } from '@angular/core';
import { ErrorMessageComponent } from './error';
import { IonicModule } from 'ionic-angular';

@NgModule({
    declarations: [
        ErrorMessageComponent
    ],
    imports: [
        IonicModule
    ],
    exports: [
        ErrorMessageComponent
    ]
})
export class ErrorMessageComponentComponentModule {}