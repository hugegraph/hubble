/* eslint-disable */
import React, {useEffect, useContext, useCallback} from 'react';
import {GraphinContext} from '@antv/graphin';
import {Drawer} from 'antd';
import Table from '../Table';
import style from './index.module.scss';

const ClickBehavior = () => {
    const [data, setData] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const {graph, apis} = useContext(GraphinContext);

    const animateEdge = useCallback(() => {
        // console.log(graph.getEdges());
        graph.getEdges().map(item => {
            if (item.getStates().includes('active')) {
                graph.updateItem(item.getModel().id, {
                    style: {
                        animate: {
                            type: 'line-dash',
                            repeat: true,
                        },
                    },
                });
                return;
            }
            // console.log(item.getModel().id, item.getStates());
            graph.updateItem(item.getModel().id, {
                style: {
                    animate: null,
                },
            });
        });
    }, [graph]);

    const clearAnimate = useCallback(() => {
        graph.getEdges().map(item => {
            graph.updateItem(item.getModel().id, {
                style: {
                    animate: null,
                },
            });
        });
    }, [graph]);

    const handleClose = useCallback(() => {
        setOpen(false);
        setData([]);
    }, []);

    useEffect(() => {
        // if (!open || !node) {
        //     return;
        // }

        // setData(Object.keys(node.properties ?? {}).map(index => ({name: index, value: node.properties[index]})));

        const handleClick = evt => {
            const node = evt.item;
            const model = node.getModel();
            apis.focusNodeById(model.id);
            // apis.highlightNodeById(model.id);
            setOpen(true);
            setData(model);

            // console.log(model);

            animateEdge();
        };

        const handleClickBlank = evt => {
            handleClose();
            clearAnimate();
        };

        graph.on('node:click', handleClick);
        graph.on('edge:click', handleClick);
        graph.on('canvas:click', handleClickBlank);

        return () => {
            graph.off('node:click', handleClick);
            graph.off('edge:click', handleClick);
            graph.off('canvas:click', handleClickBlank);
        };
    }, [handleClose, animateEdge, graph, apis]);

    return (
        <Drawer
            title={data?.id}
            open={open}
            getContainer={false}
            onClose={handleClose}
            mask={false}
            maskClosable
        >
            <div className={style.proIndex}>属性列表：</div>

            <Table
                data={Object.keys(data.properties ?? {}).map(index => ({name: index, value: data.properties[index].toString()}))}
                columns={[{title: '属性名', dataIndex: 'name'}, {title: '属性值', dataIndex: 'value'}]}
            />
        </Drawer>
    );
};

export default ClickBehavior;
