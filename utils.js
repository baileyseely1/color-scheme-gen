const generateRandomColors = (times) => {
  const randoms = [];
  for (let i = 0; i < times; i++) {
    randoms.push(Math.floor(Math.random() * 16777215).toString(16));
  }
  return randoms;
};

export { generateRandomColors };
