export class Item {
    appearance: Object;
    armor: number;
    artifactAppearanceId: number;
    artifactId: number;
    artifactTraits: Array<any>;
    bonusLists: Array<any>;
    context: string;
    displayInfoId: number;
    icon: string;
    id: number;
    itemLevel: number;
    name: string;
    quality: number;
    relics: Array<any>;
    stats: Array<any>;
    tooltipParams: Object;
    weaponInfo?: {
        damage: {
            exactMax: number;
            exactMin: number;
            max: number;
            min: number;
        };
        dps: number;
        weaponSpeed: number;
    }
}