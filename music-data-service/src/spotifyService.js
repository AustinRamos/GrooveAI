require('dotenv').config();
const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: 'http://localhost:3001/callback'
});

spotifyApi.clientCredentialsGrant().then(
    function(data) {
        console.log('The access token is ' + data.body['access_token']);
        spotifyApi.setAccessToken(data.body['access_token']);
    },
    function(err) {
        console.log('Something went wrong when retrieving an access token', err);
    }
);

const getTracks = async (req, res) => {
    try {
        const data = await spotifyApi.searchTracks('track:fourtet');
        res.send(data.body.tracks.items);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

module.exports = { getTracks };
