const request = require(`request`);
const cheerio = require(`cheerio`);

function prettyObject(object) {
    var simpleObject = {};
    for (var prop in object) {
        if (!object.hasOwnProperty(prop)) {
            continue;
        }
        if (typeof (object[prop]) == 'object') {
            continue;
        }
        if (typeof (object[prop]) == 'function') {
            continue;
        }
        simpleObject[prop] = object[prop];
    }
    return JSON.stringify(simpleObject, null, 4); // returns cleaned up JSON
}

function logPrettyObject(obj) {
    console.log(prettyObject(obj));
}

module.exports = {

    urlToFilename: function (url) {
        // example:  https://play.google.com/?hl=en&tab=w8
        //this removes the anchor at the end, if there is one
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        //this removes the query after the file name, if there is one
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        //this removes everything before the last slash in the path
        // url = url.substring(url.lastIndexOf("/") + 1, url.length);

        // Get rid of protocol:
        var killTo = url.indexOf('://');
        if (killTo != -1) {
            url = url.substring(killTo + 3, url.length);
        }

        // Remove trailing slashes PLURAL
        while (url.endsWith('/')) {
            url = url.substring(0, url.length - 1);
        }

        // replace all double slashes with single:
        url = url.replace(/\/\//g, '\/');

        // now replace all slahes with dashes
        url = url.replace(/\//g, '\-');

        return url;
    },

    getPageLinks: function (url, body) {
        // example: <a class="nav-menu-links__link" href="/world" data-analytics-header="main-menu_world">World</a

        var request = require('request');
        var cheerio = require('cheerio');
        
        if(! body) {
            console.log(`about to blow up due to call to  cheerio load on an empty body for ${url}`);
        }
        
        $ = cheerio.load(body);
        links = $('a');
        var result = [];
        $(links).each(function (i, link) {
            var linkTargetStub = link.attribs.href;
            var fullLink = linkTargetStub;

            if (fullLink) {
                if (!fullLink.includes('://')) {
                    fullLink = url + fullLink;
                }
                console.log(`this link: ${prettyObject(link)}`);
                console.log(`adding: ${fullLink}`);
                result.push(fullLink);
            }
        });

        console.log(`links from result: `);
        logPrettyObject(result);

        return result;
    }
}

module.exports.prettyObject = prettyObject;
module.exports.logPrettyObject = logPrettyObject;
