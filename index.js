const http = require('http');
const url = require('url');
const request = require('request-promise');
const config = require('./config');
const stackrequest = require('./stackrequest');

http.createServer((clientReq, clientRes) => {

    const urlParams = url.parse(clientReq.url, true).query,
        token = urlParams.token,
        message = urlParams.text,
        responseUrl = urlParams.response_url;

    if(config.SLACK_TOKEN !== token) {
        clientRes.write('Wrong token.');
        clientRes.end();
    }

    if(message ==='') {
        clientRes.write(config.MESSAGES.NO_ARGS);
    }

    const response = {
        'text': config.MESSAGES.RESULTS + message
    }

    stackrequest(message).then((data) => {
        if(!data) {
            response.text = config.MESSAGES.EPMPTY
        }

        Object.assign(response, {attachments: data});

        const responseParams = {
            method: 'POST',
            uri: responseUrl,
            body: response,
            json: true
        }

        //send response to Slack
        return request(responseParams);
    }).catch((e) => {
        clientRes.write(e.message);
    });

    clientRes.end();

}).listen(3000);