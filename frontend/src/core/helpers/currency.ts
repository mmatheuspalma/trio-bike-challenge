/**
 * Formats value to currency notation
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
 *
 * @param {number} value
 * @param {string} currency Currency Acronym (EUR, USD, BRL)
 * @returns {string}
 */
export function formatCurrency(value: number, currency: string): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    currencyDisplay: 'symbol',
    maximumFractionDigits: value % 1 > 0 ? 2 : 0
  })

  const parts = formatter.formatToParts(value)

  const currencyLabel = parts.find(({ type }) => type === 'currency')!.value
  const formattedValue = parts
    .filter(({ type }) => type !== 'currency')
    .map(({ value }) => value)
    .reduce((string, part) => string + part)

  return `${formattedValue} ${currencyLabel}`
}
