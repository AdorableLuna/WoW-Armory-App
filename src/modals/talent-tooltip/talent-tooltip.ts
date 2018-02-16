import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-talent-tooltip',
    templateUrl: 'talent-tooltip.html',
})
export class TalentTooltipPage {
    talent: any = this.navParams.get('talent')

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        public viewCtrl: ViewController
    ) {

    }

    closeModal() {
        this.viewCtrl.dismiss();
    }
}