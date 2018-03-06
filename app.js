import express      from 'express';
import bodyParser   from 'body-parser';
import morgan       from 'morgan';

import index        from './routes/index';
import webhooks     from './routes/webhooks';
import games        from './routes/games';


// --- Web App --- //
const app = express().use(bodyParser.json());

app.listen(process.env.PORT || 1337, () => console.log('[webhook initialization] webhook is listening'));

// --- Logger --- //
// app.use(morgan('dev'));

// --- Routes --- //
app.use('/', index);
app.use('/webhook', webhooks);
app.use('/games', games);
