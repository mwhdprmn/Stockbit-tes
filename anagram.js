const list = ["kita", "atik", "tika", "aku", "kia", "makan", "kua"];

const anagram = (words) => {
  const result = {};

  for (let word of words) {
    let sorted = sortAlphabet(word);
    if (result[sorted]) {
      result[sorted].push(word);
    } else {
      result[sorted] = [word];
    }
  }

  return Object.values(result);
};

sortAlphabet = (str) => {
  let sorted = str.split("");
  for (let i = 1; i < sorted.length; i++) {
    for (let j = 0; j < i; j++) {
      if (sorted[i] < sorted[j]) {
        let temp = sorted[i];
        sorted[i] = sorted[j];
        sorted[j] = temp;
      }
    }
  }
  return sorted.join("");
};

console.log(anagram(list));
