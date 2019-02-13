import {
  formatNumpadValDecimal,
  formatNumpadValWholeNum,
  formatNumpadValWholeNumItem,
  sanitizeNumInput,
  substringNumInput,
  substringWholeNumInput,
  sliceLeadingZero,
  removeLastChar,
  stringToNum,
  getPercentAsDecimal,
  getPercentOff,
  formatValueToDecimal,
  formatDateValue,
  formatDateSlashes,
  formatDateRequest,
  sliceAndPadLeadingZero,
  padNumberLeadingZero,
  formatPercentVal,
  formatCurrencyVal,
  formatDateValueWithSlashes,
  formatWeightVal,
  formatDollarsWithDecimals,
  formatDollarsWithDollarSign,
  dollarsToPennies,
  penniesToDollars,
} from '../numHelper'

describe('formatNumpadValDecimal::', () => {
  it('should format numPad to decimal string NEXT is true, addition', () => {
    const prev = '102'
    const next = '3'
    const res = formatNumpadValDecimal(prev, next)
    expect(res).toEqual('10.23')
  })

  it('should format numPad to decimal string NEXT is false, no change', () => {
    const prev = '102'
    const res = formatNumpadValDecimal(prev)
    expect(res).toEqual('1.02')
  })

  it('should remove the leading zeros off a string of numbers', () => {
    const prev = '001'
    const res = formatNumpadValDecimal(prev)
    expect(res).toEqual('0.01')
  })
})

describe('formatCurrencyVal', () => {
  it('should return a formatted currency string', () => {
    const formattedCurrency = formatCurrencyVal('80')
    expect(formattedCurrency).toEqual('$0.80')
  })
})

describe('formatPercentVal', () => {
  it('should return a formatted percent string', () => {
    const formattedPercent = formatPercentVal('80')
    expect(formattedPercent).toEqual('80%')
  })
})

describe('formatWeightVal', () => {
  it('should return a formatted weight value', () => {
    const formattedWeight = formatWeightVal('80')
    expect(formattedWeight).toEqual('0.80 lb')
  })
})

describe('formatNumpadValWholeNum::', () => {
  it('should format numPad to whole number string NEXT is true, addition', () => {
    const prev = '102'
    const next = '2'
    const res = formatNumpadValWholeNum(prev, next)
    expect(res).toEqual('1022')
  })

  it('should format numPad to whole number string NEXT is false, no change', () => {
    const prev = '102'
    const res = formatNumpadValWholeNum(prev)
    expect(res).toEqual('102')
  })

  it('should not slice leading zero when the value is 0 and length is 1', () => {
    const prev = '0'
    const res = formatNumpadValWholeNum(prev)
    expect(res).toEqual('0')
  })
})

describe('formatNumpadValWholeNumItem::', () => {
  it('should format numPad to whole number string NEXT is true, addition', () => {
    const prev = '102'
    const next = '2'
    const res = formatNumpadValWholeNumItem(prev, next)
    expect(res).toEqual('1022')
  })

  it('should format numPad to whole number string NEXT is false, no change', () => {
    const prev = '102'
    const res = formatNumpadValWholeNumItem(prev)
    expect(res).toEqual('102')
  })

  it('should return an empty sting when passed as empty', () => {
    const prev = ''
    const res = formatNumpadValWholeNumItem(prev)
    expect(res).toEqual('')
  })
})

describe('sanitizeNumInput::', () => {
  it('should sanitize input removing decimal', () => {
    const val = '1.02'
    const res = sanitizeNumInput(val)
    expect(res).toEqual('102')
  })
})

describe('substringNumInput::', () => {
  it('should return the new value equal to 0.00 when val === 0', () => {
    const val = ''
    const res = substringNumInput(val)
    expect(res).toEqual('0.00')
  })
  it('should prepend 0.0 when val length is less than 2', () => {
    const val = '3'
    const res = substringNumInput(val)
    expect(res).toEqual('0.03')
  })

  it('should prepend 0. when val length is less than 3', () => {
    const val = '23'
    const res = substringNumInput(val)
    expect(res).toEqual('0.23')
  })

  it('should add a decimal 2 places from the right when length is greater than 3', () => {
    const val = '323'
    const res = substringNumInput(val)
    expect(res).toEqual('3.23')
  })
})

