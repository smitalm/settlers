import d3 = require('lodash');  
import {Tile, TileType} from './tile' 
import {HexMapFactory} from './hexagon' 

export class BoardFactory {
    public static random(array: any[]) {
        return array[Math.floor(Math.random() * array.length)];
    }
    public static randomTiles(): Tile[] {
        var desertPlaced: boolean = false;
        var types = [TileType.BRICK, TileType.WOOD, TileType.SHEEP, TileType.WHEAT, TileType.STONE, TileType.DESERT];
        var values = [2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12];
        return _.map(HexMapFactory.hexagonMap(2), (hex) => {
            var type = BoardFactory.random(types);
            var value = values.pop();
            if (type === TileType.DESERT) {
                // remove desert tile from stack
                types.pop();
            }
            return new Tile(hex, type, value);
        });
    }
}
