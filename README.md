# Motorrit Tracker API
Dit project is een database-driven REST API, gemaakt met Node.js, Express en MongoDB, voor het beheren van motos en motorritten.<br/>
De API laat toe om motos en ritten aan te maken, op te vragen, te wijzigen en te verwijderen, met ondersteuning voor zoeken, sorteren, paginatie en basisvalidatie.<br/>

## Features
### Motos
- Overzicht van alle motos
- Detailweergave van één moto
- Nieuwe motos toevoegen
- Bestaande motos aanpassen
- Motos verwijderen
- Zoeken op:
  - merk
  - model
  - bouwjaar (min/max)
  - cilinderinhoud (min/max)
- Resultaten sorteren
- Resultaten beperken via paginatie (limit & offset)

### Ritten
- Overzicht van alle motorritten
- Detailweergave van één rit
- Nieuwe ritten toevoegen (gekoppeld aan een bestaande motor)
- Bestaande ritten aanpassen
- Ritten verwijderen
- Zoeken op:
  - titel
  - afstand (min/max)
  - datum (van/tot)
  - gekoppelde motor
- Resultaten sorteren
- Resultaten beperken via paginatie (limit & offset)
- Automatisch ophalen van motorinformatie via populate

### Validatie
- Verplichte velden mogen niet leeg zijn
- Numerieke velden accepteren enkel geldige getallen
- Minimumwaarden voor numerieke velden (bv. cc, afstand, jaar)
- Controle op geldige zoek- en rangeparameters
- Controle of een rit enkel gekoppeld kan worden aan een bestaande moto

## Installatie
### Vereisten
- Node.js 20+
- NPM
- MongoDB (lokaal)
- MongoDB Compass (optioneel, voor visualisatie)

### Installatiestappen
#### CLI
git clone https://github.com/AdamczykTara/Motorrit-Tracker-API<br/>
cd Motorrit-Tracker-API<br/>
npm install<br/>
cp .env.example .env<br/>

#### .env
Pas het .env-bestand aan met je MongoDB connectiestring.<br/>
Voorbeeld:<br/>
MONGO_URI=mongodb://127.0.0.1:27017/motorrit_tracker

#### CLI
npm run dev

## Gebruik
Voor gebruik moet je volgende zaken doen:
- MongoDB service moet actief zijn
- CLI: npm run dev
- HTTP-requests versturen via Thunder Client

De API draait standaard op:<br/>
http://localhost:3000<br/>

### Beschikbare endpoints
- /api/motos
- /api/motos/search
- /api/motos/:id
- /api/ritten
- /api/ritten/search
- /api/ritten/:id


De rootpagina (`/`) bevat een HTML-documentatiepagina met een overzicht van alle endpoints en validatieregels.

### Voorbeeldgebruik
- Voeg meerdere motos toe via POST `/api/motos`
- Voeg ritten toe gekoppeld aan een moto
- Gebruik zoek- en filterparameters om specifieke resultaten op te halen

## Support
Voor vragen of problemen: tara.adamczyk@student.ehb.be

## Contributing
Dit project is een examenopdracht voor de opleiding Toegepaste Informatica.<br/>
Suggesties en verbeteringen zijn welkom.<br/>

## Auteur
Tara Adamczyk<br/>
Student Toegepaste Informatica<br/>
Erasmushogeschool Brussel

## Licentie
Geen commerciële licentie inbegrepen.

## Project status
Afgewerkt

## Bronvermelding
Bij de ontwikkeling van dit project werden de volgende bronnen geraadpleegd.<br/>

### Framework en documentatie
- Node.js officiële documentatie  
  - https://nodejs.org/en/docs
- Express officiële documentatie  
  - https://expressjs.com/
- Mongoose documentatie  
  - https://mongoosejs.com/docs/

### Database
- MongoDB documentatie  
  - https://www.mongodb.com/docs/
- MongoDB Compass  
  - https://www.mongodb.com/products/tools/compass

### API testing
- Thunder Client  
  - https://www.thunderclient.com/

### Algemene ondersteuning
- Stack Overflow  
  - https://stackoverflow.com  
  - (Specifieke foutmeldingen en edge cases)
- ChatGPT  
  - https://openai.com  
  - (Ondersteuning bij API-architectuur, validatie, MongoDB, Express en best practices)
  - Alle gegenereerde code werd nagelezen, begrepen en aangepast door de auteur.

- README  
  - https://www.makeareadme.com/  
  - (Opstelling van de README)