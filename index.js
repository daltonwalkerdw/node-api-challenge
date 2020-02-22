const express = require("express")
const projectRouter = require("./routers/projectRouter")
const actionsRouter = require("./routers/actionsRouter")

const app = express()

app.use(express.json())
app.use("/api/projects", projectRouter)


app.listen(4000, () => {
    console.log('\n* Server Running on http://localhost:4000 *\n')
})
 
module.export = app;