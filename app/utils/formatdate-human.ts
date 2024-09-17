const americanMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const latinMonths = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

const formatDateForHumans = (date: Date | string, locale: string) => {
  const d = new Date(date);
  const month =
    locale === "en-US"
      ? americanMonths[d.getMonth()]
      : latinMonths[d.getMonth()];
  const day = d.getDate();
  const year = d.getFullYear();
  return locale === "en-US"
    ? `${month} ${day}, ${year}`
    : `${day} de ${month} de ${year}`;
};

export default formatDateForHumans;
