import express      from 'express';
import bodyParser   from 'body-parser';
import morgan       from 'morgan';
import dotenv       from 'dotenv'

import index        from './routes/index';
import webhooks     from './routes/webhooks';

dotenv.load();

const app = express().use(bodyParser.json());
const logger = morgan('[webhook event] :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]')


// --- Web App --- //
app.listen(process.env.PORT || 1337, () => console.log('[webhook initialization] webhook is listening'));

// --- Logger --- //
app.use(logger);

// --- Routes --- //
app.use('/', index);
app.use('/webhook', webhooks);
