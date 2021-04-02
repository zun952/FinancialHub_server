import 'source-map-support/register';
import express from './Express';

const port: number = Number(process.env.PORT) || 3000;
const app = express.bootstrap();

app.listen(port, () => console.log(`Express server listening at ${port}`))
    .on('error', (err) => console.error(err));