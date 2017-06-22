import axios from 'axios';

function fetchMessageData(id) {
    //https://api.myjson.com/bins/kss4v
    //https://api.myjson.com/bins/ax77j
    return axios.get('https://api.myjson.com/bins/c7bpb').then((response)=>{
        return response.data;
    })
}

export {fetchMessageData};