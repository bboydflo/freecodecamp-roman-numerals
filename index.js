(function() {

  // clear console
  function clearConsole() {
    var lines = process.stdout.getWindowSize()[1];
    for (var i = 0; i < lines; i++) {
      console.log('\r\n');
    }
  }

  clearConsole();

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
    5293: 'MMMMMCCXCIII'
  };

  var numerals = ['M', 'D', 'C', 'L', 'X', 'V', 'I'];
  // var numerals = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];
  // I II III IV V VI VII VIII IX X
  var numbersToNumerals = {
    1: 'I',
    5: 'V',
    10: 'X',
    50: 'L',
    100: 'C',
    500: 'D',
    1000: 'M'
  };

  function generateNumeral(number, n) {
    var i;
    var res = '';
    var n1 = 'M';
    var n2 = 'M';
    if(n == 'I') {
      n1 = 'V';
      n2 = 'X';
    }
    if (n == 'X') {
      n1 = 'L';
      n2 = 'C';
    }
    if (n == 'C') {
      n1 = 'D';
      n2 = 'M';
    }

    if (number < 4) {
      for (i=0; i<number; i++) {
        res = res + n;
      }
    }
    if (number == 4) {
      if(n == 'M') {
        for(i=0; i<number; i++) {
          res += n;
        }
      } else {
        res = n + n1;
      }
    }
    if (number == 5) {
      if (n == 'M') {
        for (i = 0; i<number; i++) {
          res += n;
        }
      } else {
        res = n1;
      }
    }
    if (number > 5 && number < 9) {
      if (n == 'M') {
        for (i = 0; i < number; i++) {
          res += n;
        }
      } else {
        res = n1;
        for (i = 5; i < number; i++) {
          res += n;
        }
      }
    }
    if (number == 9) {
      res = n + n2;
    }

    return res;
  }

  function fixRomanNumeral(n) {
    return n;
  }

  /**
   * method to convert a maximum four digits number to a roman numeral
   * for example 3999 -> MMMCMXCIX
   * @param {int} number
   */
  function convert(number) {

    // get number's digits. example [3, 9, 9, 9]
    var digits = getDigits(number);

    // final roman numeral array
    var romanNum = [];

    var i, j;

    // loop through each digit
    for (i=0; i<digits.length; i++) {
      var pos = digits.length - 1 - i;
      var tenPow = Math.pow(10, pos);

      // current roman numeral
      var cRomNum = numbersToNumerals[tenPow];

      // get index of current roman numeral
      var cRomNumIdx = numerals.indexOf(cRomNum);

      // romanNum.push(generateNumeral(digits[i], cRomNum));

      for(j=0; j<digits[i]; j++) {
        romanNum.push(cRomNum);
      }

      /* var limit1 = numerals[cRomNumIdx - 1] || cRomNum;
      var limit2 = numerals[cRomNumIdx - 2] || cRomNum;

      if (digits[i] < 4) {
        for(j=0; j<digits[i]; j++) {
          romanNum.push(cRomNum);
        }
      }
      if (digits[i] == 4) {
        romanNum.push(cRomNum);
        romanNum.push(limit1);
      }
      if (digits[i] == 5) {
        romanNum.push(limit1);
      }
      if (digits[i] > 5 && digits[i] < 9) {
        romanNum.push(limit1);
        for(j=0; j<digits[i]-5; j++) {
          romanNum.push(cRomNum);
        }
      }
      if(digits[i] == 9) {
        romanNum.push(cRomNum);
        romanNum.push(limit2);
      } */
    }

    // string roman numeral
    var stringRomanNumeral = romanNum.join('');

    // fix roman numeral string
    return fixRomanNumeral(stringRomanNumeral);

    // console.log(finalRomNum);
    // return stringRomanNumeral;
  }

  // main roman numerals
  var mainRomanNumerals = {
    1: 'I',
    10: 'X',
    100: 'C',
    1000: 'M'
  };

  // secondary roman numerals
  var secRomanNumerals = {
    5: 'V',
    50: 'L',
    500: 'D'
  };

  // get digits out of number
  function getDigits(num) {
    return ('' + num).match(/[0-9]/g).map(function(d) {
      return parseInt(d, 10);
    });
    // .reverse();
  }

  function addNumeralOld(src, num, x) {
    var i;
    for (i=0; i<x; i++) {
      src.push(num);
    }
    return src;
  }

  /**
   * method to convert a maximum four digits number to a roman numeral
   * for example 3999 -> MMMCMXCIX
   * @param {int} number
   */
  function convertToRomanNumeral(number) {

    // get number's digits
    var digits = getDigits(number);
    console.log(digits);

    // final roman numeral array
    var finalRomNum = [];

    // start looping through the digits from this position
    var i;

    // loop through each digit and build the result
    for (i=0; i<digits.length; i++) {
      /**
       * get the roman value for the current digit
       * for example if i=0 -> roman value = Math.pow(10, digits.length - i)
       */
      var pos = digits.length - 1 - i;

      // current main numeral value. can be one of ['I', 'X', 'C', 'M']
      // var cMainNumeral = romanNumerals[Math.pow(10, pos)];

      var tenPow = Math.pow(10, pos);

      if (digits[i] < 5) {

        /**
         * add to the final roman numeral the current roman numeral repeated
         * the digit itself tels how many times the numeral should be repeated
         */
        addNumeral(finalRomNum, mainRomanNumerals[tenPow], digits[i]);
      } else if (digits[i] == 5) {

        // add corresponding secondary roman numeral
        addNumeral(finalRomNum, secRomanNumerals[5 * tenPow], 1);
      } else {

        // 90 = 50 + 40

        // add corresponding secondary roman numeral
        addNumeral(finalRomNum, secRomanNumerals[5 * tenPow], 1);

        // log
        // console.log('ten pow:', tenPow);

        // calculate remaining number
        var remainingNumber = (digits[i] - 5) * tenPow;

        finalRomNum.push(
          convertToRomanNumeral(remainingNumber)
        );
      }
    }

    // console.log(finalRomNum);
    return finalRomNum.join('');
  }

  // test function
  function test(testObj) {
    var val, res, testRes;

    // test values
    for (val in testObj) {
      if (valuesToTest.hasOwnProperty(val)) {
        // res = convertToRomanNumeral(val);
        res = convert(val);
        if (res == testObj[val]) {
          testRes = 'PASS'
        } else {
          testRes = 'FAIL'
        }
        console.log(val + ' = ' + res + ' -> ' + testRes);
      }
    }
  }

  // test values
  test(valuesToTest);
})();
