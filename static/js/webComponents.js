customElements.define('rating-stars', class extends HTMLElement {
        constructor() {
            super();
            this.rating = this.getAttribute("rating");
        }

        connectedCallback() {
            let stars = [1, 2, 3, 4, 5].map(i =>
                `<span class=` + (i <= this.rating ? `text-warning` : `text-secondary`) + `>★</span>`
            );
            this.innerHTML = stars.join('');
        }
    }
);