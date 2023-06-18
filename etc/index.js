const express = require('express')
const fs = require('fs').promises

const app = express()

app.get('/',(req, res)=>{
    res.set('Content-Type', 'text/')
 
    res.write("index.html")
    res.end()
});

app.post("/no/:posts", async ()=>{
    req.params.posts
    res.type('text')
    res.set({'Content-Type':"what"})
})

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(multer().none())

fs.readFile("",'utf8', (err,data)=>{
    process(data)
})

let x = await fs.readFile("something", 'utf8')
x.then(res => res.json()).saf

if (error.code=='ENOENT')

/*
let products = await fs.readFile("p.json","utf8")
data = JSON.parse(products)
data['TV'] = 'tv'
await fs.writeFile('p.json', JSON.stringify(data))*/

var sqlite3 =require('sqlite3')
const sqlite =require('sqlite')

async function getdbconnection(){
    const db = await sqlite.open({
        filename:'product',
        driver: sqlite3.Database
    });
    return db
}

let query = 'select * from dd limt2 where username=?'
let bd = await
let rows = await db.all(query,[user,password])


app.listen(8000, console.log("http://localhost:8000"))