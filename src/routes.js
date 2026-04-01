import { nanoid } from "nanoid"
import redis from "./redis.js"
import db from "./db.js"
import express  from "express"

const router = express.Router()
router.post("/shorten", async (req, res) => {
  const { url } = req.body
  const code = nanoid(6)

  await db.query(
    "insert into urls(short_code, original_url) values($1,$2)",
    [code, url]
  )

  res.json({ short: code })
})

router.get("/:code", async (req, res) => {
  const code = req.params.code

  const cached = await redis.get(code)

  if (cached) {
    return res.redirect(cached)
  }

  const result = await db.query(
    "select original_url from urls where short_code=$1",
    [code]
  )

  if (result.rows.length === 0) {
    return res.status(404).send("not found")
  }

  const url = result.rows[0].original_url

  await redis.set(code, url)

  res.redirect(url)
})

export default router