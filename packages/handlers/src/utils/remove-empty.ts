export const removeEmpty = (data: any) => {
  const obj = data;

  if (!data || typeof data !== 'object') {
    return data;
  }

  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === 'object') {
      removeEmpty(obj[key]);
    } else if (obj[key] === undefined || obj[key] === null || obj[key] === '') {
      delete obj[key];
    }
  });

  return obj;
};
