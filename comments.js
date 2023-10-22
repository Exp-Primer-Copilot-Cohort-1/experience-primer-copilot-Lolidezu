//Create web server
const path = require('path');
const fs = require('fs');
const path = require('path');
const fs = require('fs');
const jsonFile = require('jsonfile');
const bodyParser = require('body-parser');
const port = 3000;

//Set up body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Set up public directory
app.use(express.static(path.join(__dirname, 'public')));const bodyParser = require('body-parser');

//Set port
const port = 3000;

//Use body-parser to parse request body
app.use(bodyParser.urlencoded({ extended: false }));

//Use static files
app.use(express.static('public'));

//Set view engine
app.set('view engine', 'ejs');

//Set views directory
app.set('views', path.join(__dirname, 'views'));

//Set comments file
const commentsFile = path.join(__dirname, 'comments.json');

//Read comments file
let comments = JSON.parse(fs.readFileSync(commentsFile, 'utf8'));

//Set route for home page
app.get('/', (req, res) => {
    res.render('index', { comments: comments });
});

//Set route for form submission
app.post('/', (req, res) => {
    //Create new comment object
    let newComment = {
        name: req.body.name,
        comment: req.body.comment,
        timestamp: new Date().toString()
    }

    //Add new comment to comments array
    comments.push(newComment);

    //Save comments to comments file
    fs.writeFileSync(commentsFile, JSON.stringify(comments));

    //Render index page with updated comments array
    res.render('index', { comments: comments });
});

//Start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});


