import axios from 'axios';

function fetchMessageData(key) {
    return axios.get('./MessagingMagic?type=message&key='+key).then((response)=>{
        return response.data;
    })
}

function fetchSchemaData(key) {
    return axios.get('./MessagingMagic?type=schema&key='+key).then((response)=>{
        return response.data;
    })
}

function fetchErrorData(key) {
    return axios.get('./MessagingMagic?type=validate&key='+key).then((response)=>{
        return response.data;
    })
}


export {fetchMessageData,fetchSchemaData,fetchErrorData};