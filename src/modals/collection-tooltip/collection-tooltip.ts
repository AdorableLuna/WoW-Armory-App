import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-collection-tooltip',
  templateUrl: 'collection-tooltip.html',
})
export class CollectionTooltipPage {
  collection: any = this.navParams.get('collection')

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
