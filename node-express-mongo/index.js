const express=require('express');
const bodyParser = require('body-parser');
const path=require('path');
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
const mongojs = require('mongojs');

const db = mongojs('customerapp', ['users']);
const app = express();

const ObjectId = mongojs.ObjectId;

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Static Resources
app.use(express.static(path.join(__dirname, 'public')));

// Global for Error message
app.use(function(req, res, next){
    res.locals.errors = null;
    next();
})

app.get('/', function(req, res){
  // res.send('Hello wrold');
  db.users.find(function (err, docs){
    // console.log(docs);
    res.render('index', {
     title: 'Customers',
     users: docs
 });
});


});

app.post('/users/add', [
    check('email')
    .isEmail().withMessage('must be valid email')
    .trim()
    .normalizeEmail(),

    check('first_name')
    .isLength({min: 2})
    .exists(),

    check('last_name')
    .isLength({min: 2})
    .exists()
    ],

    (req, res, next) => {

        // Get the validation result whenever you want; see the Validation Result API for all options!
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // return res.status(422).json({ errors: errors.mapped() });
            // res.render('index', {
            //     title: 'Customers',
            //     users: users,
            //     errors: errors.array()

            db.users.find(function (err, docs){
                // console.log(docs);
                res.render('index', {
                    title: 'Customers',
                    users: docs,
                    errors: errors,
                 });
            });
        }
        else {
            // matchedData returns only the subset of data validated by the middleware
            const user = matchedData(req);
            // createUser(user).then(user => res.json(user));
            // res.send('Got a POST request');

            const newUser = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email
            };

            db.users.insert(newUser, function( err, res ){
                if (err) {
                    console.log(err);
                }
            });
            res.redirect('back');
        }
    }
);

app.delete('/users/delete/:id', function(req, res){
    // console.log(req.params.id);
    db.users.remove({_id: ObjectId(req.params.id)}, function(err, result){
        if(err) {
            console.log(err);
        }
        res.redirect('back');
    });
});

app.listen(3000, function(){
   console.log('Server on 3000');
});
