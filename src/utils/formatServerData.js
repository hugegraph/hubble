/* eslint-disable */
import _ from 'lodash';
import icons, {processParallelEdges} from './graph';
import {iconsMap} from './constants';

/**
 * 基于查询结果和metaData以及设置中的styleData生成GraphData
 * @param {*} queryData
 * @param {*} metaData
 * @param {*} styleData
 * @returns
 */
const formatToGraphData = (originData, styleConfig) => {
    const nodes = [];
    const edges = [];
    const nodeMap = {};
    const edgeMap = {};

    if (_.isEmpty(originData)) {
        return {nodes, edges};
    }

    originData.map(item => {
        item.objects.map(i => {
            if (i.type === 'vertex') {
                nodeMap[i.id] = i;
            }

            if (i.type === 'edge') {
                edgeMap[i.id] = {...i, source: i.inV, target: i.outV};
            }
        });
    });

    for (let item of Object.values(nodeMap) || []) {
        const {label, id} = item;
        const metaConfig = {};
        // const metaConfig = _.find(metaData.vertexMeta, item => item.name === label);
        const customizedStyle = styleConfig?.nodes?.[label] || {};
        const {
            type: customizedType,
            size: customizedSize,
            icon: customizedIcon = {},
            labelCfg: customizedLabelCfg = {},
            style: customizedNodeStyle = {},
            anchorPoints,
        } = customizedStyle;
        const {
            fill: customizedColor,
            stroke: customizedStroke,
            fillOpacity, lineWidth,
            strokeOpacity,
        } = customizedNodeStyle;
        const {position: labelPosition} = customizedLabelCfg;
        const {fill: customizedLabelColor, fontSize: customizedLabelFontSize} = customizedLabelCfg.style || {};
        const {fontSize: customizeIconFontSize, _iconName, fill: iconFill} = customizedIcon;
        const {style: metaStyle = {}} = metaConfig || {};
        const {color: metaColor = '#5c73e6', display_fields = ['~id'], size = 'NORMAL'} = metaStyle;
        const metaNodeSize = ['TINY', 'SMALL', 'NORMAL', 'BIG', 'HUGE'].indexOf(size) * 10 + 10;
        nodes.push({
            id: item.id,
            properties: {...item.properties},
            metaConfig: _.cloneDeep(metaConfig),
            statistics: {...item.statistics},
            type: customizedType || 'graphin-circle',
            label: display_fields?.map(k => (k === '~id' ? id : item.properties[k])).join('\n'),
            itemType: label,
            legendType: label,
            size: customizedSize || metaNodeSize,
            style: {
                fill: customizedColor || metaColor,
                stroke: customizedStroke || metaColor,
                lineWidth: lineWidth || 1,
                fillOpacity: fillOpacity || 0.4,
                strokeOpacity: strokeOpacity || 1,
                
            },
            labelCfg: {
                position: labelPosition || 'bottom',
                style: {
                    fill: customizedLabelColor || '#343434',
                    fontSize: customizedLabelFontSize || 12,
                },
            },
            icon: {
                show: true,
                text: icons[iconsMap[_iconName]] || ' ',
                fontFamily: 'graphin',
                fontSize: customizeIconFontSize || 12,
                fill: iconFill,
                _iconName: _iconName,
            },
            anchorPoints: anchorPoints,
            stateStyles: {
                customActive: {
                    shadowColor: customizedColor || metaColor,
                    shadowBlur: 25,
                },
                addActive: {
                    shadowColor: 'red',
                    shadowBlur: 25,
                },
                customSelected: {
                    shadowColor: customizedColor || metaColor,
                    shadowBlur: 20,
                },
                activeByLegend: {
                    shadowColor: customizedColor || metaColor,
                    shadowBlur: 10,
                },
                inactiveByLegend: {},
                customFixed: {
                    stroke: '#E4E5EC',
                    lineWidth: 5,
                },
            },
        });
    }
    for (let item of Object.values(edgeMap) || []) {
        const {label} = item;
        const customizedStyle = styleConfig?.edges?.[label] || {};
        // const metaConfig = _.find(metaData.edgeMeta, item => item.name === label);
        const metaConfig = {};
        const {
            type: customizedType,
            labelCfg: customizedLabelCfg = {},
            style: customizedEdgeStyle = {},
        } = customizedStyle;
        const {
            stroke: customizedStroke,
            lineWidth: customizedLineWidth,
            endArrow: customizedEndArrow,
            lineDash,
        } = customizedEdgeStyle;
        const {style = {}} = metaConfig || {};
        const {color = '#5c73e6', display_fields = ['~id'], thickness = 'NORMAL', with_arrow: withArrow} = style;
        const size = ['THICK', 'NORMAL', 'FINE'].indexOf(thickness) * 0.8 + 0.8;
        const arrowWidth = size + 5;
        const endArrow = withArrow ? {
            d: -0.7,
            path: `M 0,0 L ${arrowWidth} ${arrowWidth / 2}  L ${arrowWidth} ${-arrowWidth / 2} Z`,
            fill: customizedStroke || color,
            lineDash: [0, 0],
        } : null;
        edges.push({
            metaConfig: _.cloneDeep(metaConfig),
            id: item.id,
            source: item.source,
            target: item.target,
            type: customizedType || 'graphin-line',
            properties: {...item.properties},
            label: display_fields?.map(k => (k === '~id' ? label : item.properties[k])).join('\n'),
            legendType: label,
            itemType: label,
            style: {
                lineDash: lineDash || false,
                stroke: customizedStroke || color,
                lineWidth: customizedLineWidth || size,
                lineAppendWidth: 20,
                endArrow: customizedEndArrow || endArrow,
            },
            labelCfg: {
                autoRotate: true,
                style: {
                    fill: '#000',
                    fontSize: 12,
                    background: {
                        fill: '#ffffff',
                        padding: [2, 2, 2, 2],
                        radius: 2,
                    },
                    ...customizedLabelCfg.style,
                },
            },
            loopCfg: {
                position: 'top',
                dist: 40,
                clockwise: true,
            },
            stateStyles: {
                edgeActive: {
                    shadowColor: color,
                    shadowBlur: 10,
                    'text-shape': {
                        fontWeight: 'bold',
                    },
                },
                addActive: {
                    lineWidth: size + 2,
                    shadowColor: color,
                    shadowBlur: 10,
                    'text-shape': {
                        fontWeight: 'bold',
                    },
                },
                edgeSelected: {
                    shadowColor: color,
                    shadowBlur: 10,
                    'text-shape': {
                        fontWeight: 'bold',
                    },
                },
                activeByLegend: {
                    shadowColor: color,
                    shadowBlur: 8,
                },
                inactiveByLegend: {
                    opacity: 0.5,
                },
            },
        });
    }
    const processedEdges = processParallelEdges(edges || []);
    return {nodes, edges: processedEdges};
};

export default formatToGraphData;
