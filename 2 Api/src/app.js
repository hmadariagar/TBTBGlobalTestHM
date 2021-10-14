import express from "express";
import { createNewUser, deleteUserbyID, findUserbyID, showAllUsers, updateUserbyID } from "./services/users";
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {});

app.get("/users", async (req, res) => {
    let {status, response} = await showAllUsers()
    return(res.status(status).json(response))
});

app.post("/users", async (req, res) => {
    let {status, response} = await createNewUser(req.body)
    return(res.status(status).json(response))
});

app.get("/users/:id", async (req, res) => {
    let {status, response} = await findUserbyID(req.params)
    return(res.status(status).json(response))
});

app.delete("/users/:id", async (req, res) => {
    let {status, response} = await deleteUserbyID(req.params)
    return(res.status(status).json(response))
});
app.put("/users/:id", async (req, res) => {
    let {status, response} = await updateUserbyID(req)
    return(res.status(status).json(response))
});

export default app