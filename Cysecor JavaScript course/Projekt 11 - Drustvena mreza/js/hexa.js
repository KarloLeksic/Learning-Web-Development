// Ako nismo ulogirani, a upisemo hexa.html u chrome, dati ce nam da odemo na Hexu,
// a nebi smijeli jel nema cookiea, nismo ulogirani. Ovdje sprijecavamo to.
// Dohvacamo session ID i ako ga nema znaci da korisnik niije prijavljen.
let session = new Session();
session_id = session.getSession();

if (session_id !== '') {

  // Trebamo pozvati funkciju na asinkroni nacin jer treba neko vrijeme da povuce ime i sve to
  async function populateUserData() {
    // Uzimamo trenutno usera
    let user = new User();

    // Pozivamo funkciju na asinkroni nacin da nebi javljalo gresku i da se ispisuje kako treba ime i mail
    user = await user.get(session_id);

    // Popunjavanje maila i imena dok ih dobije
    document.querySelector('#username').innerText = user['username'];
    document.querySelector('#email').innerText = user['email'];

    // Odma popunimo i polja za izmjenu profila ako korisnik klikne na izmjenu da odma pisu njegovi podaci
    document.querySelector('#korisnicko_ime').value = user['username'];
    document.querySelector('#edit_email').value = user['email'];
  }

  // Pozivanje asinkrone funkcije iznad
  populateUserData();
} else {
  // Korisnik nije prijavljen i nesmije biti na hexa.html
  window.location.href = "index.html";
}

// Odjava - listener na gumb za odjavu i brisemo sesiju i vracamo na index.html
document.querySelector('#logout').addEventListener('click', e => {
  e.preventDefault();

  session.destroySession();
  window.location.href = '/';
});

// Isti kod za modal kao i za registraciju
// Prikazivanje modala klikom na gumb za editiranje
document.querySelector('#editAccount').addEventListener('click', () => {
  document.querySelector('.custom-modal').style.display = 'block';
});

// Micanje modala klikom na X u modalu
document.querySelector('#close-modal').addEventListener('click', () => {
  document.querySelector('.custom-modal').style.display = 'none';
});

// Uredivanje informacija o korisniku
// Listener na gumb za edit i samo pozovemo funkciju od usera za edit sa novim podacima
document.querySelector('#editForm').addEventListener('submit', e => {
  e.preventDefault();

  // Kreiranje novog objekta za usera
  let user = new User();

  // Ispunjavamo objekat sa novim podacima koje je korisnik unio
  user.username = document.querySelector('#korisnicko_ime').value;
  user.email = document.querySelector('#edit_email').value;

  // Saljemo na api nove podatke
  user.edit();
});

// Za brisanje profila - listener na gumb za brisanje
document.querySelector('#deleteProfile').addEventListener('click', e => {
  e.preventDefault();

  // Pop up prije brisanja
  let text = 'Jeste li sigurni da zelite obrisati profil?'

  // confirm() je ko alert, asamo se mora kliknuti  "U redu" da bi se nastavilo dalje
  if (confirm(text) === true) {
    // Ako je kliknuto u redu, moze ga se brisati
    let user = new User();
    user.delete();
  }
});

// Objavljivanje - listener na gumb za objavu
document.querySelector('#postForm').addEventListener('submit', e => {
  e.preventDefault();

  // Asinkrona funkcija jer slanje na api traje
  async function createPost() {
    // Dohvacamo ono sto zelimo objaciti
    let content = document.querySelector('#postContent').value;

    // Brisemo ono sto je upisano u text areu da bi bilo prazno kad se objavi
    document.querySelector('#postContent').value = '';

    // Objekt za objavu
    let post = new Post();
    // Dodajemo sadrzaj objave
    post.post_content = content;
    // Kreiramo objavu
    post = await post.create();

    // Dohvacanje trenutnog usera da znamo ko je objavio post
    let current_user = new User();
    current_user = await current_user.get(session_id);

    // Spremanje starih objava
    let html = document.querySelector('#allPostsWrapper').innerHTML;

    // Ako je post nas onda treba imati gumb da ga obrisemo
    let delete_post_html = '';

    // Session ID i user ID moraju biti isti i onda je objava nasa, mozemo ju obrisati
    if (session_id === post.user_id) {
      delete_post_html = '<button class="remove-btn" onclick="removeMyPost(this)">Remove</button>';
    }

    // Dodavanje HTML-a za novu objavu
    document.querySelector('#allPostsWrapper').innerHTML = `<div class="single-post" data-post_id="${post.id}">
                                                              <div class="post-content">${post.content}</div>
                                                            
                                                              <div class="post-actions">
                                                                <p><b>Autor: </b> ${current_user.username}</p>
                                                                <div>
                                                                  <button onclick="likePost(this)" class="likePostJS like-btn"><span>${post.likes}</span> Likes</button>
                                                                  <button class="comment-btn" onclick="commentPost(this)">Comments</button>
                                                                  ${delete_post_html}
                                                                </div>
                                                              </div>
                                                              
                                                              <div class="post-comments">
                                                                <form>
                                                                  <input placeholder="Napisi komentar ..." type="text">
                                                                  <button onclick="commentPostSubmit(event)">Comment</button>
                                                                </form>
                                                              </div>
                                                            </div>
                                                            ` + html;
  }

  // Pozivanje asinkrone funkcije za objavljivanje
  createPost();
});

