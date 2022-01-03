const PORT = 3000
const express = require('express')
const cheerio = require('cheerio')
const axios = require('axios')

const app = express()

// CHECK MULTIPLE SITES FOR NEWS LINKS
//
// const newsSites = [
//     {
//         name: 'Sporting News NHL',
//         address: 'https://www.sportingnews.com/ca/nhl/news'
//     },
//     {
//         name: 'Sporting News NFL',
//         address: 'https://www.sportingnews.com/ca/nfl'
//     }
// ]

const articles = []

app.get('/', (req, res) => {
    res.send('Welcome to my Sports News <br> You can view it <a href="/news">here</a>')
})

app.get('/news', (req, res) => {

    const url1 = 'https://www.sportingnews.com/ca/nhl/news'

    axios.get(url1)

        .then((response) => {
            const html = response.data
            const $ = cheerio.load(html)


            // WE CAN SEARCH SPECIFIC TITLES THAT CONTAIN THIS WAY:
            //
            // $('.card__body:contains("covid"), html).each(function() {
            //      the rest goes here
            // })


            $('.card__body', html).each(function() {
                const title = $(this).find('.card__headline--long').text()
                const url = $(this).find('.card__link').attr('href')
                articles.push({
                    title,
                    url
                })
            })
            console.log(articles)
            res.json(articles)
            
        }).catch((err) => console.log(err))

    })



app.listen(PORT, () => console.log(`server running on http://localhost:${PORT}`))

// testing updates any luck?