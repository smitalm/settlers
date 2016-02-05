import {Component, ElementRef, ViewEncapsulation, Input} from 'angular2/core';
var d3 = require('d3');
var _ = require('lodash');
import {BoardFactory} from './services/boardFactory';
import * as hexagon from './services/hexagon';
import {Tile, TileType} from './services/tile';
import {SvgHelpers} from './svgHelpers';



@Component({
    selector: 'board',
    providers: [ElementRef],
    template: '<div class="board-content"></div>',
    styles: [ require('./board.css') ],
    encapsulation: ViewEncapsulation.None
})
export class BoardCmp {
    @Input() svgWidth: number = 500;
    @Input() svgHeight: number = 500;
    @Input() tileRadius: number = 50;
    elementRef: ElementRef;
    tiles: Tile[];
    layout: hexagon.Layout;

    constructor(elementRef: ElementRef) {
        this.elementRef = elementRef;
        this.layout = new hexagon.Layout(
            hexagon.Layout.pointy,
            new hexagon.Point(this.tileRadius, this.tileRadius),
            new hexagon.Point(this.svgWidth / 2, this.svgHeight / 2)
        );
        this.tiles = BoardFactory.randomTiles();
    }

    ngAfterViewInit() {
        var svg = d3.select(this.elementRef.nativeElement)
            .select('.board-content')
            .append('svg')
            .attr('width', this.svgWidth)
            .attr('height', this.svgHeight);

        SvgHelpers.dropShadowFilter(svg, 2);

        var tileElement = svg.append('g')
            .style('filter', 'url(#drop-shadow)')
            .selectAll('.hexagon')
            .data(this.tiles)
            .enter()
            .append('g')
            .attr('class', (tile) => 'tile ' + tile.type)
            .attr('transform', (tile) => {
                var center = hexagon.Layout.hexToPixel(this.layout, tile.hex);
                return 'translate(' + center.x + ',' + center.y + ')';
            });
        tileElement.append('polygon')
            .attr('class', 'hexagon')
            .attr('points', (tile) => hexagon.Layout.polygonCorners(this.layout, tile.hex).join('\n'))
            .on('mouseup', (tile) => console.log(tile));
        tileElement.append('text')
            .text((tile) => tile.value)
            .style('font-size', 26)
            .attr('alignment-baseline', 'middle')
            .attr('text-anchor', 'middle');
    }
}
