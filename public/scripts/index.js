(function(window, document, Papa) {
    
    let page = 'index';

    const path = window.location.pathname;
    const specificPage = window.location.search ? `/${window.location.search.split('=')[1]}` : ''

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

            let body = `<div class="archive-container"><div class="archive-image-container">`;

            data.forEach(item => {
                body += `
                    <div class="archive-image">
                        <img src="images/archive/${item.image}">
                        <span>${item.caption || '&nbsp'}</span>
                    </div>
            `
            });

            return body + '</div></div>';
        },
        index(data) {
            let body = '';

            data.forEach(item => {
                body += `
                    <a href="project-highlight?page=${item.csv}">
                    <img class="full-height-image" src="images/project-highlight/${item.csv}/${item.image}">
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
                    <img src="images/contact/${item.imageurl}" alt="">

                    <div class="contact-info">
                        ${item.name}
                        <br>
                        <br>
                        ${item.title}
                        <br>
                        <br>
                        <a href="https://instagram.com/${item.instagram.replace('@','')}">${item.instagram}</a>
                        <br>
                        <br>
                        <a href="mailto:${item.email}">${item.email}</a>
                    </div>
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

        },
        runway(data) {
            let body = '<div class="vert-scroll-4x4-grid">'

            data.forEach(item => {
                body +=`<a class="outer-grid-wrapper" href="runway-highlight?page=${item.highlightcsv}" style="background-image: url(/images/runway/${item.highlightcsv}/${item.image})">
                        <div class="grid-runway-caption credit-text sideways">
                            ${item.collection}
                            <span class="pad-name">${item.season}</span></div>
                        </a>`;


            });

            return body + '</div>';
        },
        runwayhighlight(data, folder) {
            const firstRow = data[0];
            let body = `
                <div class="runway-highlight-name">
                    <div class="credit-text sideways pad-sideways">
                        ${firstRow.collection}
                        <span class="pad-name">${firstRow.season}</span>
                    </div>
                    <a href="/runway.html">X</a>
                </div>
                <div class="horiz-parent">
                <div class="horiz-scroll-full-height">`;

             data.forEach(item => {
                body += `<img src="/images/runway/${folder.replace('/','')}/${item.images}" class="runway-hightlight-image" alt="">`;
             });

            return body + '</div></div>';
        },

        projecthighlight(data, folder) {
            const firstRow = data[0];
            let body = `
                <div class="runway-highlight-name">
                    <div class="credit-text sideways pad-sideways">
                        ${firstRow.project}
                        <span class="pad-name">photography by ${firstRow.photographer || ''}</span>
                    </div>
                    <a href="/">X</a>
                </div>
                <div class="horiz-parent">
                <div class="horiz-scroll-full-height">`;

             data.forEach(item => {
                body += `<img src="/images/project-highlight/${folder.replace('/','')}/${item.images}" class="runway-hightlight-image" alt="">`;
             });

            return body + '</div></div>';


        }
        //for third grid
        // projecthighlight(data, folder) {
        //     const firstRow = data[0];
        //     let body = `
        //         <div class="runway-highlight-name">
        //             <div class="credit-text sideways pad-sideways">
        //                 ${firstRow.project}
        //                 <span class="pad-name">photography by ${firstRow.photographer}</span>
        //             </div>
        //             <a href="/">X</a>
        //         </div>
        //         <div class="horiz-parent">
        //             <div class="horiz-scroll-full-height">
        //                 <div class="third-grid"></div>`;

        //     data.forEach(item => {
        //         console.log('item', item)
        //         body += `<div class="third-grid" style="background-image: url('/images/project-highlight${folder}/${item.images}')"></div>`;
        //     });

        //     return body + '</div></div>'
        // }
    }

    Papa.parse(`csvs/${page}${specificPage}.csv`, {
        download: true,
        header: true,
        complete: (results) => {
            document
                .querySelector('header')
                .insertAdjacentHTML('afterend', templateMethods[page.replace('-','')](results.data, specificPage));
        }
    });

})(window, document, Papa);