describe('substringWholeNumInput::', () => {
  it('should return 0 when val length is < 1', () => {
    const val = ''
    const res = substringWholeNumInput(val)
    expect(res).toEqual('0')
  })

  it('should return the val when length is > 1', () => {
    const val = '12'
    const res = substringWholeNumInput(val)
    expect(res).toEqual('12')
  })
})

describe('sliceLeadingZero::', () => {
  it('should slide the leading 0', () => {
    const val = '020'
    const res = sliceLeadingZero(val)
    expect(res).toEqual('20')
  })
})

describe('removeLastChar::', () => {
  it('should remove the last character', () => {
    const val = '320'
    const res = removeLastChar(val)
    expect(res).toEqual('32')
  })
})

describe('stringToNum::', () => {
  it('should convert a string to a number', () => {
    const res = stringToNum('55')
    expect(res).toEqual(55)
  })

  it('should convert a string to a number', () => {
    const res = stringToNum('0.55')
    expect(res).toEqual(0.55)
  })

  it('should convert a string to a number', () => {
    const res = stringToNum('.5')
    expect(res).toEqual(0.5)
  })
})

describe('getPercentAsDecimal::', () => {
  it('should handle turning a percent and value passed into percent', () => {
    const percent = '2'
    const val = '100'
    const res = getPercentAsDecimal(percent, val)
    expect(res).toEqual(2)
  })

  it('should handle turning a percent and value passed into percent with decimal', () => {
    const percent = '.2'
    const val = '90'
    const res = getPercentAsDecimal(percent, val)
    expect(res).toEqual(0.18)
  })
})

describe('getPercentOff::', () => {
  it('should test returning the correct format with value minus the percent off, test 1', () => {
    const percent = '2'
    const val = '90'
    const res = getPercentOff(percent, val)
    expect(res).toEqual(88.2)
  })

  it('should test returning the correct format with value minus the percent off, test 2', () => {
    const percent = '30'
    const val = '340'
    const res = getPercentOff(percent, val)
    expect(res).toEqual(238)
  })
})

describe('formatValueToDecimal::', () => {
  it('should test returning decimal places from numbers, single digit', () => {
    const val = 1
    const res = formatValueToDecimal(val)
    expect(res).toEqual('1.00')
  })

  it('should test returning decimal places from numbers, digit with decimal', () => {
    const val = 1.1
    const res = formatValueToDecimal(val)
    expect(res).toEqual('1.10')
  })

  it('should test returning decimal places from numbers, large number single digit', () => {
    const val = 10000.1
    const res = formatValueToDecimal(val)
    expect(res).toEqual('10000.10')
  })

  it('should test null/undefined', () => {
    const res = formatValueToDecimal()
    expect(res).toEqual('0.00')
  })
})

describe('formatDateValue::', () => {
  it('should verify return DEFAULT format when type is slashes', () => {
    const val = ''
    const res = formatDateValue(val, 'slashes')
    expect(res).toEqual('mm/dd/yyyy')
  })

  it('should verify return DEFAULT format when type is dashes', () => {
    const val = ''
    const res = formatDateValue(val, 'dashes')
    expect(res).toEqual('yyyy-mm-dd')
  })

  it('should verify return UNDEFINED format when type is no match', () => {
    const val = ''
    const res = formatDateValue(val, 'nomatch')
    expect(res).toEqual(undefined)
  })

  it('should verify return formated when type is slashes', () => {
    const val = '01012001'
    const res = formatDateValue(val, 'slashes')
    expect(res).toEqual('01/01/2001')
  })

  it('should verify return formated when type is dashes', () => {
    const val = '01012001'
    const res = formatDateValue(val, 'dashes')
    expect(res).toEqual('2001-01-01')
  })
})

