// Import the dependencies
const cheerio = require("cheerio");
const req = require("tinyreq");
const url = require("url");
// Define the scrape function
function scrape(pageurl, data, cb) {
    // 1. Create the request
    req(pageurl, (err, body) => {
        if (err) { return cb(err); }

        // 2. Parse the HTML
        let $ = cheerio.load(body);
        let pageData = [];

        // 3. Extract the data
        // Object.keys(data).forEach(k => {
        //   pageData[k] = $(data[k]).attr('src');
        // });
        $("img.photo").each(function(i, image) {
          let imageSource = url.resolve(pageurl, $(image).attr('src'));
          pageData.push(imageSource);
        });

        // Send the data in the callback
        cb(null, pageData);
    });
}

// Extract some data from my website
scrape("http://kamakoti.org/kamakoti/news/2017/Shankaracharya-visit-Tindivanam.html", {
    // Get the website title (from the top header)
    img:"img.photo"
    // ...and the description
}, (err, data) => {
    console.log(err || data);
});
