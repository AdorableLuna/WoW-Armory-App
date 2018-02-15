import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ArmoryService } from '../../../app/services/armory.service';

@Component({
    selector: 'talents',
    templateUrl: 'talents.html'
})
export class TalentsPage {
    error: Object;

    constructor(
        public navCtrl: NavController,
        private armoryService: ArmoryService
    ) {

    }

}
