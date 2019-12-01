(function(window, document, Papa) {
    
    let page = 'index';

    const path = window.location.pathname;
    const specificPage = window.location.search ? `-${window.location.search.split('=')[1]}` : ''

    if (path.includes('archive')) {
        page = 'archive';
    } else if (path.includes('project-highlight')) {
        page = 'project-highlight';
    } else if (path.includes('runway-highlight')) {
        page = 'runway-highlight';
    } else if (path.includes('runway')) {
        page = 'runway';
    } else if (path.includes('contact')) {
        page = 'contact';
    }

    const templateMethods = {
        archive(data) {
            let body = '';
            return body;
        },
        index(data) {
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

            return `<div class="parent-horizontal-flex">
                ${body}
            </div>
            `;
        },
        contact(data) {
            //name,title,email,instagram,imageurl
            let body = '';

            data.forEach(item => {
                body += `<div class="contact-container">
                    <img src="images/${item.imageurl}" alt="">

                    <div class="contact-info">
                        ${item.name}
                        <br>
                        <br>
                        ${item.title}
                        <br>
                        <br>
                        Lorem Ipsum Dorem
                        <br>
                        Morit
                        <br>
                        Favim Isig iopsi
                        <br>
                        <a href="https://instagram.com/${item.instagram.replace('@','')}">${item.instagram}</a>
                        <br>
                        <br>
                        <a href="mailto:${item.email}">${item.email}</a>

                    </div>`

            });
            


            return `<div class="contact-section">
                ${body}
            </div>
            <div class="contact-company-info">
                ESTABLISHMENT
                <br>
                CASTING
                <br>
                <br>
                NYC / LONDON
                <br>
                <br>
                +1 917 444 1422
                <br>
                <br>
                <a href="mailto:info@establishmentnewyork.com">info@establishmentnewyork.com</a>
            </div>`;

        }
    }
console.log('on the page at all')
    Papa.parse(`http://localhost:3000/csvs/${page}${specificPage}.csv`, {
        download: true,
        header: true,
        complete: (results) => {
            console.log('results')
            console.log(results)
            document
                .querySelector('header')
                .insertAdjacentHTML('afterend', templateMethods[page.replace('-','')](results.data));
        }
    });

})(window, document, Papa);
