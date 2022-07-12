import axios from 'axios'

export const callAPI = (method, url, body = {}) => (new Promise((resolve, reject) => {

    axios({
        method,
        url: `${process.env.NEXT_PUBLIC_PLINTO_API_BASE_URL}${url}`,
        data: body,
        headers: {
            'Ocp-Apim-Subscription-Key': process.env.NEXT_PUBLIC_AZURE_SUBSCRIPTION_KEY
        }
    }).then(function (res) {
        if (process.env.NODE_ENV == 'development') {
            console.log(res);
        }
        resolve(res)
    }).catch(function (error) {
        if (process.env.NODE_ENV == 'development') {

            console.error(error);
        }
        reject(error)
    });
}));

export const callNodeAPI = (method, url, body = {}) => (new Promise((resolve, reject) => {

    axios({
        method,
        url: `${process.env.NEXT_PUBLIC_AZURE_NODE_URL}${url}`,
        data: body,
        // headers: {
        //     'Ocp-Apim-Subscription-Key': process.env.NEXT_PUBLIC_AZURE_SUBSCRIPTION_KEY
        // }
    }).then(function (res) {
        if (process.env.NODE_ENV == 'development') {
            console.log(res);
        }
        resolve(res)
    }).catch(function (error) {
        if (process.env.NODE_ENV == 'development') {
            console.log(error);

        }
        reject(error)
    });
}));


export const callNodeProdAPI = (method, url, body = {}) => (new Promise((resolve, reject) => {

    axios({
        method,
        url: `${process.env.NEXT_PUBLIC_PROD_AZURE_MARKETING_URL
            }${url}`,
        data: body,
        // headers: {
        //     'Ocp-Apim-Subscription-Key': process.env.NEXT_PUBLIC_AZURE_SUBSCRIPTION_KEY
        // }
    }).then(function (res) {
        if (process.env.NODE_ENV == 'development') {
            console.log(res);
        }
        resolve(res)
    }).catch(function (error) {
        if (process.env.NODE_ENV == 'development') {

            console.error(error);
        }
        reject(error)
    });
}));