const UUID = {
  randomUUID: () => {
    let uuid = "";
    for (var i = 0; i < 32; i++) {
      if (i === 8 || i === 12 || i === 16 || i === 20) {
        uuid += "-";
      }
      const random = (Math.random() * 16) | 0;
      const digit = i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random;
      uuid += digit.toString(16);
    }
    return uuid;
  },
};

export default UUID;
