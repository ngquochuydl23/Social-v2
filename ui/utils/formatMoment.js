export const formatRelativeTime = {
  future: "in %s",
  past: "%s",

  s: function (number, withoutSuffix, key, isFuture) {
    return number.toString() + " " + ((number < 2) ? 'second' : "seconds")
  },
  m: function (number, withoutSuffix, key, isFuture) {
    return number.toString() + " " + ((number < 2) ? 'minute' : "minutes")
  },
  h: function (number, withoutSuffix, key, isFuture) {
    return number.toString() + " " + ((number < 2) ? 'hour' : "hours")
  },
  d: function (number, withoutSuffix, key, isFuture) {
    return number.toString() + " " + ((number < 2) ? 'day' : "days")
  },
  M: function (number, withoutSuffix, key, isFuture) {
    return number.toString() + " " + ((number < 2) ? 'month' : "months")
  },
  y: function (number, withoutSuffix, key, isFuture) {
    return number.toString() + " " + ((number < 2) ? 'year' : "years")
  },
  hh: "%d hours",
  mm: "%d minutes",
  dd: "%d days",
  MM: "%d months",
  yy: "%d years"
}