import {Hex} from '../services/hexagon';

export enum TileType {
    WOOD, BRICK, WHEAT, SHEEP, STONE, DESERT
}

export class Tile {
    constructor(public hex: Hex, public type: TileType, public value: number) { }

    getClass() {
        switch (this.type) {
            case TileType.WOOD:
                return 'wood';
            case TileType.DESERT:
                return 'desert';
            case TileType.BRICK:
                return 'brick';
            case TileType.STONE:
                return 'stone';
            case TileType.WHEAT:
                return 'wheat';
            case TileType.SHEEP:
                return 'sheep';
        }
    }
}
