const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const app = express();

const url = "https://carlosdiazgirol.github.io/dashboard/";

app.get("/", (req, res) => {
    axios.get(url).then((response) => {
        if(response.status === 200){
            const html = response.data
            const $ = cheerio.load(html)
            
            const title = $("title").text()

            const links = []

            $("a").each((index, element) => {
                const link = $(element).attr("href")
                links.push(link)
            })

            res.send(`
            <h1>${title}</h1>
            <ul>
                ${links.map(link => `<li>${link}</li>`).join("")}
            </ul>    
        `)
            console.log(links)
        }
    })
});

app.listen(3000, () => {
    console.log("Server Listening On Port http://localhost3000")
});