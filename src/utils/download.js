const downloadJson = (fileName, data) => {
    const formatedFileName = fileName.split('.').join('');
    let element = document.createElement('a');
    const processedData = JSON.stringify(data);
    element.setAttribute('href',
        `data:application/json;charset=utf-8,\ufeff${encodeURIComponent(processedData)}`);
    element.setAttribute('download', formatedFileName);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
};

const downloadCsv = (fileName, data) => {
    const formatedFileName = fileName.split('.').join('');
    let element = document.createElement('a');
    element.setAttribute('href', `data:text/csv;charset=utf-8,${encodeURIComponent(data)}`);
    element.setAttribute('download', formatedFileName);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
};

export {downloadJson, downloadCsv};
