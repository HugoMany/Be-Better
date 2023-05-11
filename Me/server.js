const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Récupérer l'adresse IP de l'utilisateur qui envoie une demande de requête
  // const ip = req.connection.remoteAddress;

  // Afficher l'adresse IP de l'utilisateur dans la console
  // console.log(`Adresse IP de l'utilisateur : ${ip}`);

  // Récupérer l'URL demandée par l'utilisateur
  const reqUrl = req.url;

  if (reqUrl === '/') {
    // Si l'utilisateur demande la page d'accueil, renvoyer la page index.html
    const fileUrl = path.join(__dirname, 'index.html');
    fs.readFile(fileUrl, (err, data) => {
      if (err) {
        // Si une erreur se produit lors de la lecture du fichier, renvoyer une réponse d'erreur 500
        res.writeHead(500);
        res.end(err.message);
      } else {
        // Si le fichier est lu avec succès, renvoyer la page HTML
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
      }
    });
  } else {
    // Si l'utilisateur demande un autre fichier, le renvoyer
    const fileUrl = path.join(__dirname, reqUrl);
    const extname = path.extname(fileUrl);
    let contentType = 'text/html';
    switch (extname) {
      case '.js':
        contentType = 'text/javascript';
        break;
      case '.css':
        contentType = 'text/css';
        break;
      case '.json':
        contentType = 'application/json';
        break;
      case '.png':
        contentType = 'image/png';
        break;
      case '.jpg':
        contentType = 'image/jpg';
        break;
      case '.gif':
        contentType = 'image/gif';
        break;
      case '.mp4':
        contentType = 'video/mp4';
        break;
    }
    fs.readFile(fileUrl, (err, data) => {
      if (err) {
        // Si le fichier demandé n'existe pas, renvoyer une réponse d'erreur 404
        if (err.code === 'ENOENT') {
          res.writeHead(404);
          res.end('Fichier non trouvé');
        } else {
          // Si une erreur se produit lors de la lecture du fichier, renvoyer une réponse d'erreur 500
          res.writeHead(500);
          res.end(err.message);
        }
      } else {
        // Si le fichier est lu avec succès, renvoyer le fichier avec le type MIME approprié
        res.writeHead(200, {'Content-Type': contentType});
        res.end(data);
      }
    });
  }
});

// Démarrer le serveur et écouter les connexions entrantes sur le port 3000
server.listen(80, () => {
  console.log('Serveur en cours d\'exécution sur le port 80');
});
