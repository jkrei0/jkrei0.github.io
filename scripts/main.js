
import { createApp } from '/scripts/petite-vue.js';

createApp({
    pages: {
        home: 1,
        about: 2,
        portfolio: 3,
        contact: 4
    },
    currentPage: 1,
    pageName(page) {
        if (!page) page = this.currentPage;
        return Object.keys(this.pages).find(key => this.pages[key] === page) ?? 'home';
    },
    switchPage(page) {
        this.currentPage = page;
        window.location = '#' + this.pageName();
    },
    isHiddenPage(page) {
        if (this.currentPage !== page) return true;
        else return null;
    },
    isCurrentPage(page) {
        if (this.currentPage === page) return true;
        else return null;
    },
    links: {
        github() {
            window.open('https://github.com/jkrei0/');
        }
    },
    pageAttrs(page) {
        return {
            'inert': this.isHiddenPage(page),
            'data-pagename': this.pageName(page)
        }
    },
    showMoreProjects() {
        document.querySelectorAll('.more-projects').forEach(el => {
            el.removeAttribute('style');
        });
        document.querySelector('.main').scrollBy({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    },
    mounted(nth) {
        window.location.href.replace(/#(\w+)$/, (_m, page) => {
            this.currentPage = this.pages[page] ?? 1;
        });
        for (const button of document.querySelectorAll('.navigation button')) {
            button.removeAttribute('aria-selected');
        }
        document.querySelector(`.navigation button:nth-of-type(${this.currentPage})`).setAttribute('aria-selected', '');

        if (!nth) {
            // This makes the browser forwards/back buttons work
            window.addEventListener('hashchange', () => {
                this.mounted(true);
            });

            window.setTimeout( () => {
                for (const section of document.querySelectorAll('.page')) {
                    section.classList.remove('first-load');
                }
            }, 700);
        }
    }
}).mount();



const navButtons = document.querySelectorAll('div.navigation button');

for (const button of navButtons) {

    button.addEventListener('click', () => {
        for(const btn of navButtons) {
            btn.removeAttribute('aria-selected');
        }
        button.setAttribute('aria-selected', '');
    });

}