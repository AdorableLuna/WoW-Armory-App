export class Collected {
    battlePetGuid: string;
    canBattle: boolean;
    creatureId: number;
    creatureName: string;
    displayId: number;
    icon: string;
    isFavorite: boolean;
    isFirstAbilitySlotSelected: boolean;
    isSecondAbilitySlotSelected: boolean;
    isThirdAbilitySlotSelected: boolean;
    itemId: number;
    name: string;
    qualityId: number;
    spellId: number;
    stats: {
        breedId: number;
        health: number;
        level: number;
        petQualityId: number;
        power: number;
        speciesId: number;
        speed: number;
    }
}