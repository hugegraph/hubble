/* eslint-disable */

import React, {useCallback, useContext} from 'react';
import {GraphinContext} from '@antv/graphin';
import {Dropdown} from 'antd';
import {ReactSVG} from 'react-svg';
import {
    LayoutOutlined,
} from '@ant-design/icons';
import ForceLayoutIcon from './assets/layout_force.svg';
import ConcentricLayoutIcon from './assets/layout_concentric.svg';
import DagreLayoutIcon from './assets/layout_dagre.svg';
import CircularLayoutIcon from './assets/layout_circular.svg';
import GridLayoutIcon from './assets/layout_grid.svg';
import RadialLayoutIcon from './assets/layout_radial.svg';

export default ({onClick}) => {
    // const layoutConfig = {
    //     force: {
    //         nodeSize: 80,
    //         linkDistance: 100,
    //         nodeStrength: 300,
    //         preventOverlap: true,
    //         nodeSpacing: 15,
    //     },
    //     circular: {
    //         startRadius: 200,
    //         endRadius: 200,
    //         divisions: 1,
    //         angleRatio: 1,
    //         clockwise: true,
    //         ordering: null,
    //     },
    //     concentric: {
    //         nodeSize: 30,
    //         preventOverlap: true,
    //         startAngle: 5,
    //         nodeSpacing: 70,
    //         equidistant: false,
    //         clockwise: false,
    //     },
    //     dagre: {
    //         rankdir: 'TB',
    //         align: 'DL',
    //         ranksep: 50,
    //         nodesep: 50,
    //     },
    //     radial: {
    //         unitRadius: 100,
    //         linkDistance: 50,
    //         nodeSize: 80,
    //         focusNode: '',
    //         nodeSpacing: 80,
    //         preventOverlap: true,
    //         strictRadial: true,
    //     },
    // };

    const items = [
        {
            key: 'graphin-force',
            label: '力导布局',
            options: null,
            icon: <ReactSVG src={ForceLayoutIcon} beforeInjection={(svg) => svg.setAttribute('style', 'width: 12px;height: 12px;')} />,
        },
        {
            key: 'circular',
            label: '环形布局',
            // options: {
            //     startRadius: 200,
            //     endRadius: 200,
            //     divisions: 1,
            //     angleRatio: 1,
            //     clockwise: true,
            //     ordering: null,
            // },
            options: undefined,
            icon: <ReactSVG src={CircularLayoutIcon} beforeInjection={(svg) => svg.setAttribute('style', 'width: 12px;height: 12px;')} />,
        },
        {
            key: 'concentric',
            label: '同心圆布局',
            options: {
                nodeSize: 50,
                minNodeSpacing: 10,
                preventOverlap: true,
                sweep: undefined,
                equidistant: false,
                startAngle: (3 / 2) * Math.PI,
                clockwise: false,
                sortBy: 'degree',
            },
            icon: <ReactSVG src={ConcentricLayoutIcon} beforeInjection={(svg) => svg.setAttribute('style', 'width: 12px;height: 12px;')} />,
        },
        {
            key: 'dagre',
            options: {
                rankdir: 'TB',
                align: undefined,
                nodeSize: 0,
                nodesep: 10,
                ranksep: 10,
            },
            label: '层次布局',
            icon: <ReactSVG src={DagreLayoutIcon} beforeInjection={(svg) => svg.setAttribute('style', 'width: 12px;height: 12px;')} />,
        },
        {
            key: 'grid',
            options: {
                width: 200,
                height: 200,
                preventOverlap: true,
                preventOverlapPadding: 10,
                condense: false,
                row: 10,
                cols: 10,
                sortBy: null,
            },
            icon: <ReactSVG src={GridLayoutIcon} beforeInjection={(svg) => svg.setAttribute('style', 'width: 12px;height: 12px;')} />,
            label: '网格布局',
        },
        {
            key: 'radial',
            options: {
                unitRadius: 100,
                linkDistance: 50,
                nodeSize: 80,
                focusNode: '',
                nodeSpacing: 80,
                preventOverlap: true,
                strictRadial: true,
            },
            label: '辐射布局',
            icon: <ReactSVG src={RadialLayoutIcon} beforeInjection={(svg) => svg.setAttribute('style', 'width: 12px;height: 12px;')} />,
        },
    ];

    const handleClick = useCallback(val => {
        onClick && onClick({type: val.key});
    }, [onClick]);

    return (
        // <Dropdown overlay={exportMenu} placement="bottomLeft">
        <Dropdown menu={{items, onClick: handleClick}} placement="bottomLeft">
            <span><LayoutOutlined />布局方式</span>
        </Dropdown>
    );
}
