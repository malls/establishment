(function(Papa) {

    let dummyData = [{
        caption: 'cool',
        photographer: 'forrest',
        url: 'index2.html',
        image: 'exxie merckx.jpg'
    }]
    
    function makeIndexBody(content) {
        const templateWrapper = `
        <div class="parent-horizontal-flex">
            ${content}
        </div>
        `;
        return templateWrapper;
    }

    function createIndexPhotos(data) {
        let body = '';

        data.forEach(item => {
            body += `
                <a href="${item.url}">
                <img class="full-height-image" src="images/${item.image}">
                <div class="sideways credit-text pad-credit-text">
                    <span class="pad-name">${item.caption}</span>
                    <span class="pad-name">photography ${item.photographer}</span>
                </div>
            </a>
        `
        });
        return body;
    }


    [].forEach.call(document.getElementsByClassName('menu-item'), (el) => {
        el.classList.remove('menu-item-active');
    });

    // document.getElementById('replacer').innerHTML = makeIndexBody(createIndexPhotos(dummyData));


    Papa.parse('http://localhost:3000/csvs/index.csv', {
        download: true,
        header: true,
        complete: function(results) {
            document.getElementById('replacer').innerHTML = makeIndexBody(createIndexPhotos(results.data));
        }
    })

    document.getElementById('index-tab').classList.add('menu-item-active');

})(Papa);