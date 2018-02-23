import { AllTalents } from './talents/allTalents';
import { Titles } from './titles';
import { Talents } from './talents/talents';
import { Stats } from './stats';
import { Pets } from './collections/pets/pets';
import { PetSlots } from './collections/pets/petSlots';
import { Items } from './items/items';
import { Mounts } from './collections/mounts/mounts';
import { Guild } from './guild';
import { Serializable } from './../interfaces/serializable';
import { mergeDeep } from './helpers/object.helpers';


export class Character implements Serializable<Character> {
    achievementPoints: number;
    allTalents: AllTalents[];
    battlegroup: string;
    class: string;
    classId: number;
    faction: number;
    gender: number;
    guild: Guild;
    items: Items;
    level: number;
    mounts: Mounts;
    name: string;
    petSlots: PetSlots[];
    pets: Pets;
    race: number;
    realm: string;
    spec: string;
    stats: Stats;
    talents: Talents[];
    thumbnail: string;
    titles: Titles[];
    totalHonorableKills: number;

    deserialize(input: Object) {
        mergeDeep(this, input);
        return this;
    }
}