// Dohvacanje svih postova kad se otvori stranica
getAllPosts();

// Funkcija je asinkrona
async function getAllPosts() {
  // Dohvacanje svih postova
  let all_posts = new Post();
  all_posts = await all_posts.getAllPosts();

  // Idemo po svakom postu posebno da ga prikazemo na stranici
  all_posts.forEach(post => {
    async function getPostUser() {

      // Dohvacanje trenutnog usera
      let user = new User();
      user = await user.get(post.user_id);

      // Ucitavamo odma i komentare od tih postova - NE RADI JEL NEMOGU DODAT NA APIJU BESPLATNO
      /*let comments = new Comment();
      comments = await comments.get(post.id);

      // Dodavanje komentara ako ih ima
      let comment_html = '';
      if (comments.length > 0) {
        comments.forEach(comment =>{
          comment_html += `<div class="single-comment">${comment.content}</div>` 
        });
      }*/

      // Ako smo mi vlasnik objave, ovdje stavljamo gumb za brisanje te objave
      let delete_post_html = '';
      if (session_id === post.user_id) {
        delete_post_html = '<button class="remove-btn" onclick="removeMyPost(this)">Remove</button>';
      }

      // Samo zato da ne izgubimo sav sadrzaj prilikom objave, sacuvamo ga i nadodamo na kraj nove objave
      let html = document.querySelector('#allPostsWrapper').innerHTML;

      // Dodavanje novog posta i na kraj sve one stare postove
      document.querySelector('#allPostsWrapper').innerHTML =
        `<div class="single-post" data-post_id="${post.id}">
        <div class="post-content">${post.content}</div>
      
        <div class="post-actions">
          <p><b>Autor: </b> ${user.username}</p>
          <div>
            <button onclick="likePost(this)" class="likePostJS like-btn"><span>${post.likes}</span> Likes</button>
            <button class="comment-btn" onclick="commentPost(this)">Comments</button>
            ${delete_post_html}
          </div>
        </div>
        
        <div class="post-comments">
          <form>
            <input placeholder="Napisi komentar ..." type="text">
            <button onclick="commentPostSubmit(event)">Comment</button>
          </form>
        </div>
      </div>` + html;
    }

    // Pozivanje gornje funkcije
    getPostUser();
  });
}

// Postavljanje komentara - NE RADI jer nemogu napraviti 3 resursa na apiju besplatno
// U vrijeme snimanje tutorijala on je mogao, sada ne moze pa ovaj dio ne radi!
const commentPostSubmit = e => {
  e.preventDefault();

  // Uzimamo button koji je kliknut
  let btn = e.target;
  // Da se nemoze opet kliknuti iz nekog razloga
  btn.setAttribute('disabled', 'true');

  // Uzimamo njegov parrent, glavni post
  let main_post_element = btn.closest('.single-post');
  // Treba nam ID komentara kad cemo ga unasati
  let post_id = main_post_element.getAttribute('data-post_id');

  // Ono sto je komentirano, sadrzaj komentara
  let comment_value = main_post_element.querySelector('input').value;

  // Isprazniti polje za unos komentara
  main_post_element.querySelector('input').value = '';

  // Dodavanje komantara na stranicu
  main_post_element.querySelector('.post-comments').innerHTML += `
    <div class="single-comment">${comment_value}</div>
  `;

  // Dodavanje komantara u bazu
  let comment = new Comment();
  comment.content = comment_value;
  comment.user_id = session_id;
  comment.post_id = post_id;
  comment.create();
};

// Brisanje objave
const removeMyPost = btn => {
  // Dobivanje ID-ja od tocno tog posta
  let post_id = btn.closest('.single-post').getAttribute('data-post_id');

  // Brisanje HTML-a, da se ne vidi sa stranice
  btn.closest('.single-post').remove();

  // Ali ga jos ukloniti iz baze
  let post = new Post();
  post.delete(post_id);
};

// Lajkanje posta
const likePost = btn => {
  // mislim da ovbo netreba
  //let main_post_element = btn.closest('.single-post');

  // Treba nam ID posta kojeg neko zeli lajkati
  let post_id = btn.closest('.single-post').getAttribute('data-post_id');

  // Trenutno lajkova - uzimamo iz html-a a ne iz baze jer on pise na ekranu pa je bolje
  let number_of_likes = parseInt(btn.querySelector('span').innerText);

  // Povecavamo brojac i upisujemo na stranicu za jedan broj veci
  btn.querySelector('span').innerText = number_of_likes + 1;

  // Onemogucimo gumb (kad se refresha opet se moze lajkat, da)
  btn.setAttribute('disabled', true);

  // Jos upisati u bazu broj lajkova
  let post = new Post();
  post.like(post_id, number_of_likes + 1);
};

// Komentiranje posta
const commentPost = btn => {
  // Kada se klikne na comments gump, pokaze se forma za upisivanje komentara
  let main_post_element = btn.closest('.single-post');

  // Uzimamo taj id da se otvori samo za taj jedan komentar, ne za sve
  //let post_id = main_post_element.getAttribute('data-post_id');

  main_post_element.querySelector('.post-comments').style.display = 'block';
};