/**
 * parse response
 * @module service/parseRes
 */
export function parseRes(res) {
  switch (res.status) {
    case 200:
    case 201:
      return res.json();
    case 204:
      return Promise.resolve({});
    case 403:
      return Promise.reject({
        errors: 'broken token',
      });
    case 409:
      return Promise.reject({
        errors: 'invalid token',
      });
    default:
      return new Promise((resolve, reject) => {
        res.json().then(json => {
          reject(json);
        })
        .catch(err => {
          reject({
            errors: 'invalid json',
          });
        });
      });
  }
}
