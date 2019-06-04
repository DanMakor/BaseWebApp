import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Account from './models/Account';

const app = express();
export const router = express.Router();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/SavingsApp', { useNewUrlParser: true }).catch(function(err) { console.log(err); });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

app.use(router);
app.listen(3000, () => console.log(`Express server running on port 3000`));

router.route('/api/registry-items/delete/:id').get((req, res) => {
    RegistryItem.findByIdAndRemove({_id: req.params.id}, (err, registryItem) => {
        if (err)
            res.json(err);
        else
            res.json('Removed successfully');
    });
});

router.route('/api/accounts/add').post((req, res) => {
    let account = new Account(req.body);
    account.save()
        .then(account => {
            res.status(200).json({'category': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

router.route('/api/accounts').get((req, res) => {
    Account.find((err, accounts) => {
        if (err)
            console.log(err);
        else
            console.log(res.header);
            res.json(accounts);
    });
});
