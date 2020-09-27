const { json } = require('micro');
const connect = require('request');
var options = {
    'method': 'GET',
    'url': 'https://api.treep.ai/bot/activities/random?count=1',
    'headers': {
        'x-api-key': 'treep_appcraft'
    }
};

module.exports = async (req, res) => {
    const { request, session, version } = await json(req);

    connect(options, function (error, response) {
        if (error) throw new Error(error);
        
        res.end(JSON.stringify(
            {
                version,
                session,
                response: {
                    text: 'Response',
                    end_session: false,
                },
            }
        ));
    
    });

    // res.end(JSON.stringify(
    //     {
    //         version,
    //         session,
    //         response: {
    //             text: request.original_utterance || 'Hello!',
    //             end_session: false,
    //         },
    //     }
    // ));
};