import axios from 'axios';

function fetchMessageData(id) {
    //https://api.myjson.com/bins/kss4v
    //https://api.myjson.com/bins/ax77j
    //https://api.myjson.com/bins/c7bpb
    //https://api.myjson.com/bins/15zwcv
    return axios.get('https://api.myjson.com/bins/15zwcv').then((response)=>{
        return response.data;
    })
}

export {fetchMessageData};