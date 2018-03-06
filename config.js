import dotenv from 'dotenv'

dotenv.load();

export const SERVER_URI = process.env.WEBHOOK_HOST;
export const WEBHOOK_RESPONSE_URI = process.env.CLIENT_HOST;
export const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
export const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
export const GAME_ACCESS_TOKEN = process.env.GAME_ACCESS_TOKEN;
