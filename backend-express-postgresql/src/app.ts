import express from 'express'
import { Request, Response} from 'express'
import { Tweet } from './entity/Tweet'
import { myDataSource } from './app-data-source'

myDataSource
  .initialize()
  .then(() => {
    console.log("Data source has been initialized!")
  })
  .catch((err) => {
    console.error("Error during data source initialization:", err)
  });

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get("/tweets", async function (req: Request, res: Response) {
  const tweets = await myDataSource.getRepository(Tweet).find();
  res.json(tweets)
});

app.get("/tweets/:id", async function (req: Request, res: Response) {
  const result = await myDataSource.getRepository(Tweet).findOneBy({
    id: req.params.id
   })

  return res.send(result)
})

app.post("/tweets",async function (req: Request, res: Response) {
  const tweet = myDataSource.getRepository(Tweet).create(req.body);
  const result = await myDataSource.getRepository(Tweet).save(tweet)
  return res.send(result)
})

app.put("/tweets/:id", async function (req: Request, res:Response) {
  const tweet = await myDataSource.getRepository(Tweet).findOneBy({
                      id: req.params.id
                    })
  if (tweet instanceof Tweet) {
    myDataSource.getRepository(Tweet).merge(tweet, req.body)
    const result = await myDataSource.getRepository(Tweet).save(tweet)
    return res.send(result)
  } else {
    return res.send("Not found")
  }

})

app.delete("/tweets/:id", async function (req: Request, res: Response) {
  const result = await myDataSource.getRepository(Tweet).delete(req.params.id)
  return res.send(result)
})

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Server and database running on port ${port}, http://localhost:${port}`))