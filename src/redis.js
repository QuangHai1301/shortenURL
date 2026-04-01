import pkg from "redis";
 const redis = pkg;
const client = redis.createClient({
  url: "redis://redis:6379"
})

client.connect()

export default client