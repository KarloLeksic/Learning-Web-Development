// U KONZOLI NA NEKOJ STRANICI //
// Kada odemo na neku stranicu u konzolu mozemo dobiti kolacice
document.cookie
// Dobijemo string sa kolacicima
// Oni su razdvojeni sa ;
// Imamo naziv i vrijednost u obliku naziv=vrijednost

// Dodavanje jos nekog cookiea
document.cookie = "name=karlo"

// Sve cookie mozemo vidjeti tako da kliknemo na >> na F12 
// pa Aplication (moze biti i u tabu, ako ga nema stisnuti strelice)
// i sa lijeve strane imamo Storage -> Cookies

// Cookie moze stvoriti web stranica i samo ona moze upravljati svojim cookievima

// Uzimanje vrijednosti cookiea
let kolacici = documant.cookie;
// Sad je u kolacicima spremljeno to sve kao string
kolacici = kolacici.split(';'); // Razdvojimo ih po ; da dobijemo po jedan u svakom indeksu

let vrijdenost = kolacici[2].split('=');
vrijednost[1] // je vrijednost naseg kolacica