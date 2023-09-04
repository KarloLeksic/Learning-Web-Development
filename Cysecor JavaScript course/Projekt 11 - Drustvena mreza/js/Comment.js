// Ova funkcionalnost nije dodana jer u trenutku pracenja 
// tutorijala nije moguce napraviti vise od 2 resursa na API-ju
class Comment {
  post_id = '';
  user_id = '';
  content = '';
  api_url = 'https://64db651d593f57e435b0e520.mockapi.io';

  create() {
    let data = {
      post_id: this.post_id,
      user_id: this.user_id,
      content: this.ontent,
    }

    data = JSON.stringify(data);

    fetch(this.api_url + '/Comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    })
      .then(response => response.json())
      .then(data => {
        // Nemora nam nista vratiti
      });
  }

  // Dobivanje komantara za taj post
  // Ucitamo sve komentare i ako se ID-jevi poklapaju to su komentari od tog posta
  async get(post_id) {
    let api_url = this.api_url + '/comments';

    const response = await fetch(api_url);
    const data = await response.json();
    let post_comments = [];

    let i = 0;
    data.forEach(item => {
      if (item.post_id === post_id) {
        post_comments[i] = item;
        i++;
      }
    });

    return post_comments;
  }
}