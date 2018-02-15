import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ArmoryService } from '../../../app/services/armory.service';
import { GearTooltipPage } from './../../../modals/gear-tooltip/gear-tooltip';

@Component({
    selector: 'character',
    templateUrl: 'character.html'
})
export class CharacterPage {
    realm: string;
    name: string;
    items: any;
    slots: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private armoryService: ArmoryService,
        public modalCtrl: ModalController
    ) {
        this.realm = navParams.get('realm');
        this.name = navParams.get('name');

        this.slots = new Array();
        this.slots['slotsLeft'] = 
        [
            {
                "name": "head",
                "item": null,
            },
            {
                "name": "neck",
                "item": null,
            },
            {
                "name": "shoulder",
                "item": null,
            },
            {
                "name": "back",
                "item": null,
            },
            {
                "name": "chest",
                "item": null,
            },
            {
                "name": "shirt",
                "item": null,
            },
            {
                "name": "tabard",
                "item": null,
            },
            {
                "name": "wrist",
                "item": null,
            }
        ];

        this.slots['slotsRight'] = 
        [
            {
                "name": "hands",
                "item": null,
            },
            {
                "name": "waist",
                "item": null,
            },
            {
                "name": "legs",
                "item": null,
            },
            {
                "name": "feet",
                "item": null,
            },
            {
                "name": "finger1",
                "item": null,
            },
            {
                "name": "finger2",
                "item": null,
            },
            {
                "name": "trinket1",
                "item": null,
            },
            {
                "name": "trinket2",
                "item": null,
            }
        ];

        this.slots['slotsBottom'] = 
        [
            {
                "name": "mainHand",
                "item": null,
            },
            {
                "name": "offHand",
                "item": null,
            }
        ];

        this.getData();
    }
    
    getData() {
        this.items = JSON.parse(localStorage.getItem('character_data'));
        for (var slot in this.slots) {
            for (var item in this.slots[slot]) {
                for (var items in this.items['items']) {
                    if (items == this.slots[slot][item].name) {
                        this.slots[slot][item].item = this.items['items'][items];
                        this.slots[slot][item]['item'].quality = this.armoryService.getQuality(this.items['items'][items]['quality'])
                    }
                }
            }
        }
    }

    openModal(item) {
        if (!item) return;

        switch (item.context) {
            case "raid-finder":
                item.context = 'Raid Finder';
                break;
            case "raid-normal":
                item.context = 'Normal';
                break;
            case "raid-heroic":
                item.context = 'Heroic';
                break;
            case "raid-mythic":
                item.context = 'Mythic';
                break;
            default:
                item.context = '';
                break;
        }

        if (item.tooltipParams.transmogItem) {
            this.armoryService.getItemData(item.tooltipParams.transmogItem).then(val => {
                item.tooltipParams.transmogItemName = val['name'];
            });
        }

        this.armoryService.getItemData(item.id).then(val => {
            item.itemBind = val['itemBind'];
            if (val['description']) {
                item.description = val['description'];
            }

            item.inventoryType = this.armoryService.getInventoryType(val['inventoryType']);
            if (val['weaponInfo']) {
                item.weaponInfo.dps = Math.round(item.weaponInfo.dps);
                if (typeof item.weaponInfo.weaponSpeed != 'string') {
                    item.weaponInfo.weaponSpeed = item.weaponInfo.weaponSpeed.toFixed(2);
                }
                item.itemSubClass = this.armoryService.getWeaponType(val['itemSubClass']);
            } else {
                item.itemSubClass = this.armoryService.getItemSubClass(val['itemSubClass']);
            }

            if (val['itemSet']) {
                item.tooltipParams.set.name = val['itemSet']['name'];
            }

            if (val['itemSpells']) {
                for (let itemSpell of val['itemSpells']) {
                    if (itemSpell.spell.description != '') {
                        item.itemSpellDescription = itemSpell.spell.description;

                        if (itemSpell.trigger == 'ON_EQUIP') {
                            item.itemSpellTrigger = 'Equip'
                        }
                        else if (itemSpell.trigger == 'ON_USE') {
                            item.itemSpellTrigger = 'Use'
                        }
                    }
                }
            }

            item.maxDurability = val['maxDurability'];

            if (val['allowableClasses']) {
                for (let allowableClasses of val['allowableClasses']) {
                    if (item.allowableClasses && !item.allowableClasses.includes(this.armoryService.getClassById(allowableClasses)) ) {
                        item.allowableClasses = item.allowableClasses + ', ' + this.armoryService.getClassById(allowableClasses);
                    }
                    else {
                        item.allowableClasses = this.armoryService.getClassById(allowableClasses);
                    }
                }
            }

            item.requiredLevel = val['requiredLevel'];
            
            item.priceGold = (val['sellPrice'] / 10000).toFixed(0);
            var rest = val['sellPrice']%10000
            item.priceSilver = (rest/100).toFixed(0);
            item.priceCopper = (rest%100).toFixed(0);

            if(item['tooltipParams']['gem0']) {
                this.armoryService.getItemData(item['tooltipParams']['gem0']).then(gem => {
                    item.tooltipParams.gemIcon = gem['icon'];
                    item.tooltipParams.gemInfo = gem['gemInfo']['bonus']['name'];
                });
            }
        });

        let gearModal = this.modalCtrl.create(GearTooltipPage, { item: item });
        gearModal.present();
    }
}
