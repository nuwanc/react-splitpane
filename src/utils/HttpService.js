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
    return axios.get('http://localhost:3004/message').then((response)=>{
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
    return axios.get('http://localhost:3004/schema').then((response)=>{
        return response.data;
    })
}

function fetchErrorData(id) {
    //errors
    //https://jsonblob.com/81a98ecb-5a91-11e7-ae4c-7d4c57e5d03f
    //big list
    //https://jsonblob.com/b4359356-6bd7-11e7-a38a-4fb49769c307
    //new format
    //https://jsonblob.com/6d2350cb-6c6f-11e7-a38a-6db307f861f5
    //https://jsonblob.com/3bc78bc4-6d6f-11e7-a38a-515afd967d2e
    return axios.get('http://localhost:3004/validate').then((response)=>{
        return response.data;
    })
}


export {fetchMessageData,fetchSchemaData,fetchErrorData};