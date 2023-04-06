const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const md5 = require('md5');
const mongoose = require('mongoose');
const app = express();

mongoose.set('strictQuery', true)

mongoose.connect("mongodb+srv://saprakaran001:Iamphenomenol1@cluster0.zh2hwyx.mongodb.net/?retryWrites=true&w=majority")
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }))


const User = new mongoose.Schema({
    Name: { type: String },
    PhnNum: { type: Number },
    email: { type: String },
    Message: { type: String }
})

const TestUsers = new mongoose.Schema({
    Message: { type: String },
    User_Name: { type: String }
})

const Plans = new mongoose.Schema({
    Plans_Obj: Object
})

const newPlan = mongoose.model('newPlan', Plans)
const NewTestUsers = mongoose.model('NewTestUsers', TestUsers);
const NewUser = mongoose.model('NewUser', User);



var BeginPlan = [

    [
        {
            "title" : "Day 1"
        },
        " Barbell Bench Press (4 sets of 8 reps)",
        " Incline Dumbbell Press (3 sets of 10 reps)",
        " Pull-Ups (4 sets of 6 reps)",
        " Barbell Rows (3 sets of 10 reps)",
        " Seated Dumbbell Shoulder Press (3 sets of 10 reps)"
    ],
    [
        {
            "title" : "Day 2"
        },
        "  Sprints (20-30 seconds each)",
        "  Box Jumps (10-15 reps)",
        "  Battle Ropes (20-30 seconds)",
        "  Burpees (10-15 reps)"
    ],
    [
        {
            "title" : "Day 3"
        },
        "Rest"
    ],
    [
        {
            "title" : "Day 4"
        },
        "quats (4 sets of 8 reps)",
        "Deadlifts (3 sets of 6 reps)",
        "Lunges (3 sets of 10 reps)",
        "Leg Press (3 sets of 10 reps)",
        "Calf Raises (3 sets of 12 reps)"
    ],
    [
        {
            "title" : "Day 5"
        },
        "Rowing Machine (20-30 minutes)",
        "Kettlebell Swings (20-30 minutes)",
        "Push Ups (50-100 )"
    ],
    [
        {
            "title" : "Day 6"
        },
        [
            "Rest"
        ]
    ],
    [
        {
            "title" : "Day 7"
        },
        "Yoga or Stretching"
    ]

]
   
  




app.post('/', (req, res) => {
    var UserObj = {
        Name: req.body.name,
        PhnNum: req.body.phone,
        email: req.body.email,
        Message: req.body.message
    }
    NewUser.insertMany(UserObj)
        .then((docs) => {
            console.log(docs);
            console.log("Success");
            res.render('main')
        })
        .catch((err) => {
            console.log(err);
        })

})
app.post('/about/newtestusers', (req, res) => {
    var Test_monial = new NewTestUsers({
        Message: req.body.Usermessage,
        User_Name: req.body.Username
    })
    NewTestUsers.insertMany(Test_monial)
        .then((docs) => {
            console.log(docs);
            console.log("Posted Successfully");
            res.redirect('/about')
        })
})

app.post('/about', (req, res) => {
    var UserObj = new NewUser({
        Name: req.body.name,
        PhnNum: req.body.phone,
        email: req.body.email,
        Message: req.body.message
    })
    NewUser.insertMany(UserObj)
        .then((docs) => {
            // console.log(docs);
            console.log("Success");
            res.redirect('/about')
        })
        .catch((err) => {
            console.log(err);
        })

})

app.post('/contact', (req, res) => {
    var UserObj = {
        Name: req.body.name,
        PhnNum: req.body.phone,
        email: req.body.email,
        Message: req.body.message
    }
    NewUser.insertMany(UserObj)
        .then((docs) => {
            // console.log(docs);
            console.log("Success");
            res.render('contact')
        })
        .catch((err) => {
            console.log(err);
        })

})








app.get('/about/newtestusers', (req, res) => {
    async function search() {
        NewTestUsers.find({})

            .then((docs) => {
                console.log(docs);
                console.log("Found");
                res.render('About', { Test: docs })

            })

    }
    search()
})

app.get('/about', (req, res) => {
    async function search() {
        NewTestUsers.find({})

            .then((docs) => {
                console.log(docs);
                console.log("Found");
                res.render('About', { Test: docs })

            })

    }
    search()
})

app.get('/plans', (req, res) => {
    res.render('plans')
})

app.get('/', (req, res) => {
    res.render('main')
})
app.get('/intermediate', (req, res) => {
    //   var PlanObj = {
    //     Plans_Obj: BeginPlan
    // }
    // console.log(typeof (BeginPlan));
    // newPlan.insertMany(PlanObj)
    //     .then((docs) => {
    //         console.log(docs);
    //     })
    newPlan.find({})
        .then((docs) => {
            console.log(docs);
            res.render('Intermediate', { Plan: docs })

        })
})

app.get('/begin', (req, res) => {
    // var PlanObj = {
    //     Plans_Obj: BeginPlan
    // }
    // console.log(typeof (BeginPlan));
    // newPlan.insertMany(PlanObj)
    //     .then((docs) => {
    //         console.log(docs);
    //     })
    newPlan.find({})
        .then((docs) => {
            console.log(docs);
            res.render('Begin', { Plan: docs })

        })
})

app.get('/advance', (req, res) => {
    // var PlanObj = {
    //     Plans_Obj: BeginPlan
    // }
    // console.log(typeof (BeginPlan));
    // newPlan.insertMany(PlanObj)
    //     .then((docs) => {
    //         console.log(docs);
    //     })
    newPlan.find({})
        .then((docs) => {
            console.log(docs);
            res.render('Advance', { Plan: docs })

        })
})

app.get('/contact', (req, res) => { res.render('contact') })
app.listen(3000, (req, res) => {
    console.log('Running');
})