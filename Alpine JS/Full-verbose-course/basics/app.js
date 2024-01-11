// Kada želimo koristiti iste podatke onda ih moramo ovako spremiti, jer onako ih vidimo samo u tom bloku
document.addEventListener('alpine:init', () => {
    Alpine.data('dropdown', () => ({
        open: false,

        toggle() {
            this.open = !this.open;
        }
    }));

    Alpine.store('currentUser', {
        username: 'Karlito',
        posts: ['Post 1', 'Post 2']
    });
});


