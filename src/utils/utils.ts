import crypto from 'crypto'

export const generateUuid = () => {
  return Math.ceil((Math.random() * Number.MAX_SAFE_INTEGER)).toString() + Number.MAX_SAFE_INTEGER + Date.now();
}

export const generateHash = (data: any) => {
  const hash = crypto.createHash('sha256');
  hash.update(data);
  return hash.digest('hex');
}

export const hash = (data: any) => {
  return crypto.createHash('md5').update(JSON.stringify(data)).digest('hex').toString();
}