import axios from 'axios';

function fetchMessageData(id) {
    //https://api.myjson.com/bins/kss4v
    //https://api.myjson.com/bins/ax77j
    //https://api.myjson.com/bins/c7bpb
    //https://api.myjson.com/bins/15zwcv
    //https://api.myjson.com/bins/1gjwwv
    //850
    //https://jsonblob.com/api/jsonBlob/9f7ca9a8-58a3-11e7-ae4c-6ba4129cae91
    //Case3_586
    //https://jsonblob.com/4e9ae052-5a91-11e7-ae4c-9df4ba3dc194
    //edifact
    //https://jsonblob.com/ec5f0b6d-6088-11e7-ae4c-492c2c142ff8
    //https://jsonblob.com/38521ed9-609c-11e7-ae4c-b9107d8afa6e
    //xml
    //https://jsonblob.com/8c3a67ba-6221-11e7-ae4c-7d5cbf68dd9a
    return axios.get('https://jsonblob.com/api/jsonBlob/9f7ca9a8-58a3-11e7-ae4c-6ba4129cae91').then((response)=>{
        return response.data;
    })
}

function fetchSchemaData() {
    //4060
    //https://jsonblob.com/5236af89-5a18-11e7-ae4c-5f04568414d8
    //4010-856
    //https://jsonblob.com/43c0b4b4-5bff-11e7-ae4c-6f0b74b006be
    //4060-850
    //https://jsonblob.com/499ce7d3-5c78-11e7-ae4c-5bce762b6543
    //edifact
    //https://jsonblob.com/35dafa20-609b-11e7-ae4c-5d4541e47d81
    //xml
    //https://jsonblob.com/e211f583-6221-11e7-ae4c-cf2602f53f9f
    return axios.get('https://jsonblob.com/api/jsonBlob/499ce7d3-5c78-11e7-ae4c-5bce762b6543').then((response)=>{
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