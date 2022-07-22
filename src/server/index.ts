import express from 'express';
import router from './routes';

const app = express();

// app.use(express.static('dist'));
app.use('/api', router);

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
