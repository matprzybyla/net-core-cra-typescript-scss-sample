import axios, { AxiosResponse } from 'axios';

export abstract class ApiCallService {
    public static async fetchAnyData<T>(uri: string): Promise<T> {
        return axios.get('/api/test')
            .then(function (response: AxiosResponse<T>) {
                return response.data;
            })
            .catch(function (error) {
                console.error(error);
                throw error;
            })
    }

    public static async fetchData(): Promise<string> {
        return axios.get('/api/test')
            .then(function (response: AxiosResponse<string>) {
                return response.data;
            })
            .catch(function (error) {
                console.error(error);
                throw error;
            })
    }
}