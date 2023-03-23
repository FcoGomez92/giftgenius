export const clean = (str, pre = '') =>
  `${pre}"${str.replace(/[\n"]/g, (match) => (match === '\n' ? ' ' : "'"))}".`
