const DEFAULT_NAME = `guest`;
const APP_ID = 842877;
const REST_API_URL = {
  question: `https://es.dump.academy/pixel-hunter/questions`,
  stats: (appId, userName) => `https://es.dump.academy/pixel-hunter/stats/${appId}-${userName}`
};

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const toJSON = (res) => res.json();

export default class Loader {
  static loadData() {
    return fetch(REST_API_URL.question).then(checkStatus).then(toJSON);
  }

  static loadResults(name = DEFAULT_NAME) {
    return fetch(REST_API_URL.stats(APP_ID, name)).then(checkStatus).then(toJSON);
  }

  static saveResults(data, name = DEFAULT_NAME) {
    data = Object.assign({name}, data);
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(REST_API_URL.stats(APP_ID, name), requestSettings).then(checkStatus);
  }
}
