import express, { json } from "express";
import { describe } from "node:test";
import { z } from "zod";

//initializes the app
const app = express();

app.use(express.json());

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`);
});

let swedishPastries = [
    {
        id: 1,
        name: "abba",
        description: "Anna Svensson",
        priceSEK: 48,
    },
    {
        id: 2,
        name: "babba",
        description: "Bea Johnsson",
        priceSEK: 48,
    },
    {
        id: 3,
        name: "cacka",
        description: "Cisse Olsson",
        priceSEK: 48,
    },
];

const pastrieSchema = z.object({
    id: z.number(),
    name: z.string().min(1).max(100),
    description: z.string().min(1).max(250).optional(),
    priceSEK: z.number().min(5).max(250).default(50),
});

app.get("/swedishpastries", (req, res) => {
    res.json(swedishPastries);
});

app.post("/swedishpastries", (req, res) => {
    const newPastrie = {
        id: swedishPastries.length +1,
        name: req.body.name,
        description: req.body.description,
        priceSEK: req.body.priceSEK,
    };
    swedishPastries.push(newPastrie);
    res.json({message: "Pastrie added successfully", pastrie: newPastrie});
});

app.put("/swedishpastries/:id", (req, res) => {
    const pastrieID = parseInt(req.params.id);
    const pastrie = swedishPastries.find((b) => b.id === pastrieID);
    if (!pastrie) {
        return res.status(404).json({message: "Pastrie not found."});
    }
    pastrie.name = req.body.name || pastrie.name;
    pastrie.description = req.body.author || pastrie.description;
    pastrie.priceSEK = req.body.priceSEK || pastrie.priceSEK;
    res.json({message: "Pastrie updated successfully", pastrie});
});

app.delete("/swedishpastries/:id", (req, res) => {
    const pastrieID = parseInt(req.params.id);
    swedishPastries = swedishPastries.filter((b) => b.id !== pastrieID);
    res.json({message: "Pastrie deleted successfully"});
});