/* eslint-disable */
import React, {useEffect, useContext} from 'react';
import {GraphinContext} from '@antv/graphin';

const UndoRedoBehavior = ({onChange, reset}) => {
    const {graph} = useContext(GraphinContext);

    useEffect(() => {
        const handleStackChange = evt => {
            const {undoStack, redoStack} = evt;
            onChange && onChange(undoStack, redoStack);
        };
        graph.on('stackchange', handleStackChange);

        return () => {
            graph.off('stackchange', handleStackChange);
        };
    }, [onChange]);

    useEffect(() => {
        graph.clearStack();
        onChange && onChange([], []);
    }, [reset, onChange]);

    return null;
};

export default UndoRedoBehavior;
