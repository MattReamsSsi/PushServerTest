import axios from 'axios';
import { ApiClientData, UserData } from '../DataStructures';

async function doGet(path: any) {
    const response = await axios.get(path);
    return response.data;
  }

  const ipAddress = '192.168.1.142';

export default class SsiApiClient {
  
  static async getApiClientDatas(): Promise<ApiClientData[]> {
    return doGet(`http://${ipAddress}:5001/pushserver/getApiClientDatas`);
  }

  static async getUserDatas(): Promise<UserData[]> {
    return doGet(`http://${ipAddress}:5001/pushserver/getUserDatas`);
  }

}