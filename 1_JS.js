export function toLow(str) { //1ая буква заглавная, остальные строчные
  str = str.toLowerCase();
  str = str[0].toUpperCase() + str.slice(1);
  return str;
}

export function doSpaces(str) { //правильная расстановка пробелов у знаков препинания
  str = str.replace(/\s+/g, ' ');
  str = str.replace(/\s([.,:!?])/g, '$1');
  str = str.replace(/([.,:!?])(?=[^\s])+/g, '$1 ');
  return str;
}

export function countWords(str) { //количество слов в строке
  str = str.replace(/[^a-zA-Zа-яёА-ЯЁ]/g, ' ');
  str = str.replace(/\s+/g, ' ');
  str = str.replace(/\s+$/g, '');
  let words = str.split(' ');
  return words.length;
}

export function getUniqueWords(str) { //количество уникальных слов в строке (возврат в порядке убывания количества)
  let obj = {};
  let res = [];

  str = str.toLowerCase().replace(/[^a-zа-яё]/g, ' ');
  str = str.replace(/\s+/g, ' ');
  str = str.replace(/\s+$/g, '');
  let words = str.split(' ');

  for (let word of words) {
    if (!obj[word]) {
      obj[word] = 1;
    } else {
      obj[word]++;
    }
  }

  for (let key in obj) {
    let lowObj = {};
    lowObj['слово'] = key;
    lowObj['количество'] = obj[key];
    res.push(lowObj);
  }

  res.sort((word1, word2) => word2['количество'] - word1['количество']);
  return res;
}

