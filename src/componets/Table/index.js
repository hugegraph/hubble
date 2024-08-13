/* eslint-disable */
import React from 'react';
import style from './index.module.scss';

const Table = ({columns, data}) => {
    const indexes = columns.map(item => item.dataIndex);

    return (
        <div className={style.table}>
            <div className={style.table_header}>
                {columns.map(item => {
                    return (
                        <div className={style.table_cell} key={item.dataIndex}>{item.title}</div>
                    );
                })}
            </div>
            {data.map(item => (
                <div className={style.table_row} key={item.name}>
                    {indexes.map(index => (<div className={style.table_cell} key={index}>{item[index]}</div>))}
                </div>
            ))}
        </div>
    );
};

export default Table;
