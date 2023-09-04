// Svaki user ima svoj ID, username, email i lozinku - kao baza podataka
class User {
  user_id = '';
  username = '';
  email = '';
  password = '';
  api_url = 'https://64db651d593f57e435b0e520.mockapi.io';

  // Metoda za kreiranje korisnika
  create() {
    // Podaci o korisniku za slanje
    let data = {
      username: this.username,
      email: this.email,
      password: this.password
    }

    // Pretvorimo to u JSON
    data = JSON.stringify(data);

    // Radimo post request da se upise novi user
    fetch(this.api_url + '/users', {
      method: 'POST',
      // U headeru moramo reci da saljemo JSON
      headers: {
        'Content-Type': 'application/json'
      },
      // Body su podaci koje smo pretvorili u JSON
      body: data
    })
      .then(response => response.json())
      .then(data => {
        // Kreiranje sesije da je odma user prijavljen
        let session = new Session();
        // Sesija mora dobiti user ID, a njih dobijemo kada nam API vrati odgovor
        session.user_id = data.id;
        // Stvaranje cookiea da je korisnik prijavljen
        session.startSession();

        // Preusmjeravanje na pocetnu stranicu od drustvene mreze
        window.location.href = 'hexa.html';
      })
  }

  // Dohvacanje trenutnog korisnika
  // Metoda je asinkrona jer mu treba neko vrijeme dok API ne odgovori
  async get(user_id) {
    let api_url = this.api_url + '/users/' + user_id;

    // Ovaj dio koda zahtjeva vrijeme da se izvrsi i ako nebi 
    // bilo ovoga onda bi nam javljalo gresku da nema usernamea.
    // Zato treba pricekati da se dohvati i da onda kod ide dalje
    let response = await fetch(api_url);
    let data = await response.json();

    // Vratimo podatke o korisniku
    return data;
  }

  // Izmjena podataka od korisnika
  edit() {
    // Podaci koje mijenmjamo
    let data = {
      username: this.username,
      email: this.email
    };

    // Pretvaranje podataka u JSON
    data = JSON.stringify(data);

    // Moramo uzeti session za onog kojeg mijenjamo (trenutno prijavljenog), nemozemo bilo kojeg
    let session = new Session();
    let session_id = session.getSession();

    // Kada mijenjamo, request nam je PUT
    fetch(this.api_url + '/users/' + session_id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    })
      .then(response => response.json())
      .then(data => {
        // Nakon izmjene podataka vracamo ga na pocetnu od drustvene mreze
        window.location.href = 'hexa.html';
      });
  }

  // Logiranje korisnika
  login() {
    // Dohvacamo sve korisnike iz baze
    fetch(this.api_url + '/users')
      .then(response => response.json())
      .then(data => {
        // Flag za kontrolu jel ulogiran
        let login_successful = 0;

        // Prolazimo kroz sve usere i usporedujemo jel ga ima
        data.forEach(db_user => {
          if (db_user.email === this.email && db_user.password === this.password) {
            // Korisnicki podaci su pronadeni, korisnika treba ulogirati

            // Postavljanje cookie-a
            let session = new Session();
            session.user_id = db_user.id;
            session.startSession();

            // Postavljanje flaga i redirectanje na pocetnu od mreze
            login_successful = 1;
            window.location.href = 'hexa.html';
          }
        });

        // Ako nije ulogiran imamo poruku da nevalja email ili lozinka
        if (login_successful === 0) {
          alert('Pogresan email ili lozinka');
        }
      })
  }

  // Brisanje korisnika
  delete() {
    // Dobivanje ID trenutno prijavljenog korisnika
    let session = new Session();
    let session_id = session.getSession();

    // Brisemo u API-ju samo tog krenutnog korisnika
    fetch(this.api_url + '/users/' + session_id, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        // Brisemo cookie za prijavu
        let session = new Session();
        session.destroySession();

        // Preusmjeravanje na pocetnu stranicu
        window.location.href = '/';
      });
  }
}