describe('formatDateSlashes::', () => {
  it('should verify return value', () => {
    const res = formatDateSlashes('01', '01', '2001')
    expect(res).toEqual('01/01/2001')
  })
})

describe('formatDateRequest::', () => {
  it('should verify return value', () => {
    const res = formatDateRequest('01', '01', '2001')
    expect(res).toEqual('2001-01-01')
  })
})

describe('sliceAndPadLeadingZero::', () => {
  it('should verify return value when passing pad value lesser than the length of string to format', () => {
    const res = sliceAndPadLeadingZero('1010001', 2)
    expect(res).toEqual('010001')
  })

  it('should verify return value when passing pad value greater than the length of string to format', () => {
    const res = sliceAndPadLeadingZero('123', 12)
    expect(res).toEqual('000000000123')
  })

  it('should verify return value when passing pad value same as the length of string to format so no zeros are shown', () => {
    const res = sliceAndPadLeadingZero('123456', 6)
    expect(res).toEqual('123456')
  })
})

describe('padNumberLeadingZero::', () => {
  it('should verify return value when passing pad value', () => {
    const res = padNumberLeadingZero('123', 12)
    expect(res).toEqual('000000000123')
  })
})

describe('formatDateValueWithSlashes', () => {
  it('should format the value as a mm/dd/yyyy', () => {
    expect(formatDateValueWithSlashes('01011901')).toEqual('01/01/1901')
  })
})

describe('formatDollarsWithDecimals::', () => {
  it('should format a value passed to a string with 2 decimal places', () => {
    const val = 1.2
    const res = formatDollarsWithDecimals(val)
    expect(res).toEqual('1.20')
  })

  it('should not format if decimal is 2 places', () => {
    const val = 1.22
    const res = formatDollarsWithDecimals(val)
    expect(res).toEqual('1.22')
  })

  it('should handle null appropriately', () => {
    const val = null
    const res = formatDollarsWithDecimals(val)
    expect(res).toEqual(null)
  })
})

describe('formatDollarsWithDollarSign::', () => {
  it('should return back formatted dollars with dollar sign when amount is passed', () => {
    const res = formatDollarsWithDollarSign(1.21)
    expect(res).toEqual('$1.21')
  })

  it('should return back null when no amount is passed', () => {
    const res = formatDollarsWithDollarSign()
    expect(res).toEqual(null)
  })
})

describe('dollarsToPennies::', () => {
  it('should convert a simple value into pennies', () => {
    const val = '1.21'
    const res = dollarsToPennies(val)
    expect(res).toEqual(121)
  })

  it('should convert a value with dollar sign and decimal into pennies', () => {
    const val = '$100.41'
    const res = dollarsToPennies(val)
    expect(res).toEqual(10041)
  })

  it('should take a large formatted dollar value, with dollar sign and decimal into pennies', () => {
    const val = '$1,012,432.00'
    const res = dollarsToPennies(val)
    expect(res).toEqual(101243200)
  })
})

describe('penniesToDollars::', () => {
  it('should convert pennies to dollars > 100 = 1000', () => {
    const amount = 1000
    const res = penniesToDollars(amount)
    expect(res).toEqual('10.00')
  })

  it('should convert pennies to dollars > 100 = 1001', () => {
    const amount = 1001
    const res = penniesToDollars(amount)
    expect(res).toEqual('10.01')
  })

  it('should convert pennies to dollars > 100 = 20000', () => {
    const amount = 20000
    const res = penniesToDollars(amount)
    expect(res).toEqual('200.00')
  })

  it('should convert pennies to dollars > 100 = 30452', () => {
    const amount = 30452
    const res = penniesToDollars(amount)
    expect(res).toEqual('304.52')
  })

  it('should convert pennies to dollars < 100', () => {
    const amount = 59
    const res = penniesToDollars(amount)
    expect(res).toEqual('0.59')
  })
})
