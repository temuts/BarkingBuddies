module.exports = {
  generate: () => {
    const randomNum = Math.floor(Math.random() * 10);
    return `/img/profile/${randomNum}.png`;
  },
};
