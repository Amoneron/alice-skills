const { json } = require('micro');
const connect = require('request');
var options = {
    'method': 'GET',
    'url': 'https://api.treep.ai/bot/activities/random?count=1',
    'headers': {
        'x-api-key': 'treep_appcraft'
    },
    'json': true
};
var intros = ['Можно', 'А еще можно было бы', 'Например, можно', 'Как насчет'];
var stops = ['стоп', 'хватит', 'перестань', 'прекрати'];

module.exports = async (req, res) => {
    const { request, session, version } = await json(req);

    function resp(answer, end) {
        res.end(JSON.stringify({
            version,
            session,
            response: {
                text: answer,
                end_session: end,
            },
        }));
    }

    if (request.original_utterance == null || request.original_utterance.length == 0) {
        resp('Привет! Могу подсказать, чем можно заняться в свободное время. По любой команде придумаю следующую идею. По стоп-слову Хватит прекращу предлагать варианты. Итак, поехали?', false);
    } else 

    if (stops.includes(request.original_utterance.toLowerCase())) {
        resp('Без проблем. Надеюсь, мне удалось подсказать что-то прекрасное. Обращайтесь за новыми идеями. Прекрасного дня!', true);
    } else 

    connect(options, function (error, response, body) {
        if (error || body['name'] == null) { 
            resp('К сожалению, сервер недоступен. А без него я ничего не могу сделать. Попробуйте спросить меня пожалуйста позже о том, что хотелось.', true);
        } else {
            var intro = intros[Math.floor(Math.random() * intros.length)];
            resp(intro + ' ' + body['name'].toLowerCase() + '. ' + body['brief'], false);
        }    
    });
    
};