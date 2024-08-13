/* eslint-disable */
import React, {useState, useCallback, useContext, useEffect} from 'react';
import {Row, Col, Space, Button, Input} from 'antd';
import {Components, GraphinContext} from '@antv/graphin';
import {
    MinusOutlined, PlusOutlined, LockOutlined, UnlockOutlined} from '@ant-design/icons';
import _ from 'lodash';
import style from './index.module.scss';

const MiniMap = ({handleLock, lock}) => {
    const {graph: g6} = useContext(GraphinContext);
    const [zoomVal, setZoomVal] = useState(g6.getZoom());

    const handleZoomIn = useCallback(() => {
        // setZoomVal(val => {
        //     const goal = Math.max(val - 0.05, 0);
        //     g6.zoomTo(goal, g6.getViewPortCenterPoint(), true);
        //     return goal;
        // });
        const val = g6.getZoom();
        const goal = Math.max(val - 0.05, 0);
        g6.zoomTo(goal, g6.getViewPortCenterPoint(), true);
    }, [g6]);

    const handleZoomOut = useCallback(() => {
        // setZoomVal(val => {
        //     const goal = val + 0.05;
        //     g6.zoomTo(goal, g6.getViewPortCenterPoint(), true);
        //     return goal;
        // });

        const val = g6.getZoom();
        const goal = val + 0.05;
        g6.zoomTo(goal, g6.getViewPortCenterPoint(), true);
    }, [g6]);

    const handleZoom = useCallback(() => {
        g6.zoomTo(zoomVal, g6.getViewPortCenterPoint(), true);
    }, [g6, zoomVal]);

    const handleZoomVal = useCallback(e => {
        const val = Number(_.trim(_.trim(e.target.value), '%')) / 100;
        setZoomVal(val);
    }, []);

    g6.on('wheelzoom', () => {
        setZoomVal(g6.getZoom());
    });

    g6.on('viewportchange', () => {
        setZoomVal(g6.getZoom());
    });

    // useEffect(() => {
    //     setZoomVal(g6.getZoom());
    // }, [g6.getZoom()]);

    return (
        <div className={style.mapbox}>
            <Row justify={'space-between'} align={'middle'} className={style.map_header}>
                <Col>缩略图</Col>
                <Col>
                    <Space.Compact>
                        <Button size='small' icon={<MinusOutlined />} onClick={handleZoomIn} disabled={lock} />
                        <Input
                            size='small'
                            style={{width: 60}}
                            value={`${_.toSafeInteger(zoomVal * 100)}%`}
                            onPressEnter={handleZoom}
                            onChange={handleZoomVal}
                            disabled={lock}
                        />
                        <Button size='small' icon={<PlusOutlined />} onClick={handleZoomOut} disabled={lock} />
                    </Space.Compact>
                    {lock
                        ? <LockOutlined className={style.lock} onClick={handleLock} />
                        : <UnlockOutlined className={style.lock} onClick={handleLock} />}
                </Col>
            </Row>
            <Components.MiniMap
                style={{position: 'initial', boxShadow: 'none'}}
                options={{
                    size: [200, 132],
                    className: style.minimap,
                }}
            />
        </div>
    );
};

export default MiniMap;
