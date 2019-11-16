const express = require('express')
const utility = require('utility')
const superagent = require('superagent')
const cheerio = require('cheerio')
const url = require('url')
const eventproxy = require('eventproxy');


const app = express()


/* app.get('/', (req, res) => {
  var q = req.query.q;
  var md5Value = utility.md5(q);

  res.send(md5Value);
}) */

app.get('/', (req, res, next) => {
  superagent.get('https://cnodejs.org/')
    .end((err, sres) => {
      if(err) return next(err)
      
      var $ = cheerio.load(sres.text)
      var items = []

      $('#topic_list .topic_title').each(function (idx, element) {
        var $element = $(element);
        items.push({
          title: $element.attr('title'),
          href: url.resolve('https://cnodejs.org/', $element.attr('href'))
        });
      });

      res.send(items);

    })  
})

app.listen(3000, () => {
  console.log('listening at port 3000')
})