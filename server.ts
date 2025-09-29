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
        name: "Hallongrottor",
        description: "Raspberry jam filled cookies",
        priceSEK: 59,
    },
    {
        id: 2,
        name: "Chokladbollar",
        description: "Traditionally made of oats, butter, sugar, cacao, coffee, vanilla, and coated in coconut or pearl sugar",
        priceSEK: 49,
    },
    {
        id: 3,
        name: "Kladdkaka with whipped cream",
        description: "Somewhere between a dense chocolate cake, a brownie, and sometimes even a chocolate fondant depending on the gooey factor",
        priceSEK: 75,
    },
    {
        id: 4,
        name: "Kanelbulle",
        description: "Kanelbulle has a simple pearl sugar topping and the bun has a very distinct cinnamon and cardamom spice taste",
        priceSEK: 65,
    },
];

const pastrieSchema = z.object({
    id: z.number(),
    name: z.string().min(1).max(100),
    description: z.string().min(1).max(250),
    priceSEK: z.number().min(5).max(250).default(50),
});

const validatedPastries = pastrieSchema.safeParse(swedishPastries);

if (!validatedPastries.success) {
    console.error(validatedPastries.error);
} else {
    console.log(validatedPastries.data);
};

app.get("/swedishpastries", (req, res) => {
    //res.json(swedishPastries);
    res.json(pastrieSchema.safeParse(swedishPastries));

});

app.post("/swedishpastries", (req, res) => {
    const newPastrie = {
        id: swedishPastries.length +1,
        name: req.body.name,
        description: req.body.description,
        priceSEK: req.body.priceSEK,
    };
    const validatedNewPastrie = pastrieSchema.safeParse(newPastrie);
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
