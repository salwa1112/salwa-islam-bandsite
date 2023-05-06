const apiKey = 'bb34e143-3fee-4d1b-8132-285f565b95ee';

const axiosInstance = axios.create({
    baseURL: 'https://project-1-api.herokuapp.com/',
    params: {
        api_key: apiKey
    }
});


function getAllData(url){
    return axiosInstance.get(url);
}

function postData(url, data) {
    return axiosInstance.post(url, data);
}

function likeComment(id){
    return axiosInstance.put(`comments/${id}/like`);
}

function deleteComment(id) {
    return axiosInstance.delete(`comments/${id}`);
}


const BandSiteRestService =  {  getAllData, postData, likeComment, deleteComment  };


export default BandSiteRestService;
