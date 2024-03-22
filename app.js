const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express();
app.use(express.urlencoded({extended:false}))
app.get("/",(req,res)=>{
  res.send("This is home of my dynamic website")
})

app.get('/form',(req,res)=>{
res.send("<form action='/user-store' method='POST'><label>fill your name </label><input type='text' name='username' id='user'/> <button>submit</button></form>")

})
app.post('/user-store',(req,res)=>{
  const userName=req.body.username
  const filePath = path.join(__dirname,'Data','users.json');
  const fileData = fs.readFileSync(filePath)
  const existUser =JSON.parse(fileData)
  existUser.push(userName)
  res.send("<h1>congra Your data is stored</h1>")
  fs.writeFileSync(filePath,JSON.stringify(existUser))
  console.log(userName)
})
app.get('/userlist',(req,res)=>{
 let part = "<ul>"
 const filePath = path.join(__dirname,'Data','users.json');
 const fileData = fs.readFileSync(filePath)
 const existUser =JSON.parse(fileData)
 for(const user of existUser){
  part +='<li>'+user+'</li>'
 }
 part +='</ul>'
 res.send(part)

})





app.listen(3000,()=>{console.log("server is listening to port  3000")
})