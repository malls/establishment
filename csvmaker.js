const fs = require('fs');


for (let i = 1; i < 13; i++) {
    fs.readdir('./images/project-highlight/' + i, (err, res) => {
        let tpl = 'project,protographer,images\n';
        if (err) console.error(err);

        tpl += res.map(item => ',,'+item).join('\n');

        fs.writeFile('./public/csvs/project-highlight/' + i + '.csv', tpl, 'utf8', console.error);

        console.log(tpl);

    });

}