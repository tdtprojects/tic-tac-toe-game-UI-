import axios from 'axios';

import { SERVER_API_URL } from '../constants/constants';

export default function callApi(endpoint, method = 'get', body) {
  return body
    ? axios[method](`${SERVER_API_URL}/${endpoint}`, body)
    : axios[method](`${SERVER_API_URL}/${endpoint}`);
}
