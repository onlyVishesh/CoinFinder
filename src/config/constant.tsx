export const supportedCurrencies = [
  "btc",
  "eth",
  "ltc",
  "bch",
  "bnb",
  "eos",
  "xrp",
  "xlm",
  "link",
  "dot",
  "yfi",
  "usd",
  "aed",
  "ars",
  "aud",
  "bdt",
  "bhd",
  "bmd",
  "brl",
  "cad",
  "chf",
  "clp",
  "cny",
  "czk",
  "dkk",
  "eur",
  "gbp",
  "gel",
  "hkd",
  "huf",
  "idr",
  "ils",
  "inr",
  "jpy",
  "krw",
  "kwd",
  "lkr",
  "mmk",
  "mxn",
  "myr",
  "ngn",
  "nok",
  "nzd",
  "php",
  "pkr",
  "pln",
  "rub",
  "sar",
  "sek",
  "sgd",
  "thb",
  "try",
  "twd",
  "uah",
  "vef",
  "vnd",
  "zar",
  "xdr",
  "xag",
  "xau",
  "bits",
  "sats",
];

export function nFormatter(num: number, digits: number) {
  var si = [
      { value: 1e18, symbol: "E" },
      { value: 1e15, symbol: "P" },
      { value: 1e12, symbol: "T" },
      { value: 1e9, symbol: "G" },
      { value: 1e6, symbol: "M" },
      { value: 1e3, symbol: "k" },
    ],
    i;
  for (i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (
        (num / si[i].value)
          .toFixed(digits)
          .replace(/$|(\.[0-9]*[1-9])0+$/, "$1") + si[i].symbol
      );
    }
  }
  return num.toString();
}

export const formatCurrency = (value: number, currency: string): string => {
  if (value === null || value === undefined) return "N/A";

  const isIndianCurrency = currency === "inr";
  const absoluteValue = Math.abs(value);
  const suffixes = isIndianCurrency ? ["", "k", "Lac.", "Cr.", "Cr."] : ["", "K", "M", "B", "T"];

  let suffix = "";
  let formattedValue = value;

  if (absoluteValue >= 1_000_000_000_000) {
    formattedValue = value / 1_000_000_000;
    suffix = suffixes[4]; }
  else if (absoluteValue >= 1_000_000_000) {
    formattedValue = value / 1_000_000_000;
    suffix = suffixes[3]; 
  } else if (absoluteValue >= 1_000_000) {
    formattedValue = value / 1_000_000;
    suffix = suffixes[2]; 
  } else if (absoluteValue >= 1_000) {
    formattedValue = value ;
    suffix = suffixes[0]; 
  } else {
    formattedValue = value;
  }

  return `${formattedValue.toLocaleString("en-US", {
    style: "currency",
    currency: currency,
  })} ${suffix}`;
};


export function getISODate(date:Date) {
  return date.toLocaleDateString("sv-SE");
}