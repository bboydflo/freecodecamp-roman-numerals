(function () {
  (function clearConsole() {
    var lines = process.stdout.getWindowSize()[1];
    for (var i = 0; i < lines; i++) {
      console.log('\r\n');
    }
  })();

  /**
   * define an array of all roman numerals
   * aNumerals = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];
   * define an object map between roman numerals and their corresponding numeric values
   *
   * ====== convertToRoman algorithm ======
   * Let's take a big number as an example -> 3999. We can write this
   * number like so: 3999 = 3000 + 900 + 90 + 9, or better 3*1000 + 9*100 + 9*10 + 9*1
   * and using roman numerals results that 3999 = 3*M + 9*C + 9*X + 9*I
   * In other words: 3999 = MMM CCCCCCCCC XXXXXXXXX IIIIIIIII
   *
   * We have written 3999 as a sequence of roman numerals (using only M, C, X and I)
   * However some of these strings are incorrect (e.g. IIIIIIIII). We need
   * to apply some rules to fix these strings.
   *
   * Let's implement a function called fixMainNumeral that will fix
   * incorrect strings according to one rule:
   * "Don't use the same symbol more than 3 times in a row, unless the symbol is M"
   *
   * Therefore the sequence CCCC or IIII are incorrect but MMMM is correct.
   *
   * Now our number can be written as a sum of these correct sequences:
   * 3999 = fixMainNumeral(3, M) + fixMainNumeral(9, C) + fixMainNumeral(9, X) + fixMainNumeral(9, I)
   */
  var aNumerals = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];
  var numbersMap = {
    1: 'I',
    5: 'V',
    10: 'X',
    50: 'L',
    100: 'C',
    500: 'D'
  };

  function convertToRoman(num) {
    var finalResult = '';
    if (num >= 1000) {
      finalResult = createSequence('M', Math.floor(num / 1000));
      num = num % 1000;
    }

    // get number's digits
    var digits = getDigits(num); // [2,3,4] CC XXX IIIII
    var digitsLen = digits.length;

    var i, cRomNum;

    for (i = 0; i < digitsLen; i++) {
      cRomNum = numbersMap[Math.pow(10, digitsLen - 1 - i)];
      finalResult = finalResult + fixNumeral(digits[i], cRomNum);
    }

    return finalResult;
  };

  function getDigits(num) {
    return ('' + num).match(/[0-9]/g).map(function (d) {
      return parseInt(d, 10);
    });
  }

  function createSequence(char, times) {
    var seq = '';
    for (var i = 0; i < times; i++) {
      seq = seq + char;
    }
    return seq;
  }

  function fixNumeral(n, numeral) {
    var pos = aNumerals.indexOf(numeral);
    if(n < 4) {
      return createSequence(numeral, n);
    }

    if(n === 4) {
      return numeral + aNumerals[pos + 1];
    }

    if(n === 5) {
      return aNumerals[pos + 1];
    }

    if(n < 9) {
      return aNumerals[pos + 1] + createSequence(numeral, n - 5);
    }

    // 9
    return numeral + aNumerals[pos + 2];
  }

  var valuesToTest = {
    2: 'II',
    3: 'III',
    4: 'IV',
    5: 'V',
    9: 'IX',
    12: 'XII',
    16: 'XVI',
    29: 'XXIX',
    44: 'XLIV',
    45: 'XLV',
    68: 'LXVIII',
    83: 'LXXXIII',
    97: 'XCVII',
    99: 'XCIX',
    500: 'D',
    501: 'DI',
    649: 'DCXLIX',
    798: 'DCCXCVIII',
    891: 'DCCCXCI',
    1000: 'M',
    1004: 'MIV',
    1006: 'MVI',
    1023: 'MXXIII',
    2014: 'MMXIV',
    3999: 'MMMCMXCIX',
    4235: 'MMMMCCXXXV',
    5293: 'MMMMMCCXCIII',
    12000: 'MMMMMMMMMMMM',
    7457: 'MMMMMMMCDLVII'
  };

  var val, res, testRes;

  // loop through each key in valuesToTest
  for (val in valuesToTest) {
    testRes = 'FAIL';
    res = convertToRoman(parseInt(val,10));
    if (res === valuesToTest[val]) {
      testRes = 'PASS'
    }
    console.log(val + ' = ' + res + ' -> ' + testRes);
  }
})();