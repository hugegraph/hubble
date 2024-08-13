/* eslint-disable */
import {
    SyncOutlined, PushpinOutlined, ArrowLeftOutlined, ArrowRightOutlined,
    CopyrightOutlined, ZoomOutOutlined, ZoomInOutlined, CompressOutlined,
} from '@ant-design/icons';
import {Popconfirm, Tooltip} from 'antd';
import React, {useCallback, useContext, useState, useEffect} from 'react';
import {GraphinContext} from '@antv/graphin';
import Download from './components/Download';
import Layout from './components/Layout';
import FitView from './components/FitView';
import StyleSetting from './components/StyleSetting';
import Utils from '../../utils';
import style from './index.module.scss';

const Topbar = ({
    onDownload,
    onLayout,
    onStyleSetting,
    onClear,
    onRefresh,
    redoEnable,
    undoEnable,
    onFullScreen,
}) => {
    const {graph} = useContext(GraphinContext);
    const [activeNode, setActiveNode] = useState(null);

    const handleClear = useCallback(() => {
        onClear && onClear();
    }, [onClear]);

    const handleRefresh = useCallback(() => {
        onRefresh && onRefresh();
    }, [onRefresh]);

    const handleUndo = useCallback(() => {
        Utils.undoRedo.undo(graph);
    }, [graph]);

    const handleRedo = useCallback(() => {
        Utils.undoRedo.redo(graph);
    }, [graph]);

    const handleZoomIn = useCallback(() => {
        graph.zoomTo(graph.getZoom() + 0.05, graph.getViewPortCenterPoint(), true);
    }, [graph]);

    const handleZoomOut = useCallback(() => {
        graph.zoomTo(graph.getZoom() - 0.05, graph.getViewPortCenterPoint(), true);
    }, [graph]);

    const handlePin = useCallback(() => {
        if (activeNode) {
            Utils.node.pin(graph, activeNode);
        }
    }, [activeNode, graph]);


    useEffect(() => {
        const handleClick = evt => {
            const node = evt.item;
            // const model = node.getModel();
            setActiveNode(node);
            // console.log(node.hasLocked());
        };

        const handleClickBlank = evt => {
            setActiveNode(null);
        };

        graph.on('node:click', handleClick);
        graph.on('edge:click', handleClickBlank);
        graph.on('canvas:click', handleClickBlank);

        return () => {
            graph.off('node:click', handleClick);
            graph.off('edge:click', handleClickBlank);
            graph.off('canvas:click', handleClickBlank);
        };
    }, [graph]);

    return (
        <div className={style.topbar}>
            <div className={style.col}>
                <div className={style.space}>
                    <Tooltip title='刷新布局' placement='bottom'>
                        {/* <span onClick={onRefresh}><SyncOutlined /></span> */}
                        <span>
                            <Popconfirm
                                title="确定刷新布局？"
                                placement="bottomLeft"
                                onConfirm={handleRefresh}
                                cancelText='取消'
                                okText='确定'
                            >
                                <SyncOutlined />
                            </Popconfirm>
                        </span>
                    </Tooltip>
                    <Tooltip title='固定所选中的顶点' placement='bottom'>
                        <span onClick={handlePin}>
                            <PushpinOutlined />
                        </span>
                    </Tooltip>
                    <Tooltip title='后退' placement='bottom'>
                        <span onClick={handleUndo} className={undoEnable ? null : style.disable}><ArrowLeftOutlined /></span>
                    </Tooltip>
                    <Tooltip title='前进' placement='bottom'>
                        <span onClick={handleRedo} className={redoEnable ? null : style.disable}><ArrowRightOutlined /></span>
                    </Tooltip>
                    <Tooltip title='清空画布' placement='bottom'>
                        <span>
                            <Popconfirm
                                title="确定清空画布？"
                                placement="bottomLeft"
                                onConfirm={handleClear}
                                cancelText='取消'
                                okText='确定'
                            >
                                <CopyrightOutlined />
                            </Popconfirm>
                        </span>
                    </Tooltip>
                    <FitView />
                    <Tooltip title='缩小' placement='bottom'><ZoomOutOutlined onClick={handleZoomOut} /></Tooltip>
                    <Tooltip title='放大' placement='bottom'><ZoomInOutlined onClick={handleZoomIn} /></Tooltip>
                    <Tooltip title='全屏' placement='bottomRight'>
                        <span onClick={onFullScreen}><CompressOutlined /></span>
                    </Tooltip>
                </div>
            </div>
            <div className={style.col}>
                <div className={style.space}>
                    {/* <span className={style.disable}><SettingOutlined />外观设置</span> */}
                    <StyleSetting onClick={onStyleSetting} />
                    <Layout onClick={onLayout} />
                    {/* <span className={style.disable}><LayoutOutlined />画布设置</span> */}
                    <Download onDownload={onDownload} />
                </div>
            </div>
        </div>
    );
};

export default Topbar;
