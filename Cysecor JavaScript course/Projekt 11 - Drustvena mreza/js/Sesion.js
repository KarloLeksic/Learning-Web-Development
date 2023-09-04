class Session {
  user_id = '';

  // Postavljamo na nacin da postavimo cookie pod nazivom user_id i vrijednoscu sa ID*jem korisnika
  startSession() {
    // Postavimo datum za istek - 2 dana
    const d = new Date();
    d.setTime(d.getTime() + (2 * 24 * 60 * 60 * 1000));

    // Formatiramo cijeli dio za istek u varijablu expires
    let expires = 'expires=' + d.toUTCString() + ';';

    // Stvorimo cookie koji sadrzi ulogiranog korisnika i vrijeme isteka
    document.cookie = 'user_id=' + this.user_id + ';' + expires;
  }

  // Vracanje vrijednosti cookiea pod nazivom user_id
  getSession() {
    // Pretrazimo jel imamo u cookie-u user_id da je korisnik ulogiran
    let name = 'user_id=';

    // Razdvajanje po ; jer su tako cookiei razdvojeni
    let ca = document.cookie.split(';');

    // U svakom potraziti nalazi li se 'user_id'
    for (let i = 0; i < ca.length; i++) {
      // Uzimanje jednog po jednog
      let c = ca[i];

      // Micanje razmaka jer uvijek bude negdje prije ili poslje
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }

      // Dok su maknuti raznaci trazimo nalazi li se 'user_id' u tom stringu
      if (c.indexOf(name) == 0) {
        // Ako je vracamo ga, samo njega
        return c.substring(name.length, c.length);
      }
    }

    // Ako nema user_id cookiea, vrati prazan string
    return "";
  }

  // Unistavamo ju tako da cookijima stavimo stari expires date i onda ce biti obrisan
  destroySession() {
    // Dohvacamo sve cookie
    let cookies = document.cookie.split(';');

    // Prolazimo kroz svaki cookie
    for (let i = 0; i < cookies.length; i++) {
      // Uzimamo jedan po jedan
      let cookie = cookies[i];

      // Trazimo znak jednakosti
      let eqPos = cookie.indexOf('=');

      // Dobivanje samo imena cookiea
      let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;

      // Postavimo ime na nista stari datum isteka da bi se cookie uklonio
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
    }
  }
}