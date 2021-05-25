import axios from 'axios';
import { ApiClientData, PushMessage, UserData } from '../DataStructures';

async function doGet(path: string) {
  const response = await axios.get(path);
  return response.data;
}

async function doPost(path: string, data: any) {
  const response = await axios.post(path, data);
  return response.data;
}

export default class SsiApiClient {
  
  static async getApiClientDatas(): Promise<ApiClientData[]> {
    return doGet(`pushserver/getApiClientDatas`);
  }

  static async getUserDatas(): Promise<UserData[]> {
    return doGet(`pushserver/getUserDatas`);
  }

  static async sendPushMessage(pushMessage: PushMessage): Promise<string> {
    return doPost(`pushserver/sendPushMessage`, pushMessage);
  }

  static async addUserData(userData: UserData): Promise<string> {
    return doPost(`pushserver/addUserData`, userData);
  }

  static async addApiClientData(apiClientData: ApiClientData): Promise<string> {
    return doPost(`pushserver/addApiClientData`, apiClientData);
  }

}