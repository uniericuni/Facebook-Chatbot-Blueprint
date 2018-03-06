import express      from 'express';
import bodyParser   from 'body-parser';
import morgan       from 'morgan';

import index        from './routes/index';
import webhooks     from './routes/webhooks';
import games        from './routes/games';

const app = express().use(bodyParser.json());
const logger = morgan('dev');


// --- Web App --- //
app.listen(process.env.PORT || 1337, () => console.log('[webhook initialization] webhook is listening'));

// --- Logger --- //
app.use(logger);

// --- Routes --- //
app.use('/', index);
app.use('/webhook', webhooks);
