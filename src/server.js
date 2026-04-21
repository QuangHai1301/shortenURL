import express from "express"
import routes from "./routes.js"
const app = express()
app.use(express.json())
app.use("/", routes)

app.listen(3000, () => {
  console.log("server running pppppppppppppppppppp test CI/CD -tylertran-----V2")
})