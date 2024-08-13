/* eslint-disable */

import React, {useCallback, useContext, useState, useEffect} from 'react';
import {GraphinContext} from '@antv/graphin';
import {Modal, Form, Select, InputNumber, ColorPicker, Divider, Flex} from 'antd';
import {
    ExperimentOutlined,
} from '@ant-design/icons';
import styles from './index.module.scss';
import { fill } from 'lodash';

export default ({onClick}) => {
    const [open, setOpen] = useState(false);
    const [nodeTpye, setNodeType] = useState('node');
    const [itemTypeList, setItemTypeList] = useState([]);
    const {graph} = useContext(GraphinContext);
    const [form] = Form.useForm();

    const handleOpen = useCallback(() => {
        setOpen(true);
    }, []);

    const handleChangeNodeType = useCallback(val => {
        setNodeType(val);
    }, []);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    const handleClick = useCallback(() => {
        form.validateFields().then(values => {
            
            const {node_type, type, keyshape, label} = values;
            onClick && onClick(node_type, type, {keyshape, label});
            handleClose();
        })
        
    }, [onClick, handleClose, form]);

    useEffect(() => {
        if (!open || !graph) {
            return;
        }
        const datas = nodeTpye === 'node' ? graph.getNodes() : graph.getEdges();
        const dataArr = [];

        datas.map(item => {
            const itemType = item.getModel().legendType;
            !dataArr.includes(itemType) && dataArr.push(itemType);
        });
        setItemTypeList(dataArr);
    }, [nodeTpye, graph, open]);

    return (
        <>
            <span onClick={handleOpen}><ExperimentOutlined />外观设置</span>
            <Modal
                open={open}
                title='外观设置'
                okText='确定'
                cancelText='取消'
                width={600}
                onCancel={handleClose}
                onOk={handleClick}
            >
                <Form
                    initialValues={{
                        node_type: 'node',
                        type: '',
                        keyshape: {
                            size: 26,
                            stroke: '#873bf4',
                            lineWidth: 1,
                            fill: '#873bf4',
                            opacity: '1',
                        },
                        label: {
                            fontSize: 12,
                            fill: '#333',
                        },
                    }}
                    labelCol={{span: 6}}
                    form={form}
                >
                    <Flex className={styles.title}>基础属性</Flex>
                    <Form.Item label='点外观/边外观' rules={[{required: true}]} name='node_type' wrapperCol={{span: 6}}>
                        <Select
                            options={[{label: '点外观', value: 'node'}, {label: '边外观', value: 'edge'}]}
                            onChange={handleChangeNodeType}
                        />
                    </Form.Item>
                    <Form.Item label='类型' rules={[{required: true}]} name='type' wrapperCol={{span: 6}}>
                        <Select options={itemTypeList.map(item => ({label: item, value: item}))} />
                    </Form.Item>

                    <Divider />
                    <Flex className={styles.title}>外观配置</Flex>
                    {nodeTpye === 'node'
                        ? (
                            <>
                                {/* <Form.Item label='形状' required wrapperCol={{span: 6}} name='shape'>
                                    <Select
                                        options={[
                                            {label: '圆形', value: '1'},
                                            {label: '棱形', value: '2'},
                                            {label: '三角形', value: '3'},
                                            {label: '五角形', value: '4'},
                                            {label: '椭圆', value: 5},
                                        ]}
                                    />
                                </Form.Item> */}

                                <Form.Item label='大小' rules={[{required: true}]} name={['keyshape', 'size']}>
                                    <InputNumber min={20} max={50} />
                                </Form.Item>

                                <Form.Item
                                    label='边框色'
                                    rules={[{required: true}]}
                                    name={['keyshape', 'stroke']}
                                    getValueFromEvent={(color) => {
                                        return "#" + color.toHex();
                                    }}
                                >
                                    <ColorPicker allowClear />
                                </Form.Item>

                                <Form.Item label='边框粗细' rules={[{required: true}]} name={['keyshape', 'lineWidth']}>
                                    <InputNumber min={1} max={5} />
                                </Form.Item>

                                <Form.Item
                                    label='填充色'
                                    rules={[{required: true}]}
                                    name={['keyshape', 'fill']}
                                    getValueFromEvent={(color) => {
                                        return "#" + color.toHex();
                                    }}
                                >
                                    <ColorPicker allowClear />
                                </Form.Item>

                                {/* <Form.Item label='图标样式' required>
                                    <ColorPicker allowClear />
                                </Form.Item> */}

                                {/* <Form.Item label='图标颜色' required>
                                    <ColorPicker allowClear />
                                </Form.Item> */}

                                <Form.Item label='标签大小' rules={[{required: true}]} name={['label', 'fontSize']}>
                                    <InputNumber min={12} max={26} />
                                </Form.Item>

                                <Form.Item
                                    label='标签颜色'
                                    rules={[{required: true}]}
                                    name={['label', 'fill']}
                                    getValueFromEvent={(color) => {
                                        return "#" + color.toHex();
                                    }}
                                >
                                    <ColorPicker allowClear />
                                </Form.Item>

                                <Form.Item label='节点透明度' rules={[{required: true}]} name={['keyshape', 'opacity']}>
                                    <InputNumber stringMode min={'0.2'} max={'1.0'} step={'0.1'} />
                                </Form.Item>
                            </>
                        )
                        : (
                            <>
                                <Form.Item
                                    label='类别'
                                    rules={[{required: true}]} 
                                    wrapperCol={{span: 6}}
                                    name={['keyshape', 'lineDash']}
                                    getValueFromEvent={val => {
                                        if (val === '2') {
                                            return [4, 4];
                                        }
                                        return [0, 0];
                                    }}
                                >
                                    <Select options={[{label: '实线', value: '1'}, {label: '虚线', value: '2'}]} />
                                </Form.Item>

                                <Form.Item label='边的粗细' rules={[{required: true}]} name={['keyshape', 'lineWidth']}>
                                    <InputNumber min={'0.5'} max={'3.0'} stringMode step={'0.5'} />
                                </Form.Item>

                                <Form.Item
                                    label='边的颜色'
                                    getValueFromEvent={(color) => {
                                        return "#" + color.toHex();
                                    }}
                                    rules={[{required: true}]}
                                    name={['keyshape', 'stroke']}
                                >
                                    <ColorPicker allowClear />
                                </Form.Item>

                                <Form.Item label='标签大小' rules={[{required: true}]} name={['label', 'fontSize']}>
                                    <InputNumber min={12} max={26} />
                                </Form.Item>

                                <Form.Item label='标签颜色' rules={[{required: true}]} name={['label', 'fill']}>
                                    <ColorPicker allowClear />
                                </Form.Item>
                            </>
                        )
                    }
                </Form>
            </Modal>
        </>
    );
}
