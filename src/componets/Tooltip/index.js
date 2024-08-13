/* eslint-disable */
import React from "react";
import {Components} from '@antv/graphin';
import style from './index.module.scss';

const Tooltip = ({bindType, placement, hasArrow}) => {
    return (
        <Components.Tooltip
            bindType={bindType}
            placement={placement}
            hasArrow={hasArrow}
            style={{background: '#fff', padding: '4px 12px', width: 'auto'}}
            // delay={{show: 100, hide: 200000}}
        >
          {(value) => {
            if (value.model) {
              const { model } = value;
              
              return (
                <div>
                  <div className={style.title}>{model.id}</div>
                  <ul className={style.ul}>
                    {model.properties && Object.keys(model.properties).map((key) => 
                      (<li key={key}>{key}: {model.properties[key].toString()}</li>)
                    )}
                  </ul>
                </div>
              );
            }
            return null;
          }}
        </Components.Tooltip>
    )
}

export default Tooltip;