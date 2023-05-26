const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Endpoint to receive incoming webhook notifications
app.post('https://piurkor.developers.africastalking.com/incoming-messages', (req, res) => {
  const { text, from } = req.body;

  // Process the received text as needed
  console.log('Received message:');
  console.log('From:', from);
  console.log('Text:', text);

  // Pass the text to your desired function or perform any other actions

  res.sendStatus(200);
});




function searchAndPlay() {
    const artistName = document.getElementById('artistInput').value;
    const accessToken = 'BQC8t0jRhWzuDrePiHWcQ0vVmqtm5oa6iAaHZG3S1FVP0oe5mVJLK3l2SvXSyYzGtMrVoHIBgp3G2D38LpqOW2t6qqahGLt9z9JF-KGjgWG41jj_1d-jyv8nA2Br85kqRoMxsSsjm95y2tQHmG9vJsNRObLiqkfZfVclGLC_RBXKv6woAPMo7ErtasCf8sAXmaMJwGksFB_mLeEm9ONErsFIkln1A2WUiKgN-er7aIGKj-j3jEIsCVA3lMayBVv39sROudDvYsZIoZOtH_4_ete5'; // Replace with your access token
  
    fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        const artistId = data.artists.items[0].id; // Assuming the first search result is the desired artist
  
        fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=US`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        })
          .then(response => response.json())
          .then(data => {
            const trackUris = data.tracks.map(track => track.uri);
  
            const playerContainer = document.getElementById('playerContainer');
            playerContainer.innerHTML = `<iframe src="https://open.spotify.com/embed?uri=${encodeURIComponent(trackUris[0])}" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
          })
          .catch(error => {
            console.error('Error:', error);
          });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  

  app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });