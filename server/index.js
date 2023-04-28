const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');


require('dotenv').config();


const rootController = require('./controllers/Root');
const lotteryController = require('./controllers/Lottery');
const memberController = require('./controllers/Member');


const memberRouting = express.Router();
const membersRouting = express.Router();
const loteryRouting = express.Router();


const app = express();

app.use(cors({
    preflightContinue: true,
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(rootController.isjson);
app.use(rootController.is500);




memberRouting.get('/myid', memberController.showClientId);
memberRouting.get('/:client', memberController.getClients);
memberRouting.put('/:client/iswinner', memberController.updateClient);
memberRouting.post('/', memberController.setClientId);


membersRouting.post('/', memberController.getClients);
membersRouting.get('/winners', memberController.getWinners);


loteryRouting.get('/', lotteryController.about);
loteryRouting.get('/winners', lotteryController.getWinners);
loteryRouting.post('/try', lotteryController.newTry);
loteryRouting.post('/try/roll', lotteryController.justTry);



app.use('/member', memberRouting);
app.use('/members', membersRouting);
app.use('/lottery', loteryRouting);



app.get('*', rootController.is404);

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});
