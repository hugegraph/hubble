/* eslint-disable */
import _ from 'lodash';
import icons from './graph';
import {Utils} from '@antv/graphin';
import {iconsMap} from './constants';

/**
 * 基于查询结果和metaData以及设置中的styleData生成GraphData
 * @param {*} queryData
 * @param {*} metaData
 * @param {*} styleData
 * @returns
 */
const formatData = (queryData, metaData, styleData) => {
    const nodes = [];
    const edges = [];
    if (_.isEmpty(queryData) || _.isEmpty(metaData)) {
        return {nodes, edges};
    }
    for (let item of queryData?.vertices || []) {
        const {label, id} = item;
        const metaConfig = _.find(metaData.node, item => item.name === label);
        // const styleConfig = styleData.node?.[label] ?? {};
        // const customizedStyle = styleConfig?.nodes?.[label] || {};
        // const {
        //     type: customizedType,
        //     size: customizedSize,
        //     icon: customizedIcon = {},
        //     labelCfg: customizedLabelCfg = {},
        //     style: customizedNodeStyle = {},
        //     anchorPoints,
        // } = customizedStyle;
        // const {
        //     fill: customizedColor,
        //     stroke: customizedStroke,
        //     fillOpacity, lineWidth,
        //     strokeOpacity,
        // } = customizedNodeStyle;
        // const {position: labelPosition} = customizedLabelCfg;
        // const {fill: customizedLabelColor, fontSize: customizedLabelFontSize} = customizedLabelCfg.style || {};
        // const {fontSize: customizeIconFontSize, fill: iconFill} = customizedIcon;
        const {style: metaStyle = {}} = metaConfig || {};
        const {color: metaColor, display_fields = ['~id'], size = 'NORMAL'} = metaStyle;
        const metaNodeSize = ['TINY', 'SMALL', 'NORMAL', 'BIG', 'HUGE'].indexOf(size) * 10 + 10;

        // const _iconName = customizedIcon?._iconName || metaConfig?.style?.icon || '';
        // const fillColor = customizedColor || metaColor;
        // const strokeColor = customizedStroke || metaColor;
        const _iconName = metaConfig?.style?.icon || '';
        const fillColor = metaColor;

        nodes.push({
            id: item.id,
            properties: {...item.properties},
            metaConfig: _.cloneDeep(metaConfig),
            // styleConfig: _.cloneDeep(styleConfig),
            statistics: {...item.statistics},
            // type: customizedType || 'graphin-circle',
            // type: 'graphin-circle',
            label: display_fields?.map(k => (k === '~id' ? id : item.properties[k])).join('\n'),
            itemType: label,
            legendType: label,
            // size: customizedSize || metaNodeSize,
            size: metaNodeSize,
            style: {
                keyshape: {
                    ...(fillColor && fillColor !== 'empty' && {fill: fillColor}),
                    ...(fillColor && fillColor !== 'empty' && {stroke: fillColor}),
                    size: metaNodeSize,
                    // fillOpacity: fillOpacity || 0.2,
                    // lineWidth: lineWidth || 1,
                    // strokeOpacity: strokeOpacity || 1,
                },
                label: {
                    // position: labelPosition || 'bottom',
                    // position: 'bottom',
                    style: {
                        // fill: customizedLabelColor || '#343434',
                        // fill: '#343434',
                        // fontSize: customizedLabelFontSize || 12,
                        fontSize: 12,
                    },
                    value: display_fields?.map(k => (k === '~id' ? id : item.properties[k])).join('\n'),
                },
                icon: {
                    show: true,
                    text: icons[iconsMap[_iconName]] || ' ',
                    fontFamily: 'graphin',
                    // fontSize: customizeIconFontSize || 12,
                    fontSize: 12,
                    ...(fillColor && fillColor !== 'empty' && {fill: fillColor}),
                    _iconName: _iconName,
                },
            },
            // labelCfg: {
            //     position: labelPosition || 'bottom',
            //     style: {
            //         fill: customizedLabelColor || '#343434',
            //         fontSize: customizedLabelFontSize || 12,
            //     },
            // },
            // icon: {
            //     show: true,
            //     text: icons[iconsMap[_iconName]] || ' ',
            //     fontFamily: 'graphin',
            //     fontSize: customizeIconFontSize || 12,
            //     fill: iconFill,
            //     _iconName: _iconName,
            // },
            // anchorPoints: anchorPoints,
            // stateStyles: {
            //     customActive: {
            //         // shadowColor: customizedColor || metaColor,
            //         shadowBlur: 25,
            //     },
            //     addActive: {
            //         shadowColor: 'red',
            //         shadowBlur: 25,
            //     },
            //     customSelected: {
            //         // shadowColor: customizedColor || metaColor,
            //         shadowBlur: 20,
            //     },
            //     activeByLegend: {
            //         // shadowColor: customizedColor || metaColor,
            //         shadowBlur: 10,
            //     },
            //     inactiveByLegend: {},
            //     customFixed: {
            //         stroke: '#E4E5EC',
            //         lineWidth: 5,
            //     },
            // },
        });
    }
    for (let item of queryData?.edges || []) {
        const {label} = item;
        const metaConfig = _.find(metaData.edge, item => item.name === label);
        const {style = {}} = metaConfig || {};
        const {color = '#d9d9d9', display_fields = ['~id'], thickness = 'NORMAL'} = style;
        const size = ['THICK', 'NORMAL', 'FINE'].indexOf(thickness) * 0.8 + 0.8;
        // const arrowWidth = size + 5;
        // const endArrow = withArrow === false ? null : {
        //     d: -0.7,
        //     path: `M 0,0 L ${arrowWidth} ${arrowWidth / 2}  L ${arrowWidth} ${-arrowWidth / 2} Z`,
        //     fill: customizedStroke || color,
        //     lineDash: [0, 0],
        // };
        // const endArrow = {
        //     d: -0.7,
        //     path: `M 0,0 L ${arrowWidth} ${arrowWidth / 2}  L ${arrowWidth} ${-arrowWidth / 2} Z`,
        //     fill: customizedStroke || color,
        //     lineDash: [0, 0],
        // };

        // const strokeColor = customizedStroke || color;
        const strokeColor = color;

        edges.push({
            metaConfig: _.cloneDeep(metaConfig),
            id: item.id,
            source: item.source,
            target: item.target,
            // type: 'graphin-line',
            properties: {...item.properties},
            // label: display_fields?.map(k => (k === '~id' ? label : item.properties[k])).join('\n'),
            legendType: label,
            itemType: label,
            style: {
                keyshape: {
                    // lineDash: lineDash || false,
                    ...(strokeColor && strokeColor !== 'empty' && {stroke: strokeColor}),
                    // ...(strokeColor && strokeColor !== 'empty' && {fill: strokeColor}),
                    lineWidth: size,
                    // lineWidth: customizedLineWidth || size,
                    // lineAppendWidth: 20,
                    // endArrow: customizedEndArrow || endArrow,
                },
                label: {
                    value: display_fields?.map(k => (k === '~id' ? label : item.properties[k])).join('\n'),
                    // autoRotate: true,
                    fill: '#434343',
                },
            },
        });
    }
    // const processedEdges = processParallelEdges(edges || []);
    const processedEdges = Utils.processEdges(edges || [], {poly: 50, loop: 10});
    return {nodes, edges: processedEdges};
};

export default formatData;
