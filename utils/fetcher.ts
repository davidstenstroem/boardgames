import Axios from 'axios';
import { xml2json } from 'xml-js';

const client = Axios.create({
  baseURL: 'https://boardgamegeek.com/xmlapi2',
  headers: {
    Accept: 'text/xml',
    'Content-Type': 'text/xml',
  },
});

client.interceptors.response.use(async (response) => {
  response.data = JSON.parse(
    xml2json(response.data, { compact: true, spaces: 2 })
  );
  return response;
});

export const fetcher = async ([path, params]: [
  string,
  Record<string, string>
]) => {
  const response = await client.get(path, { params });
  return response.data;
};
