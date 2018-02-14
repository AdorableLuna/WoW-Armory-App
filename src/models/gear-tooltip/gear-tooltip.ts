import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-gear-tooltip',
  templateUrl: 'gear-tooltip.html',
})
export class GearTooltipPage {
  item: any = this.navParams.get('item')

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
  }

  closeModal() {
    console.log(this.item);
    this.viewCtrl.dismiss();
  }

}
