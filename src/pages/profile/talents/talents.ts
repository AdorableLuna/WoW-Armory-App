import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { ArmoryService } from '../../../app/services/armory.service';
import { TalentTooltipPage } from './../../../modals/talent-tooltip/talent-tooltip';
import * as _ from 'lodash';

@Component({
    selector: 'talents',
    templateUrl: 'talents.html'
})
export class TalentsPage {
    talents: any;
    activeSpec: any;

    constructor(
        public navCtrl: NavController,
        private armoryService: ArmoryService,
        public modalCtrl: ModalController
    ) {
        this.talents = this.armoryService.character;

        this.activeSpec = this.talents.talents.filter(spec => spec.selected)[0];
        this.activeSpec.talents = _.sortBy(this.activeSpec.talents, 'tier');
        this.sortTalents();
    }

    changeSpec(spec) {
        this.activeSpec = spec;
        this.activeSpec.talents = _.sortBy(this.activeSpec.talents, 'tier');
        this.sortTalents();
    }

    sortTalents() {
        this.talents.allTalents.forEach(spec => {
            spec.tiers.forEach(talentRow => {
                talentRow.columns.forEach(talentColumn => {
                    this.activeSpec.talents.forEach(chosenTalent => {
                        talentColumn.selected = false;
                    });
                });
            });
        });

        this.talents.allTalents.forEach(spec => {
            spec.tiers.forEach(talentRow => {
                talentRow.columns.forEach(talentColumn => {
                    this.activeSpec.talents.forEach(chosenTalent => {
                        if (talentColumn.spell.name == chosenTalent.spell.name) {
                            talentColumn.selected = true;
                        }
                    });
                });
            });
        });
    }

    openModal(talent) {
        if (!talent) return;

        let talentModal = this.modalCtrl.create(TalentTooltipPage, { talent: talent });
        talentModal.present();
    }
}
