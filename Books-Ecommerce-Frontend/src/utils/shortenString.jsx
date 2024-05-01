import { isMobileDevice } from './isMobileDevice';

export const shortenString = (str, maxLength) => {
  if (!str) return '...';
  if (isMobileDevice()) {
    if (str.length <= maxLength) {
      return str;
    } else {
      return str.slice(0, maxLength - 3) + '...';
    }
  } else {
    return str;
  }
};
