const request = require('request-promise');
const config = require('./config');
const querystring = require('querystring');

const searchParams = {
    order: config.order,
    sort: config.sort,
    site: config.site
};

module.exports = (query) => {
    searchParams = Object.assign(searchParams, {intitle: query});

    return request({
        method: 'GET',
        uri: config.API + '/search?' + querystring.stringify(searchParams),
        gzip: true
    }).then((response) => {
        const data = JSON.parse(response);

        return format(data.items);
    });

    function format(items) {
        if(items.length) {
            return items.map((item) => {
                return {
                    title: querystring.unescape(item.title),
                    title_link: item.link
                }
            });
        }
    }
}