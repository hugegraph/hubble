// src/componets/ContextMenu/components/ExpandCustom/index.js
/* eslint-disable */

import React from 'react';
import {Button, Form, Input, Modal, Select, Switch, Row, Col, Space} from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import style from './index.module.scss';

const ExpandCustom = ({isOpen}) => {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        setOpen(isOpen !== null);
    }, [isOpen]);

    return (
        <Modal
            title='自定义展开'
            open={open}
            okText='确定'
            cancelText='取消'
            onOk={() => {
                setOpen(false);
            }}
            onCancel={() => {
                setOpen(false);
            }}
            getContainer={false}
        >
            <Form>
                <Form.Item label='展开边的方向' style={{marginBottom: 10}} required>
                    <Select />
                </Form.Item>
                <Form.Item label='展开顶点类型' style={{marginBottom: 5}} required>
                    <Select mode='multiple' />
                </Form.Item>
                <Form.Item label='按属性对展开顶点进行过滤' style={{margin: "5px 0"}}>
                    <Switch />
                </Form.Item>
                <Form.Item className={style.conditions}>
                    <Form.Item label='条件之间的逻辑关系' style={{marginBottom: 0}}>
                        <Select
                            options={[
                                {label: 'AND', value: 'and'},
                                {label: 'OR', value: 'or'},
                            ]}
                            size='small'
                            style={{width: 120}}
                        />
                    </Form.Item>
                    <Form.List
                        name='conditions'
                        rules={[{required: true, message: '请输入条件'}]}
                    >
                        {(fields, {add, remove}) => (
                            <>
                                {fields.map((field, index) => (
                                    <Row gutter={[4, 0]} align={'middle'} style={{marginBottom: 10}}>
                                        <Col span={12}>
                                            <Form.Item noStyle name={[field.name, 'a']}>
                                                <Space.Compact block>
                                                    <Select
                                                        options={[
                                                            {label: '全部类型', value: 'all'}
                                                        ]}
                                                        size='small'
                                                        style={{width: '40%'}}
                                                    />
                                                    <Input placeholder='属性' size='small' style={{width: '60%'}} />
                                                </Space.Compact>
                                            </Form.Item>
                                        </Col>
                                        <Col span={4}>
                                            <Form.Item noStyle name={[field.name, 'b']}>
                                                <Select
                                                    options={[
                                                        {label: '等于', value: '='},
                                                        {label: '不等于', value: '!='},
                                                        {label: '大于', value: '>'},
                                                        {label: '小于', value: '<'},
                                                    ]}
                                                    size='small'
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item noStyle name={[field.name, 'c']}>
                                                <Input placeholder='值' size='small' />
                                            </Form.Item>
                                        </Col>
                                        <Col span={2}>
                                            <DeleteOutlined onClick={() => remove()} />
                                        </Col>
                                    </Row>
                                ))}
                                <Button
                                    type='dashed'
                                    block
                                    onClick={() => add()}
                                    size='small'
                                    style={{color: '#bfbfbf'}}
                                >
                                    + 增加条件
                                </Button>
                            </>
                        )}
                    </Form.List>
                    
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ExpandCustom;