import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ArmoryService } from '../../../app/services/armory.service';

@IonicPage()
@Component({
    selector: 'page-collections',
    templateUrl: 'collections.html',
})
export class CollectionsPage {
    allCollections: any;
    collections: any;
    activeTab: string;

    constructor(
        public navCtrl: NavController, 
        private armoryService: ArmoryService,
        public navParams: NavParams
    ) {
        this.activeTab = 'pets';
        this.allCollections = JSON.parse(localStorage.getItem('character_data'));
        this.sortPetSlots();
        this.sortMounts();
        this.collections = this.allCollections.pets;
    }

    changeTab(tab) {
        if (tab == 'pets')
        {
            this.collections = this.allCollections.pets;
        }
        else if (tab == 'mounts')
        {
            this.collections = this.allCollections.mounts;
        }
        console.log(this.collections);
        this.activeTab = tab;
    }

    sortPetSlots() {
        for (let i = 0; i < this.allCollections.petSlots.length; i++) {
            for (let j = 0; j < this.allCollections.pets.collected.length; j++) {
                if (this.allCollections.petSlots[i]['battlePetGuid'] == this.allCollections.pets.collected[j]['battlePetGuid']) {
                    this.allCollections.petSlots[i]['name'] = this.allCollections.pets.collected[j]['name'];
                    this.allCollections.petSlots[i]['creatureId'] = this.allCollections.pets.collected[j]['creatureId'];
                    this.allCollections.petSlots[i]['icon'] = this.allCollections.pets.collected[j]['icon'];
                    this.allCollections.petSlots[i]['quality'] = this.armoryService.getQuality(this.allCollections.pets.collected[j]['qualityId']);
                    this.allCollections.petSlots[i]['stats'] = this.allCollections.pets.collected[j]['stats'];
                    this.allCollections.petSlots[i]['isFavorite'] = this.allCollections.pets.collected[j]['isFavorite'];
                }

                this.allCollections.pets.collected[j]['quality'] = this.armoryService.getQuality(this.allCollections.pets.collected[j]['qualityId']);
            }
        }
    }

    sortMounts() {
        for (let i = 0; i < this.allCollections.mounts.collected.length; i++) {
            this.allCollections.mounts.collected[i]['quality'] = this.armoryService.getQuality(this.allCollections.mounts.collected[i]['qualityId']);
        }
    }
}
