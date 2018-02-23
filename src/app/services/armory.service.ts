import { Character } from './../../classes/character';
import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx'

@Injectable()
export class ArmoryService {
    private baseUrl: string;
    private access_token: string;
    private api_key: string;

    public standardData: any;
    public character: Character;

    constructor(
        private http: HttpClient
    ) {
        this.baseUrl = 'https://eu.api.battle.net/wow/'
        this.access_token = localStorage.getItem('access_token')
        this.api_key = 'e4yc2z5sh6fbqbst26yxpvt73yek569m'
    }

    getCharacters() {
        return this.http.get(this.baseUrl + 'user/characters?access_token=kmeb5k45vn3nzg3jajmd6jzs');// + this.access_token);
    }

    getCharacterData(realm, character, fields) {
        return new Promise((resolve, reject) => {
            this.http.get(this.baseUrl + `character/${realm}/${character}?fields=${fields}&locale=en_GB&apikey=${this.api_key}`)
            .subscribe(val => {

                if (val['titles']) {
                    for (var title in val['titles']) {
                        if (val['titles'][title]['selected']) {
                            if (val['titles'][title]['name'].includes('%s, ')) {
                                val['titles'][title]['name'] = val['titles'][title]['name'].replace('%s, ', '');
                            }
                            else if (val['titles'][title]['name'].includes('%s ')) {
                                val['titles'][title]['name'] = val['titles'][title]['name'].replace('%s ', '');
                            }
                            else if (val['titles'][title]['name'].includes(' %s')) {
                                val['titles'][title]['name'] = val['titles'][title]['name'].replace(' %s', '');
                            }
                            break;
                        }
                    }
                }

                val['classId'] = val['class'];
                val['class'] = this.getClassById(val['class']);

                if (val['talents']) {
                    for (var spec in val['talents']) {
                        if (val['talents'][spec]['selected']) {
                            val['spec'] = val['talents'][spec]['spec']['name'];
                            break;
                        }
                    }
                }
                
                resolve(val);
            }, err => {
                reject(err);
            });
        })
    }

    getItemData(itemid) {
        return new Promise((resolve, reject) => {
            this.http.get(this.baseUrl + `item/${itemid}?locale=en_GB&apikey=${this.api_key}`)
            .subscribe(val => {
                resolve(val);
            }, err => {
                reject(err);
            });
        })
    }

    getResourcesData(resource) {
        return new Promise((resolve, reject) => {
            this.http.get(this.baseUrl + `data/${resource}?locale=en_GB&apikey=${this.api_key}`)
            .subscribe(val => {
                resolve(val);
            }, err => {
                reject(err);
            });
        })
    }

    getBattlePetSpeciesData(speciesId) {
        return new Promise((resolve, reject) => {
            this.http.get(this.baseUrl + `pet/species/${speciesId}?locale=en_GB&apikey=${this.api_key}`)
            .subscribe(val => {
                resolve(val);
            }, err => {
                reject(err);
            });
        })
    }

    getPetsGithub() {
        return new Promise((resolve, reject) => {
            this.http.get('https://gist.githubusercontent.com/erorus/3182fd9f0ccf90772f3edd8886d84ffb/raw/cd49e25e14e99989543ac6dab44e1c0e460e2c37/pets.json')
            .subscribe(val => {
                resolve(val['pets']);
            }, err => {
                reject(err);
            });
        })
    }

    getClassById(classId) {
        switch (classId) {
            case 1:
                return 'Warrior';
            case 2:
                return 'Paladin';
            case 3:
                return 'Hunter';
            case 4:
                return 'Rogue';
            case 5:
                return 'Priest';
            case 6:
                return 'Death Knight';
            case 7:
                return 'Shaman';
            case 8:
                return 'Mage';
            case 9:
                return 'Warlock';
            case 10:
                return 'Monk';
            case 11:
                return 'Druid';
            case 12:
                return 'Demon Hunter';
        }
    }

    getQuality(qualityId) {
        switch(qualityId) {
            case 0:
                return '#9d9d9d';
            case 1:
                return '#fff';
            case 2:
                return '#1eff00';
            case 3:
                return '#0081ff';
            case 4:
                return '#c600ff';
            case 5:
                return '#ff8000';
            case 6:
                return '#e5cc80';
            case 7:
                return '#0cf';
        }
    }

    getItemSubClass(itemSubClass) {
        switch (itemSubClass) {
            case 0:
                return 'Miscellaneous';
            case 1:
                return 'Cloth';
            case 2:
                return 'Leather';
            case 3:
                return 'Mail';
            case 4:
                return 'Plate';
        }
    }

    getWeaponType(itemSubClass) {
        switch (itemSubClass) {
            case 0:
                return 'Axe';
            case 2:
                return 'Bow';
            case 3:
                return 'Gun';
            case 5:
                return 'Mace';
            case 6:
                return 'Polearm';
            case 8:
                return 'Sword';
            case 9:
                return 'Warglaive';
            case 10:
                return 'Staff';
            case 13:
                return 'Fist Weapon';
            case 15:
                return 'Dagger';
            case 18:
                return 'Crossbow';
            case 19:
                return 'Wand';
            case 20:
                return 'Fishing Pole';
        }
    }

    getInventoryType(inventoryType) {
        switch (inventoryType) {
            case 1:
                return 'Head';
            case 2:
                return 'Neck';
            case 3:
                return 'Shoulder';
            case 4:
                return 'Shirt';
            case 5:
                return 'Chest';
            case 6:
                return 'Waist';
            case 7:
                return 'Legs';
            case 8:
                return 'Feet';
            case 9:
                return 'Wrist';
            case 10:
                return 'Hands';
            case 11:
                return 'Finger';
            case 12:
                return 'Trinket';
            case 13:
                return 'One-Hand';
            case 14:
                return 'Shield';
            case 15:
                return 'Ranged';
            case 16:
                return 'Back';
            case 17:
                return 'Two-Hand';
        }
    }
}