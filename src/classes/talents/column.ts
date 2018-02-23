export class Column {
    column: number;
    spec?: {
        backgroundImage: string;
        description: string;
        icon: string;
        name: string;
        order: number;
        role: string;
    };
    spell: {
        castTime: string;
        description: string;
        icon: string;
        id: number;
        name: string;
        range?: string;
    };
    tier: number;
}