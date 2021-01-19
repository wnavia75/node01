import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import router from './routes';

const app = express();

//connection
mongoose.Promise = global.Promise;

const uri = 'mongodb://mongo:27017/salomedb';
//const uri="mongodb+srv://alerick:PNfsxUIsoBAjKkis@salomedb.s1hip.mongodb.net/salomedb?retryWrites=true&w=majority";
//const uri="mongodb+srv://alerick:PNfsxUIsoBAjKkis@salomedb.s1hip.mongodb.net/salomedbtest?retryWrites=true&w=majority";

const options = {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true};
mongoose.connect(uri, options)
    .then( () => console.log('* DB connected'))
    .catch(err => console.error(err));

// middlewares
app.use(morgan('dev'));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// routes
app.use('/api', router);

// static
app.use(express.static(path.join(__dirname, 'public')));

// settings
app.set('port', process.env.PORT || 3000);

// listenning on port
app.listen(app.get('port'), () => {
    console.log("* Server on port " + app.get('port'));
  });