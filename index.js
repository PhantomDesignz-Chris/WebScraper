const PORT = 3000
const express = require('express')
const cheerio = require('cheerio')
const axios = require('axios')
const app = express()

// CHECK MULTIPLE SITES FOR NEWS LINKS
const newsSites = [
      {
         name: 'Sporting News NHL',
         address: 'https://www.sportingnews.com/ca/nhl/news'
     },
     {
         name: 'Sporting News NFL',
         address: 'https://www.nhl.com/news/'
     }
]

const articles = []

newsSites.forEach(newsSite => {
    axios.get(newsSite.address)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)

        $('a:contains("Senators")', html).each(function () {
            const title = $(this).text()
        //  const url = $(this).find('.card__link').attr('href') --------- this will find a specific ID of the links
            const url = $(this).attr('href')
                articles.push({
                    title,
                    url,
                    source: newsSite.name
                })
            })
            console.log(articles)
        })
    })


app.get('/', (req, res) => {
    res.send('Welcome to my Sports News <br> You can view it <a href="/news">here</a>')
})

app.get('/news', (req, res) => {
    res.json(articles)
})

app.listen(PORT, () => console.log(`server running on http://localhost:${PORT}`))