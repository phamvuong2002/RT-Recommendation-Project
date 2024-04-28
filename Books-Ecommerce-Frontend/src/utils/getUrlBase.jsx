export const getBaseUrl = (data) => {
  const { protocol, host } = data;
  return `${protocol}//${host}`;
};
