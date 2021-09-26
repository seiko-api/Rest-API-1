__path = process.cwd()
let express = require('express');
let db = require(__path + '/database/db');
try {
let zahirr = db.get("zahirr");
} catch (e) {
	console.log('')  
}
let axios = require('axios')
let creator = "Velgrynd"
let cheerio = require('cheerio')
let formData = require('form-data')
let fetch = require('node-fetch');
let request = require('request');
let fs = require('fs');
let router  = express.Router();
let { igDownload } = require('../lib/index') 
let options = require(__path + '/lib/options.js');
let { color, bgcolor } = require(__path + '/lib/color.js');
let { getBuffer, fetchJson } = require(__path + '/lib/fetcher.js');

loghandler = {
    noturl: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'Masukan URL'
    },
    notquery: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'Masukkan query'
        },
    error: {
        status: false,
        creator: `${creator}`,
        message: 'An internal error occurred. Please report via WhatsApp wa.me/6288286421519'
    }
}

     // Downloader
      router.get('/igdl', async(req, res) => {
	     url = req.query.url
	     if (!url) return res.json(loghandler.noturl)
	     result = await igDownload(url)
	     try {
		      res.json({
			  status: true,
			  creator: 'Velgrynd',
              note: 'Jangan Di Tembak Bang',
              result
           })
	       } catch(err) {
		      console.log(err)
		      res.json(loghandler.error)
	       }
      })
     
 router.use(function (req, res) {
     res.status(404)
    .set("Content-Type", "text/html")
    .sendFile(__path + '/views/404.html');
});

module.exports = router