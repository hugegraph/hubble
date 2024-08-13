/* eslint-disable */

import React, {useContext, useCallback} from 'react';
import {GraphinContext} from '@antv/graphin';
import {Button, Tooltip} from 'antd';
import {OneToOneOutlined} from '@ant-design/icons';

const fitSize = graph => {
    const padding = [50, 50, 50, 50];
    const width = graph.get('width');
    const height = graph.get('height');
    const group = graph.get('group');
    group.resetMatrix();
    const bbox = group.getCanvasBBox();

    if (bbox.width === 0 || bbox.height === 0) {
        return;
    }
    const viewCenter = {
        x: (width - padding[1] - padding[3]) / 2 + padding[3],
        y: (height - padding[0] - padding[2]) / 2 + padding[0],
    };

    const groupCenter = {
        x: bbox.x + bbox.width / 2,
        y: bbox.y + bbox.height / 2,
    };

    const w = (width - padding[1] - padding[3]) / bbox.width;
    const h = (height - padding[0] - padding[2]) / bbox.height;
    graph.translate(viewCenter.x - groupCenter.x, viewCenter.y - groupCenter.y);
    // w与h是画布宽高和图宽高的比，横向和纵向有一个小于1就需要做transform操作；
    if (w < 1 || h < 1) {
        let ratio = w;
        if (w > h) {
            ratio = h;
        }
        if (!graph.zoom(ratio, viewCenter)) {
            console.warn('zoom failed, ratio out of range, ratio: %f', ratio);
        }
    }
};

// 定义 FitView 组件
const FitView = () => {
    const {graph} = useContext(GraphinContext);

    const handleFitCenter = useCallback(() => {
        if (graph) {
            graph.fitCenter();
            fitSize(graph);
        }
    }, [graph]);

    return (
        // 组件的 JSX 结构
        <Tooltip title="自适应" placement='bottom'>
            <OneToOneOutlined onClick={handleFitCenter} />
        </Tooltip>
    );
};

// 导出 FitView 组件
export default FitView;
