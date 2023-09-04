class Post {
  post_id = '';
  post_content = '';
  user_id = '';
  likes = '';
  api_url = 'https://64db651d593f57e435b0e520.mockapi.io';

  // Kreiranje posta
  async create() {
    // Treba nam koji je korisnik napravio objavu - trenutni korisnik koji je prijavljen
    let session = new Session();
    let session_id = session.getSession();

    // Podaci za pakiranje u JSON koje saljemo u requestu
    let data = {
      user_id: session_id,
      content: this.post_content,
      likes: 0
    }

    // Pretvaranje u JSON prethodnih podataka
    data = JSON.stringify(data);

    // Radimo POST request standardno da dodamo zapis u API
    let response = await fetch(this.api_url + '/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    });

    data = await response.json();

    return data;
  }

  // Dohvacanje svih objava
  async getAllPosts() {
    let response = await fetch(this.api_url + '/posts');
    let data = await response.json();
    return data;
  }

  // Za lajkanje cemo koristiti PUT jer mijenjamo postojece podatke
  like(post_id, likes) {
    // Podaci za slanje su samo lajkovi
    let data = {
      likes: likes
    };

    // Opet pretvaranje u JSON
    data = JSON.stringify(data);

    // PUT request
    fetch(this.api_url + '/posts/' + post_id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    })
      .then(response => response.json())
      .then(data => {
        // Nista nam netreba napraviti, mozemo samo nesto ispisati za test da vidimo
        // jel izvrsavanje doslo do ovog dijela
      });;
  }

  // Za brisanje posta
  delete(post_id) {
    // Brisemo specifican post pa nam treba tocno taj ID
    fetch(this.api_url + '/posts/' + post_id, {
      // Metoda je DELETE jer se brise, naravno
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        // Netreba nam nista
      });
  }
}