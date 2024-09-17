const locale: { [key: string]: string } = {
  USD: "en-US",
  GBP: "en-GB",
  EUR: "de-DE",
  MXN: "es-MX",
};

const formatCurrency = (amount: number, currency: string) => {
  return Number(amount).toLocaleString(locale[currency], {
    style: "currency",
    currency: currency,
  });
};

export default formatCurrency;
