import axios from 'axios';

function fetchMessageData(id) {
    //https://api.myjson.com/bins/kss4v
    //https://api.myjson.com/bins/ax77j
    //https://api.myjson.com/bins/c7bpb
    //https://api.myjson.com/bins/15zwcv
    //https://api.myjson.com/bins/1gjwwv
    //https://jsonblob.com/api/jsonBlob/9f7ca9a8-58a3-11e7-ae4c-6ba4129cae91
    //Case3_586
    //https://jsonblob.com/4e9ae052-5a91-11e7-ae4c-9df4ba3dc194
    return axios.get('https://jsonblob.com/api/jsonBlob/4e9ae052-5a91-11e7-ae4c-9df4ba3dc194').then((response)=>{
        return response.data;
    })
}

function fetchSchemaData() {
    //https://jsonblob.com/5236af89-5a18-11e7-ae4c-5f04568414d8
    return axios.get('https://jsonblob.com/api/jsonBlob/5236af89-5a18-11e7-ae4c-5f04568414d8').then((response)=>{
        return response.data;
    })
}

function fetchErrorData(id) {
    //errors
    //https://jsonblob.com/81a98ecb-5a91-11e7-ae4c-7d4c57e5d03f
    return axios.get('https://jsonblob.com/api/jsonBlob/81a98ecb-5a91-11e7-ae4c-7d4c57e5d03f').then((response)=>{
        return response.data;
    })
}

export {fetchMessageData,fetchSchemaData,fetchErrorData};