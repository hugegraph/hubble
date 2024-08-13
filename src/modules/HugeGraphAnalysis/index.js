/* eslint-disable */
import React, {useState, useEffect, useCallback, createRef} from 'react';
import {Row, Col} from 'antd';
import backIcon from '../../assets/canvas_bg.png';
import Graphin, {Behaviors, Utils as gUtils, Components} from '@antv/graphin';
import screenfull from 'screenfull';
import Empty from '../../componets/Empty';
import MiniMap from '../../componets/MiniMap';
import Topbar from '../../componets/Topbar';
import ClickBehavior from '../../componets/ClickBehavior';
import UndoRedoBehavior from '../../componets/UndoRedoBehavior';
import Tooltip from '../../componets/Tooltip';
import ContextMenu from '../../componets/ContextMenu';
import LegendEdge from '../../componets/LegendEdge';
import LegendNode from '../../componets/LegendNode';
import Utils from '../../utils';
import _ from 'lodash';
import style from './index.module.scss';

const GraphAnalysis = ({
    data,
    reset,
    onExpand,
    onClear,
    // onRefresh,
    emptyText,
    contextMenu,
    meta
}) => {
    // const datas = gUtils.mock(10).circle().graphin();
    // console.log(datas);
    // const [data, setData] = React.useState({nodes: [], edges: []});
    const [lock, setLock] = useState(true);
    const [redoEnable, setRedoEnable] = useState(false);
    const [undoEnable, setUndoEnable] = useState(false);
    const [graphData, setGraphData] = useState({nodes: [], edges: []});
    const [styleData, setStyleData] = useState({node: {}, edge: {}});
    const [redraw, setRedraw] = useState(false);
    const [item, setItem] = useState(null);
    const [layout, setLayout] = useState({type: 'graphin-force'});
    const graphinRef = createRef();
    const {ClickSelect, Hoverable, DragNode, ActivateRelations, BrushSelect} = Behaviors;
    const {Legend} = Components;

    const handleLock = useCallback(() => {
        setLock(l => {
            graphinRef.current.graph.setMode(l ? 'unlock' : 'default');
            return !l;
        });
    }, [graphinRef]);

    const handleDownload = useCallback((filename, type) => {
        if (type === 'png') {
            graphinRef.current.graph.downloadFullImage(filename, 'image/png', {backgroundColor: '#FFF', padding: 30});
        }

        if (type === 'json') {
            Utils.downloadJson(filename, data);
        }
    }, [graphinRef, data]);

    const handleLayout = useCallback(val => {
        setLayout(val);
    }, []);

    const handleClear = useCallback(() => {
        onClear && onClear();
        graphinRef.current.graph.pushStack('changedata', {before: data, after: {nodes: [], edges: []}}, 'undo');
        graphinRef.current.graph.clear();
    }, [graphinRef, onClear, data]);

    const handlePin = useCallback(() => {
        if (!item || item.getType() !== 'node') {
            return;
        }
        Utils.node.pin(graphinRef.current.graph, item);
    }, [item, graphinRef]);

    const handleRefresh = useCallback(() => {
        // graphinRef.current.graph.destroyLayout();
        // onRefresh && onRefresh();
        graphinRef.current.graph.updateLayout(layout);
    }, [graphinRef, layout]);

    const handleFullScreen = useCallback(() => {
        const container = graphinRef.current.graph?.getContainer();
        if (screenfull.isEnabled) {
            if (screenfull.isFullscreen) {
                screenfull.exit();
            }
            else {
                screenfull.request(container);
            }
        }
    }, [graphinRef]);

    const handleUndoRedo = useCallback((undoStack, redoStack) => {
        // console.log(undoStack, undoStack.length !== 0, redoStack, redoStack.length !== 0);
        // undo 不可用
        setUndoEnable(undoStack.length !== 0);
    
        // redo 不可用
        setRedoEnable(redoStack.length !== 0);
    }, []);

    const handleStyleSetting = useCallback((type, label, style) => {
        setStyleData(d => {
            d[type][label] = style;
            return d;
        });
        setRedraw(r => !r);
    }, []);

    useEffect(() => {
        setGraphData(_.cloneDeep(Utils.styleData(data, styleData)));
    }, [data, redraw]);

    const defaultNode = {

        type: 'graphin-circle',
        style: {
          keyshape: {
            fill: '#873bf4',
            // stroke: '#FF6A00',
            fillOpacity: 0.1,
            size: 26,
          },
        },
    };


    // const UpdateNode = props => {
    //     const { setData, data, styleData } = props;
    //     React.useEffect(() => {
    //         console.log('update node');
    //         setData({...Utils.styleData(data, styleData)});
    //     }, [setData, data, styleData]);
    //     return null;
    //   };

    return (
        <>
            <Graphin
                data={graphData}
                layout={layout}
                style={{backgroundImage: `url(${backIcon})`}}
                modes={{
                    default: ['drag-canvas', 'drag-node'],
                    unlock: ['drag-canvas', 'zoom-canvas', 'drag-node', 'click-select'],
                }}
                ref={graphinRef}
                // nodeStateStyles={defaultNodeStatusStyle}
                // edgeStateStyles={defaultEdgeStatusStyle}
                defaultNode={defaultNode}
                enabledStack
                fitView
                containerStyle={{paddingTop: 32}}
            >
                {/* <UpdateNode data={graphData} setData={setGraphData} styleData={styleData} /> */}
                <Topbar
                    onDownload={handleDownload}
                    onLayout={handleLayout}
                    onStyleSetting={handleStyleSetting}
                    onClear={handleClear}
                    onRefresh={handleRefresh}
                    onPin={handlePin}
                    onFullScreen={handleFullScreen}
                    undoEnable={undoEnable}
                    redoEnable={redoEnable}
                />
                <ClickSelect
                    selectEdge
                    selectNode
                />
                <Hoverable bindType="edge" />
                <Hoverable bindType="node" />
                <MiniMap handleLock={handleLock} lock={lock} />
                <DragNode />
                <Tooltip placement='right' bindType={'node'} />
                <Tooltip placement='auto' bindType={'edge'} />
                <ContextMenu onExpand={onExpand} menu={contextMenu} />
                <ClickBehavior />
                <UndoRedoBehavior onChange={handleUndoRedo} reset={reset} />
                <ActivateRelations trigger="click" />
                <BrushSelect />
                <Legend
                    bindType="node"
                    sortKey="legendType"
                    style={{top: 'auto', bottom: 30, left: 10}}
                >
                    {(renderProps) => {
                        // return <Legend.Node {...renderProps} onChange={() => {}} />;
                        return <span className={style.node}><LegendNode {...renderProps} onChange={() => {}} /></span>;
                    }}
                </Legend>
                <Legend
                    bindType="edge"
                    sortKey="legendType"
                    style={{top: 'auto', bottom: 10, left: 10}}
                >
                    {(renderProps) => {
                        return <span className={style.edge}><LegendEdge {...renderProps} onChange={() => {}} /></span>;
                    }}
                </Legend>
                <Row className={style.number_card} justify={'end'} gutter={[24, 24]}>
                    <Col>
                        <div className={style.number_card_title}>Nodes</div>
                        <div className={style.number_card_content}>{data.nodes.length}</div>
                    </Col>
                    <Col>
                        <div className={style.number_card_title}>Edges</div>
                        <div className={style.number_card_content}>{data.edges.length}</div>
                    </Col>
                </Row>
                {graphData.nodes.length === 0 && (
                    <div className={style.empty_container}>
                        {emptyText || <Empty />}
                    </div>
                )}
            </Graphin>
        </>
    );
};

export default GraphAnalysis;
