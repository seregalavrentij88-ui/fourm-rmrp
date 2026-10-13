const POST_URL = "";

const USERNAME = "Рапорт"; // Имя от кого будет пост
const AVATAR_URL = "https://mir-s3-cdn-cf.behance.net/projects/404/7cebb540449373.Y3JvcCw0ODEsMzc2LDAsNTk.jpg"; // Ссылка на аватар
const CONTENT = "<@&1367611033153306788>";
const COLOR =  3413934; // Цвет линии слева - Цвета тут: https://www.spycolor.com
const TITLE = "Рапорт"; // Заголовок (Можно оставить пустым)
const FOOTER = ""; // Текст снизу (Можно оставить пустым)
const TIMESTAMP = false; // Время поста снизу. true - включено / false - выключено

function onSubmit(e) {
    const response = e.response.getItemResponses();
    let items = [];

    for (const responseAnswer of response) {
        const question = responseAnswer.getItem().getTitle();
        const answer = responseAnswer.getResponse();
        let parts = []

        try {
            parts = answer.match(/[\s\S]{1,1024}/g) || [];
        } catch (e) {
            parts = answer;
        }

        if (!answer) {
            continue;
        }

        for (const [index, part] of Object.entries(parts)) {
            if (index == 0) {
                items.push({
                    "name": question,
                    "value": part,
                    "inline": false
                });
            } else {
                items.push({
                    "name": question.concat(" (cont.)"),
                    "value": part,
                    "inline": false
                });
            }
        }
    }

    var TIME = "";
    if (TIMESTAMP) {
      TIME = new Date().toISOString();
    }

    var options = {
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
        },
        "payload": JSON.stringify({
            "content": CONTENT,
            "embeds": [{
                "title": TITLE,
                "color": COLOR,
                "fields": items,
                "footer": {
                    "text": FOOTER
                },
                "timestamp": TIME
            }],
            username: USERNAME,
            avatar_url: AVATAR_URL,
        })
    };

    UrlFetchApp.fetch(POST_URL, options);
};