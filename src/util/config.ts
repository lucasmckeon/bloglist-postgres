import 'dotenv/config';
if (!process.env.DATABASE_URL) throw new Error('Need Database URL');
const DATABASE_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT || 3001;
export { DATABASE_URL, PORT };
