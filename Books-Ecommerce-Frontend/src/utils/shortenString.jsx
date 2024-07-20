import { isMobileDevice } from './isMobileDevice';

export const shortenString = (str, maxLength, usedForDesktop = false) => {
  if(str === 'null') return "Đang cập nhật ..."
  if (!str) return '...';
  if (isMobileDevice() || usedForDesktop) {
    if (str.length <= maxLength) {
      return str;
    } else {
      return str.slice(0, maxLength - 3) + '...';
    }
  } else {
    return str;
  }
};
