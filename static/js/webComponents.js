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

customElements.define('rating-selector', class extends HTMLElement {
        constructor() {
            super();
            this.rating = this.getAttribute("rating");
        }

        clickHandler (event) {
            console.log(event.target.id);
        }

        connectedCallback() {
            let stars = [1, 2, 3, 4, 5].map(i =>
                `<span id="${i}" class=` + (i <= this.rating ? `text-warning` : `text-secondary`) + `>★</span>`
            );

            this.innerHTML = stars.join('');

            let spans = this.querySelector('span');
            spans.addEventListener('click', this.clickHandler);
        }

        disconnectedCallback () {

            // Remove the click event listener from the button
            let spans = this.querySelector('span');
            spans.removeEventListener('click', this.clickHandler);

        }
    }
);