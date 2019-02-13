import { FORMAT_DASHES, FORMAT_SLASHES } from './constants'

export function formatNumpadValDecimal (prev, next) {
  let cleanPrev = sanitizeNumInput(removeAllLeadingZeros(prev))

  // if next we are adding, false we are deleting
  // adding/removing we always handle from the right
  const val = next ? (cleanPrev += next) : cleanPrev
  let newVal = substringNumInput(val)
  if (newVal.length === 5) {
    newVal = sliceLeadingZero(newVal)
  }
  return newVal
}

export function formatCurrencyVal (prev, next) {
  const newVal = formatNumpadValDecimal(prev, next)
  return `$${newVal}`
}

export function formatPercentVal (prev, next) {
  const newVal = formatNumpadValWholeNum(prev, next)
  return `${newVal}%`
}

export function formatWeightVal (prev, next) {
  const newVal = formatNumpadValDecimal(prev, next)
  return `${newVal} lb`
}

export function formatNumpadValWholeNum (prev, next) {
  const val = next ? (prev += next) : prev
  let newVal = substringWholeNumInput(val)
  if (newVal !== '0' && newVal.length > 1) {
    newVal = sliceLeadingZero(newVal)
  }
  return newVal
}

export function formatNumpadValWholeNumItem (prev, next) {
  const val = next ? (prev += next) : prev
  return val
}

export function sliceAndPadLeadingZero (val, pad) {
  let newVal
  if (val.length > pad) {
    newVal = val.slice(1)
  } else {
    newVal = padNumberLeadingZero(val, pad)
  }
  return newVal
}

export function padNumberLeadingZero (val, pad) {
  return val.padStart(pad, '0')
}

export function sanitizeNumInput (val) {
  const cleanVal = val.replace('.', '')
  return cleanVal
}

export function substringNumInput (val) {
  let newVal
  if (val.length === 0) {
    newVal = '0.00'
  } else if (val.length < 2) {
    newVal = '0.0' + val.substring(0)
  } else if (val.length < 3) {
    newVal = '0.' + val.substring(0)
  } else {
    newVal =
      val.substring(0, val.length - 2) + '.' + val.substring(val.length - 2)
  }
  return newVal
}

export function removeAllLeadingZeros (val) {
  return val.replace(/^0+/, '')
}

export function substringWholeNumInput (val) {
  let newVal
  if (val.length < 1) {
    newVal = '0'
  } else {
    newVal = val
  }
  return newVal
}

export function sliceLeadingZero (val) {
  if (val.charAt(0) === '0') {
    val = val.slice(1)
  }
  return val
}

export function removeLastChar (val) {
  const newVal = val.substring(0, val.length - 1)
  return newVal
}

export function stringToNum (val) {
  return +val
}

export function getPercentAsDecimal (percent, val) {
  const newVal = percent / 100 * val
  return newVal
}

export function getPercentOff (percent, val) {
  const percentOff = getPercentAsDecimal(percent, val)
  const percentAfterCalc = val - percentOff
  return roundToTwo(percentAfterCalc)
}

// NOTE: Rounding is off in JS, so I found this thread which has many anwsers
// https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary
// I took the function wholesale
// Credit: MarkG
export function roundToTwo (num) {
  return +(Math.round(num + 'e+2') + 'e-2')
}

export function formatValueToDecimal (val) {
  return val ? val.toFixed(2) : '0.00'
}

export function formatDateValue (val, type) {
  let mm = val.substring(0, 2)
  let dd = val.substring(2, 4)
  let yyyy = val.substring(4, 8)

  if (mm.length === 0) {
    mm = 'mm'
  }
  if (dd.length === 0) {
    dd = 'dd'
  }
  if (yyyy.length === 0) {
    yyyy = 'yyyy'
  }

  if (type === FORMAT_DASHES) {
    return formatDateRequest(mm, dd, yyyy)
  } else if (type === FORMAT_SLASHES) {
    return formatDateSlashes(mm, dd, yyyy)
  }
}

export function formatDateValueWithSlashes (val) {
  return formatDateValue(val, FORMAT_SLASHES)
}

export function formatDateSlashes (mm, dd, yyyy) {
  return `${mm}/${dd}/${yyyy}`
}

export function formatDateRequest (mm, dd, yyyy) {
  return `${yyyy}-${mm}-${dd}`
}

export function formatDollarsWithDecimals (amount) {
  return amount ? amount.toFixed(2) : null
}

export function formatDollarsWithDollarSign (amount) {
  return amount ? `$${formatDollarsWithDecimals(amount)}` : null
}

export function dollarsToPennies (amount) {
  return Math.round(100 * parseFloat(amount.replace(/[$,]/g, '')))
}

export function penniesToDollars (amount) {
  if (amount > 100) {
    const dollar = amount / 100
    return formatDollarsWithDecimals(dollar)
  }
  return (amount / 100).toString()
}
