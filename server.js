// Ce fichier est important pour deployer l'application sur Heroku
const express = require('express');
const app = express();

function requireHTTPS(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}

//app.use(requireHTTPS);
app.use(express.static(`./dist/gameAnalyserPlatform` ));

app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: 'dist/gameAnalyserPlatform'}
  );
});

app.listen(process.env.PORT || 8080,()=>{
    console.log("server is listening...")
});
