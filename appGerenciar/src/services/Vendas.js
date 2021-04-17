import session from '../session';
import { TOKEN } from '../variables';
import axios from 'axios';
import { server, showError, showSuccess } from '../common';
//import Utils from './Utils';

export const createPedido = async (data) => {
  var token = await session.get(TOKEN);
  try {
    const headers = {
      'authorization': 'token ' + token,
      'content-type': 'application/json;charset=UTF-8'
    };

    const res = await axios.post(`${server}/sale/salesorder/`, data, {
      headers: headers
    })

    return res.data;
  } catch (e) {
    console.log('erro: ' + e)
    return e;
  }
};

export const addProcut = async (data) => {
  var token = await session.get(TOKEN);
  console.log(data)
  try {
    var config = {
      method: 'post',
      url: `${server}/sale/salesorderitems/`,
      headers: {
        'authorization': 'token ' + token,
        'content-type': 'application/json;charset=UTF-8'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });

    return true;
  } catch (e) {
    console.log('erro: ' + e)
    return e;
  }
};

export const itensOrder = async (data) => {
  var token = await session.get(TOKEN);

  try {
    var headers = {
      'authorization': 'token ' + token,
      'content-type': 'application/json;charset=UTF-8'
    };

    const res = await axios.get(`${server}/sale/salesorderitems?order=` + data, {
      headers: headers
    })

    return res.data;
  } catch (e) {
    console.log('erro: ' + e)
    return e;
  }
};

export const deleteItem = async () => {
  try {
    //    const realm = await getRealm();

    // await realm.write(() => {
    //   let itensDb = realm.objects('Produtos');
    //   realm.delete(itensDb);
    // });

    return true;
  } catch (e) {
    return false;
  }
};
