// const url = 'http://hugegraph-dev.now.baidu-int.com:3000/api/v1.3';
// const url = 'https://iapi.baidu-int.com/m1/353088-0-default';

const getMetaList = (url, params) => {
    const param = new URLSearchParams();
    Object.keys(params).forEach((key) => {
        param.append(key, params[key]);
    });

    return fetch(`${url}?` + param.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
    }).then(response => response.json());
};

const getExecutionQuery = url => {

    return fetch(`${url}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
    }).then(response => response.json());
};

const postExecutionQuery = (url, params) => {

    return fetch(`${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(params),
    }).then(response => response.json());
};

const putExecutionQuery = (url, params) => {

    return fetch(`${url}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(params),
    }).then(response => response.json());
};

export {getMetaList, getExecutionQuery, postExecutionQuery, putExecutionQuery};
