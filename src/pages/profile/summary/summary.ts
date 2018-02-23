import { Character } from './../../../classes/character';
import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { ArmoryService } from '../../../app/services/armory.service';

@Component({
  selector: 'summary',
  templateUrl: 'summary.html'
})
export class SummaryPage {
    error: Object;
    realm: string;
    name: string;
    stats: any;
    characterStats: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private armoryService: ArmoryService,
        private menu: MenuController
    ) {
        this.realm = navParams.get('realm');
        this.name = navParams.get('name');
        this.getData().then(data => {
            this.armoryService.character = new Character().deserialize(data);
        });
    }

    getData() {
        this.error = undefined;
        this.menu.swipeEnable(true);
        return new Promise((resolve, reject) => {
            this.armoryService.getCharacterData(this.realm, this.name, 'guild,items,mounts,pets,petSlots,stats,talents,titles').then(val => {
                this.stats = val;
                this.stats.talents = val['talents'].filter(spec => spec['spec']);

                this.characterStats = [
                    { type: "health", value: val['stats']['health'] },
                    { type: val['stats']['powerType'], value: val['stats']['power'] },
                    { type: this.filterStat(), value: val['stats'][this.mainstat()] },
                    { type: "stamina", value: val['stats']['sta'] },
                    { type: "critical-strike", value: val['stats']['crit'].toFixed(0) + '%' },
                    { type: "haste", value: val['stats']['haste'].toFixed(0) + '%' },
                    { type: "mastery", value: val['stats']['mastery'].toFixed(0) + '%' },
                    { type: "versatility", value: val['stats']['versatilityDamageDoneBonus'].toFixed(0) + '%' }
                ];

                this.armoryService.getResourcesData('talents').then(talents => {
                    this.armoryService.getPetsGithub().then(pets => {
                        for (let i = 0; i < this.stats.petSlots.length; i++) {
                            for (let j = 0; j < this.stats.pets.collected.length; j++) {
                                if (this.stats.petSlots[i]['battlePetGuid'] == this.stats.pets.collected[j]['battlePetGuid']) {
                                    this.stats.petSlots[i]['creatureId'] = this.stats.pets.collected[j]['creatureId'];
                                }
                            }

                            for (let pet in pets) {
                                if (this.stats.petSlots[i]['creatureId'] == pets[pet]['creatureId']) {
                                    this.stats.petSlots[i]['displayId'] = pets[pet]['displayId'];
                                }
                            }
                        }

                        for (let j = 0; j < this.stats.pets.collected.length; j++) {
                            for (let pet in pets) {
                                if (this.stats.pets.collected[j]['creatureId'] == pets[pet]['creatureId']) {
                                    this.stats.pets.collected[j]['displayId'] = pets[pet]['displayId'];
                                }
                            }
                        }
                    });

                    this.armoryService.getMountsGithub().then(mounts => {
                        for (let i = 0; i < this.stats.mounts.collected.length; i++) {
                            for (let mount in mounts) {
                                if (this.stats.mounts.collected[i]['creatureId'] == mounts[mount]['creatureId']) {
                                    this.stats.mounts.collected[i]['displayId'] = mounts[mount]['displayId'];
                                }
                            }
                        }
                    });

                    let talentArray = [];

                    for (let spec in talents[val['classId']]['specs']) { //  specs
                        talentArray[spec] = [];
                        talentArray[spec]['name'] = talents[val['classId']]['specs'][spec]['name'];

                        talentArray[spec]['tiers'] = [];

                        for (let talentRow in talents[val['classId']]['talents']) { //  row
                            talentArray[spec]['tiers'][talentRow] = [];
                            talentArray[spec]['tiers'][talentRow]['columns'] = [];
                            
                            LoopTalent:
                            for (let talent in talents[val['classId']]['talents'][talentRow]) { //  column
                                for (let specTalent in talents[val['classId']]['talents'][talentRow][talent]) { //  talent
        
                                    if (talents[val['classId']]['talents'][talentRow][talent][specTalent]['spec']) {
                                        if (talents[val['classId']]['talents'][talentRow][talent][specTalent]['spec']['name'] == talentArray[spec]['name']) {
        
                                            var found = null;
                                            for (let talentArrayRow in talentArray[spec]['tiers'][talentRow]['columns']) {
                                                if (talentArray[spec]['tiers'][talentRow]['columns'][talentArrayRow]['tier'] == talents[val['classId']]['talents'][talentRow][talent][specTalent]['tier'] && talentArray[spec]['tiers'][talentRow]['columns'][talentArrayRow]['column'] == talents[val['classId']]['talents'][talentRow][talent][specTalent]['column']) {
                                                    talentArray[spec]['tiers'][talentRow]['columns'][talentArrayRow] = talents[val['classId']]['talents'][talentRow][talent][specTalent];
                                                    found = true;
                                                    break;
                                                }
                                            }
        
                                            if (found) {
                                                continue LoopTalent;
                                            }
                                            else {
                                                talentArray[spec]['tiers'][talentRow]['columns'].push(talents[val['classId']]['talents'][talentRow][talent][specTalent]); 
                                            }
                                        }
                                    }
        
                                    else if (!talents[val['classId']]['talents'][talentRow][talent][specTalent]['spec']) {
        
                                        var found = null;
                                        for (let talentArrayRow in talentArray[spec]['tiers'][talentRow]['columns']) {
                                            if (talentArray[spec]['tiers'][talentRow]['columns'][talentArrayRow]['tier'] == talents[val['classId']]['talents'][talentRow][talent][specTalent]['tier'] && talentArray[spec]['tiers'][talentRow]['columns'][talentArrayRow]['column'] == talents[val['classId']]['talents'][talentRow][talent][specTalent]['column']) {
                                                found = true;
                                                break;
                                            }
                                        }
        
                                        if (!found) {
                                            talentArray[spec]['tiers'][talentRow]['columns'].push(talents[val['classId']]['talents'][talentRow][talent][specTalent]);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    this.stats.allTalents = talentArray;

                    resolve(val);
                }, err => {
                    this.error = { code: err.error.code, detail: err.error.detail };
                    this.menu.swipeEnable(false);
                    reject(this.error);
                });

            }, err => {
                this.error = { code: err.error.code || err.error.status, detail: err.error.detail || err.error.reason };
                this.menu.swipeEnable(false);
            });
        });
    }

    mainstat() {
        switch(this.stats['class']) {
            case 'Warrior':
                return 'str';
            case 'Paladin':
                if (this.stats['spec'] == 'Holy')
                {
                    return 'int';
                }
                else
                {
                    return 'str';
                }
            case 'Hunter':
                return 'agi';
            case 'Rogue':
                return 'agi';
            case 'Priest':
                return 'int';
            case 'Death Knight':
                return 'str';
            case 'Shaman':
                if (this.stats['spec'] == 'Enhancement')
                {
                    return 'agi';
                }
                else
                {
                    return 'int';
                }
            case 'Mage':
                return 'int';
            case 'Warlock':
                return 'int';
            case 'Monk':
                if (this.stats['spec'] == 'Mistweaver')
                {
                    return 'int';
                }
                else
                {
                    return 'agi';
                }
            case 'Druid':
                if (this.stats['spec'] == 'Guardian' || this.stats['spec'] == 'Feral')
                {
                    return 'agi';
                }
                else
                {
                    return 'int';
                }
            case 'Demon Hunter':
                return 'agi';
        }
    }

    filterStat() {
        switch(this.mainstat()) {
            case 'str':
                return 'strength';
            case 'agi':
                return 'agility';
            case 'int':
                return 'intellect';
        }
    }
}
