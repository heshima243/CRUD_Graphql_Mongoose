// ZNlAh2mAZnrCF0Bd mongodb+srv://julien:ZNlAh2mAZnrCF0Bd@testtask.arbjlzi.mongodb.net/?retryWrites=true&w=majority

const express = require('express')
const {gql, ApolloServer} = require('apollo-server-express')
require("dotenv").config();

const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')

const mongoose = require('mongoose')



async function startServer(){
const app = express()
const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
})
await apolloServer.start()

apolloServer.applyMiddleware({app:app})

app.use((req,res)=>{
    res.send("hello from apollo expresss")
})

// replace your own url mongodb in file .env
await mongoose.connect(process.env.MONGO_URL,{
useUnifiedTopology: true,
useNewUrlParser: true
})
console.log('mongoose connected');

app.listen(8000, ()=> console.log('server running on 8000'))
}
startServer()