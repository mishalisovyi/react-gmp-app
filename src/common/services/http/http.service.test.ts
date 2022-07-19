import { HttpMethod } from 'common/enums';

import {
  sendGetRequest,
  sendPostRequest,
  sendPutRequest,
  sendDeleteRequest,
} from './http.service';

window.fetch = jest.fn(() => Promise.resolve({
  ok: true,
  json: () => Promise.resolve({}),
})) as any;

const url = 'https://mock.test.com';

const generalFetchOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const requestBody = { foo: 'bar' };

it('should send get request', async () => {
  await sendGetRequest(url);

  expect(window.fetch).toHaveBeenCalledWith(url, {
    ...generalFetchOptions,
    method: HttpMethod.Get,
  });
});

it('should send post request', async () => {
  await sendPostRequest(url, requestBody);

  expect(window.fetch).toHaveBeenCalledWith(url, {
    ...generalFetchOptions,
    method: HttpMethod.Post,
    body: JSON.stringify(requestBody),
  });
});

it('should send put request', async () => {
  await sendPutRequest(url, requestBody);

  expect(window.fetch).toHaveBeenCalledWith(url, {
    ...generalFetchOptions,
    method: HttpMethod.Put,
    body: JSON.stringify(requestBody),
  });
});

it('should send delete request', async () => {
  await sendDeleteRequest(url);

  expect(window.fetch).toHaveBeenCalledWith(url, {
    ...generalFetchOptions,
    method: HttpMethod.Delete,
  });
});
