import axios from 'axios';

const baseUrl = "https://api-dev.shop-delivery.ru/int_api/ozon/";
export const url = baseUrl;
export const http = axios.create({
  baseURL: url
});

export default http;
