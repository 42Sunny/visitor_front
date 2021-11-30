const isNumber = (ch: string) => Number.isNaN(Number.parseInt(ch, 10)) === false;

export default isNumber;
