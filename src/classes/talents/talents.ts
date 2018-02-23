import { Talent } from './talent';

export class Talents {
    calcSpec: string;
    calcTalent: string;
    selected?: boolean;
    spec: {
        backgroundImage: string;
        description: string;
        icon: string;
        name: string;
        order: number;
        role: string;
    };
    talents: Talent[];
}