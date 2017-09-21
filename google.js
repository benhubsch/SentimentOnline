var google = require('google');

function getSearch(question) {
  return new Promise(function(resolve, reject) {
    var searchQuery = `${question}`

    google.resultsPerPage = 100

    google(searchQuery, function(err, res) {
      if (err || res.links.length === 0) { reject({reason: 'Google search failed.'}) }
      else {
        var links = []
        res.links.forEach(function(linkObj) {
          if (linkObj.href) {
            links.push(linkObj.href)
          }
        })
        resolve(links);
      }
    });
  });
}

module.exports = { getSearch: getSearch }

