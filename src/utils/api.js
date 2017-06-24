import axios from 'axios';

function fetchMessageData(id) {
    //https://api.myjson.com/bins/kss4v
    //https://api.myjson.com/bins/ax77j
    //https://api.myjson.com/bins/c7bpb
    //https://api.myjson.com/bins/15zwcv
    //https://api.myjson.com/bins/1gjwwv
    //https://jsonblob.com/api/jsonBlob/9f7ca9a8-58a3-11e7-ae4c-6ba4129cae91
    return axios.get('https://jsonblob.com/api/jsonBlob/9f7ca9a8-58a3-11e7-ae4c-6ba4129cae91').then((response)=>{
        return response.data;
    })
}

export {fetchMessageData};