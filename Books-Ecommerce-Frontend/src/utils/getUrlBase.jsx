export const getBaseUrl = (data) => {
  const { protocol, host } = data;
  return `${protocol}//${host}`;
};

export const getStringBeforeAmpersand = (url) => {
  if (!url) return [];
  const parts = url.split('&');
  return parts;
};

export const extractQueryString = (queryString) => {
  const queryParams = queryString.split('&');
  const params = {};
  queryParams.forEach((param) => {
    const [key, value] = param.split('=');
    params[key] = value;
  });
  return params;
};
