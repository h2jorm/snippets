import {UNAUTHORIZED} from '#/service';

/**
 * parse response
 * @module service/parseRes
 */
export function parseRes(res) {
  const {status} = res;
  switch (status) {
    case 200:
    case 201:
      return res.json();
    default:
      const error = new Error(`invalid response status: ${status}`);
      return res.json().
        then(resData => {
          error.resData = resData;
          return Promise.reject(error);
        });
  }
}
