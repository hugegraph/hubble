/* eslint-disable */

/**
 * 节点操作
 */

/**
 * 锁定/解锁节点
 */
const pin = (graph, item, op) => {
    const type = op ?? (item.hasLocked() ? 'unlock' : 'lock');
    if (type === 'lock') {
        item.lock();
        graph.setItemState(item, 'disabled', true);
    }
    
    if (type === 'unlock') {
        item.unlock();
        graph.setItemState(item, 'disabled', false);
    }
}

export default {pin};
