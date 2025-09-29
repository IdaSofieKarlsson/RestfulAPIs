import express from "express";

//initializes the app
const app = express();

app.use(express.json());

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`);
});

let books = [
    {
        id: 1,
        title: "abba",
        author: "Anna Svensson",
    },
    {
        id: 2,
        title: "babba",
        author: "Bea Johnsson",
    },
    {
        id: 3,
        title: "cacka",
        author: "Cisse Olsson",
    },
];

app.get("/books", (req, res) => {
    res.json(books);
});