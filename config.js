module.exports = {
    API: 'https://api.stackexchange.com/2.2',
    order: 'desc', // desc or asc
    sort: 'activity', //activity, votes, creation, relavance
    site: 'stackoverflow',
    SLACK_TOKEN: '',

    MESSAGES: {
        'RESULTS': 'Found results for:',
        'EPMPTY': 'No Results found :(',
        'NO_ARGS': 'No argument specified. Example /slackoverflow decode URI component'
    }
}