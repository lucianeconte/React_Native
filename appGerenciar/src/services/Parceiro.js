//import { Toast } from 'native-base';
import session from '../session';
import { TOKEN } from '../variables';
import axios from 'axios';
//import Utils from './Utils';

export const createParceiro = async (data) => {
  console.log(data)
  var token = await session.get(TOKEN);
  try {
    var config = {
      method: 'post',
      url: 'https://synnax.herokuapp.com/core/businessparters/',
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

export const deleteClientes = async () => {
  try {
    const realm = await getRealm();

    await realm.write(() => {
      let itensDb = realm.objects('Clientes');
      realm.delete(itensDb);
    });

    return true;
  } catch (e) {
    return false;
  }
};
