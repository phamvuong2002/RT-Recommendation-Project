export const getCateFromText = (cate, n) => {
  if (!cate) return '...';
  let cates = cate.split(',');
  if (n < 0 || n >= cates.length) return cates[cates.length - 1];
  return cates[n];
};
