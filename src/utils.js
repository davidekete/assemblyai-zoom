function getFormattedDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const timestamp = Date.now();
  return `${year}${month}${day}_${timestamp}`;
}

module.exports = { getFormattedDateTime };
