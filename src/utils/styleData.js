
export default (graphData, styleData) => {
    if (graphData.nodes && styleData.node) {
        // console.log('graphData', graphData);
        graphData.nodes.map((node, index) => {
            // if (!node) {
            //     return;
            // }
            // console.log(node);
            const styleDataItem = styleData.node[node.legendType];
            const graphDataItem = graphData.nodes[index];

            if (styleDataItem) {
                graphData.nodes[index].style = {
                    ...graphDataItem.style,
                    keyshape: {...graphDataItem.style.keyshape, ...styleDataItem.keyshape},
                    label: {
                        // value: graphDataItem.label.value,
                        // style: {...graphDataItem.label.style, ...styleDataItem.label}
                        ...graphDataItem.style.label,
                        ...styleDataItem.label,
                    },
                };
                // console.log('graphDataItem', graphDataItem);
            }
        });
    }

    if (graphData.edges && styleData.edge) {
        graphData.edges.map((edge, index) => {
            const styleDataItem = styleData.edge[edge.legendType];
            const graphDataItem = graphData.edges[index];
            if (styleDataItem) {
                graphData.edges[index].style = {
                    ...graphDataItem.style,
                    keyshape: {...graphDataItem.keyshape, ...styleDataItem.keyshape},
                    label: {
                        // ...graphDataItem.label,
                        // style: {...graphDataItem.label.style, ...styleDataItem.label},
                        ...graphDataItem.style.label,
                        ...styleDataItem.label,
                    },
                };
            }
        });
    }

    return graphData;
};
