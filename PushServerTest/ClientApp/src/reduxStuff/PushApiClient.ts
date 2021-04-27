import axios from 'axios';
import { ApiClientData, UserData } from '../DataStructures';

async function doGet(path: string) {
  const response = await axios.get(path);
  return response.data;
}

export default class SsiApiClient {
  
  static async getApiClientDatas(): Promise<ApiClientData[]> {
    return doGet(`pushserver/getApiClientDatas`);
  }

  static async getUserDatas(): Promise<UserData[]> {
    return doGet(`pushserver/getUserDatas`);
  }

}