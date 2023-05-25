function searchAndPlay() {
    const artistName = document.getElementById('artistInput').value;
    const accessToken = 'BQCWpuCriHS7gqaNg8m463sbFPWuQMH_u_v2nqTfSAp5y3NwP-FJJRqGloO5w9zaQAoOutg241mRRZeM33X96gayaJwY5ywyijj77ilORxrxLG-ZKrr-RM9y2g-DVI_RWv5ALHJVX3fn_d6lTqwuESB1jonjtaP7dI0dWQvrkrnJS5CNLcBbon_tR637AeZg_d5erfrPVbIJFXtYeKWD6BR5225n'; // Replace with your access token
  
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
  