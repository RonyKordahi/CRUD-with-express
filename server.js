// Packages used
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

// The port of the server
const PORT = 8000;

// Data
const people = [
    { name: "Rony Kordahi", age: 32, hobby: "video games", id: 1 },
    { name: "Arthur Dent", age: 42, hobby: "drinking tea", id: 2 },
    { name: "Ash Ketchum", age: 12, hobby: "catching pokemon", id: 3 },
    { name: "James Brown", age: 42, hobby: "motor racing", id: 4 },
    { name: "Taylor Swift", age: 33, hobby: "making bank", id: 5 },
    { name: "Robin Hood", age: 28, hobby: "stealing from the rich and giving to the poor", id: 6 },
]

// Creating the epxress server
const app = express();

// Setting the view engine
app.set('view engine', 'ejs');

// ********** //
// Middleware //
// ********** //
app.use(helmet());
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: true }));

// ************ //
// Get Endpoint //
// ************ //

// Displays all the people
app.get("/people", (req, res) => {
    // const data = { people };
    const data = { "people": people }

    res.render("people/index", data);
})

// Displays the form to add a person
app.get("/people/add", (req, res) => {
    res.render("people/create-person");
})

// Renders the form that lets us delete the person
app.get("/people/delete/:id", (req, res) => {

    const id = req.params.id;

    const requestedPerson = people.find((person) => {
        return person.id === Number(id);
    })

    const data = { person: requestedPerson };

    res.render("people/delete-person", data);
})

// Renders the form that lets us edit the person
app.get("/people/edit/:id", (req, res) => {

    const id = req.params.id;


    const requestedPerson = people.find((person) => {
        return person.id === Number(id);
    })

    const data = { person: requestedPerson };

    res.render("people/edit-person", data);
})

// Displays the details of one person
app.get("/people/:id", (req, res) => {

    // const { id } = req.params;
    const id = req.params.id;

    const requestedPerson = people.find((person) => {
        return person.id === Number(id);
    })

    const data = { person: requestedPerson };

    res.render("people/person", data);

})

// ************* //
// Post Endpoint //
// ************* //

// Adds a new person into the array of people
app.post("/people/add", (req, res) => {
    const newPerson = { ...req.body };
    newPerson.id = people.length + 1;
    people.push(newPerson);

    const data = { people: people };

    res.render("people/index", data);
})

// Edits the person based on their ID
app.post("/people/edit", (req, res) => {
    const newInfo = {...req.body};

    const personIndex = people.findIndex((person) => {
        return person.id === Number(newInfo.id);
    })

    people.splice(personIndex, 1, newInfo);

    const data = { people: people };

    res.render("people/index", data);
})

// Deletes the person based on their ID
app.post("/people/delete", (req, res) => {

    const personIndex = people.findIndex((person) => {
        return person.id === Number(req.body.id);
    })

    people.splice(personIndex, 1);

    const data = { people: people };

    res.render("people/index", data);
})

// Launches the server
app.listen(PORT, () => {
    console.log(`Server is now running on port ${PORT}`);
})


// ================================================================= //

// ****************************************** //
// Alternate way of writing an express server //
// ****************************************** //

// const express = require("express");
// const helmet = require("helmet");
// const morgan = require("morgan");

// const PORT = 8000;

// express()

//     // ********** //
//     // Middleware //
//     // ********** //
//     .use(helmet())
//     .use(morgan('tiny'))

//     // ********* //
//     // Endpoints //
//     // ********* //
//     .get("/test", (req, res) => {
//         res.status(200).json({ "result": "success" });
//     })

//     .listen(PORT, () => {
//         console.log(`Server is now running on port ${PORT}`);
//     });