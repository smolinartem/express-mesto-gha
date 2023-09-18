require('dotenv').config();

const URL_REGEX = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb', JWT_SECRET = 'secret' } = process.env;

module.exports = {
  URL_REGEX, PORT, DB_URL, JWT_SECRET,
};
