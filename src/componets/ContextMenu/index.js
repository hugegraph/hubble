// src/componets/ContextMenu/index.js
/* eslint-disable */ 
import React, {useContext, useCallback} from 'react';
import {Components, GraphinContext} from '@antv/graphin';
import {Menu} from 'antd';
import Utils from '../../utils';

const ContextMenu = ({onExpand, menu}) => {
    const MyMenu = value => {
        const {graph} = useContext(GraphinContext);
        
        const {onClose, onExpand} = value;
        const menus = menu?.list ?? ['pin'];
    
        const handleClick = useCallback(e => {
            const {key} = e;
    
            // if (key === 'expand') {
            //     onExpand(value.item.get('model'));
            // }
            
            if (key === '_pin_lock') {
                value.item.lock();
                Utils.node.pin(graph, value.item, 'lock');
            }
            
            if (key === '_pin_unlock') {
                // value.item.unlock();
                // graph.setItemState(value.item, 'disabled', false);
                Utils.node.pin(graph, value.item, 'unlock');
            }
            
            // if (key === 'expandCustom') {
            //     console.log('expandCustom');
            //     setOpenExpand(l => !l);
            // }
            
            menu?.onItemClick(key, value.item.get('model'));

            onClose();
        }, []);
    
        return (
            <>
                <Menu
                    onClick={handleClick}
                    // items={[
                    //     ...(onExpand && [{label: '展开一度关系', key: 'expand'}]),
                    //     {label: '自定义展开', key: 'expandCustom'},
                    //     value.item.hasLocked() ? {label: '解除固定', key: 'unlock'} : {label: '固定', key: 'lock'},
                    // ]}
                    items={menus.map(item => {
                        if (item === 'pin') {
                            return value.item.hasLocked() ? {label: '解除固定', key: '_pin_unlock'} : {label: '固定', key: '_pin_lock'};
                        };

                        return {label: item.label, key: item.key};
                    })}
                />
            </>
        );
    };

    return (
        <>
            <Components.ContextMenu style={{background: '#fff', width: 140}} bindType="node">
                {value => (<MyMenu {...value} onExpand={onExpand} />)}
            </Components.ContextMenu>
        </>
    );
};

export default ContextMenu;
