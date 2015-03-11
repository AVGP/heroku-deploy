var request = require('request'),
    Promise = require("bluebird");

module.exports = function(appName, authToken, downloadUrl, version) {
    return new Promise(function(resolve, reject) {
        request.post("https://api.heroku.com/apps/" + appName + "/builds", {
            headers: {
                "Accept": "application/vnd.heroku+json; version=3",
                "Authorization": "Bearer " + authToken,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ source_blob: { url: downloadUrl, version: version} })
        }, function(err, res) {
            if(err) {
                console.error("Error creating the source URLs: ", err);
                reject(err);
                return;
            }

            try {
                var build = JSON.parse(res.body);
            } catch(e) {
                console.error("Build response could not be parsed:", e);
            }

            resolve(build.id);
        });
    });
};