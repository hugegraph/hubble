/* eslint-disable */
import React, {useState, useEffect, useCallback} from 'react';
// import formatToGraphData from '../../utils/formatServerData';
import formatData from '../../utils/formatData';
// import backIcon from './assets/canvas_bg.png';
import GraphAnalysis from '../HugeGraphAnalysis';
import {getMetaList, getExecutionQuery, putExecutionQuery, postExecutionQuery} from '../../api';


const url = 'https://iapi.baidu-int.com/m1/353088-0-default';

const CustomUrlAnalysis = ({edgeUrl, vertexUrl, queryUrl}) => {

    // const eUrl = edgeUrl || `${url}/graphspaces/neizhianli/graphs/hlm/schema/edgelabels`;
    // const vUrl = vertexUrl || `${url}/graphspaces/neizhianli/graphs/hlm/schema/vertexlabels`;
    const qUrl = queryUrl || `${url}/graphspaces/neizhianli/graphs/hlm/gremlin-query1`;
    // const qUrl = `${url}/graphspaces/neizhianli/graphs/hlm/gremlin-query`;

    // let edgeMeta = [];
    // let vertexMeta = [];

    const [data, setData] = useState({nodes: [], edges: []});
    const [total, setTotal] = useState({vertexcount: 0, edgecount: 0});
    const [edgeData, setEdgeData] = useState([]);
    const [vertexData, setVertexData] = useState([]);

    const handleExpand = useCallback(async item => {
        const expandResponse = await putExecutionQuery(qUrl, {vertex_id: item.id, vertex_label: item.itemType});
        if (expandResponse.status === 200) {
            const expandData = formatData(expandResponse.data.graph_view, {vertexData: [], edgeData: []});
            const vertex = [...data.nodes, ...expandData.nodes];
            const edge = [...data.edges, ...expandData.edges];

            setData({nodes: vertex, edges: edge});
        }
    }, [data, edgeData, vertexData]);

    useEffect(() => {
        const fetchMeta = async url => {
            if (!url) {
                return [];
            }

            try {
                let meta = [];
                const metaResponse = await getMetaList(url, {page_size: -1});
                if (metaResponse.status === 200) {
                    meta = metaResponse.data.records;
                }

                return meta;
            } catch (e) {
                return []
            }
        }

        const fetchTotal = async url => {
            if (!url) {
                return;
            }

            try {
                const totalResponse = await getExecutionQuery(url);
                if (totalResponse.status === 200) {
                    setTotal(totalResponse.data);
                }
            } catch (e) {
            }
        }

        const fetchData = async () => {
            // let edgeMeta = await fetchMeta(eUrl);
            // let vertexMeta = await fetchMeta(vUrl);
            // setEdgeData(edgeMeta);
            // setVertexData(vertexMeta);

            const graphDataResponse = await getExecutionQuery(qUrl);
            if (graphDataResponse.status === 200) {
                // console.log(graphDataResponse.result.data);
                // console.log(formatToGraphData(graphDataResponse.result.data, {vertexMeta, edgeMeta}));
                
                const graphData = formatData(graphDataResponse.data.graph_view, {vertexMeta: [], edgeMeta: []});
                setData(graphData);
            }
        };
        fetchData();
        fetchTotal();

    }, [queryUrl]);

    return (
        <>
            <GraphAnalysis
                data={data}
                total={total}
                onExpand={handleExpand}
            />
        </>
    );
};

export default CustomUrlAnalysis;
