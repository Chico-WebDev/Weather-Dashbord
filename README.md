# Weather Dashboard 🌦️

Une application météo simple et moderne qui permet de consulter la météo actuelle et les prévisions par ville.  
Réalisée avec **REACT, TailwindCSS et TypeScript**, en utilisant l’API OpenWeather.

## Capture d’écran 📸

![Aperçu de l’application](./assets/weather-app.png)

## Fonctionnalités ✨
- Rechercher la météo par ville  
- Afficher la température, humidité, vent, conditions  
- Interface responsive et moderne  

## Installation ⚙️
1. Clonez ce repo :
   ```bash
   git clone https://github.com/ton-projet/weather-dashboard.git
---

1. Concept du projet

Nom : Weather Dashboard
Description : Dashboard météo moderne avec géolocalisation, prévisions sur 7 jours et graphiques interactifs.

Catégorie : Frontend
Technologies : React, Chart.js, OpenWeather API, Geolocation

Objectifs du projet :

Afficher la météo actuelle selon la localisation de l’utilisateur.

Fournir une prévision météo sur 7 jours.

Visualiser les températures et conditions avec des graphiques interactifs (Chart.js).

Avoir une interface moderne et responsive.

2. Architecture du projet
```weather-dashboard/
│
├── public/
│   └── index.html        # Point d’entrée HTML
│
├── src/
│   ├── assets/           # Images, icônes, fonds d'écran
│   ├── components/       # Composants réutilisables
│   │   ├── WeatherCard.jsx
│   │   ├── ForecastChart.jsx
│   │   ├── SearchBar.jsx
│   │   └── Loader.jsx
│   │
│   ├── services/         # API calls
│   │   └── weatherAPI.js
│   │
│   ├── hooks/            # Hooks personnalisés
│   │   └── useGeolocation.js
│   │
│   ├── App.jsx           # Composant principal
│   ├── index.js          # Point d’entrée React
│   └── styles.css        # Styles globaux
│
├── package.json
└── README.md
---

3. Design et UI/UX

Palette de couleurs suggérée :

Bleu ciel (#4A90E2)

Blanc (#FFFFFF)

Gris clair (#F0F0F0)

Orange doux (#FFA500) pour highlights

Structure visuelle :

Header : Nom du projet + petite icône météo.

Barre de recherche : Permet de chercher une ville spécifique.

Météo actuelle : Carte avec température, conditions, icône météo et localisation.

Prévisions 7 jours : Liste de cartes ou graphique interactif.

Graphiques interactifs : Température, humidité, précipitations.

Footer : Informations sur le projet et API utilisée.

Prompt IA pour générer un visuel (Figma, MidJourney ou autre) :

Créer un design moderne pour un tableau de bord météo. Interface claire et responsive, avec bleu ciel comme couleur principale, cartes météo interactives, graphiques de prévisions sur 7 jours, icônes météo stylisées et fond léger. Style flat design, minimaliste et élégant.

4. Explication des parties
A. Composants

WeatherCard.jsx : Affiche la météo actuelle.

SearchBar.jsx : Input pour chercher une ville.

Loader.jsx : Affiche une animation pendant le chargement des données.

B. Services

weatherAPI.js : Contient les fonctions pour interroger l’API OpenWeather.
```
import axios from 'axios';

const API_KEY = 'VOTRE_CLE_API';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeatherByCoords = async (lat, lon) => {
  const response = await axios.get(`${BASE_URL}/onecall`, {
    params: {
      lat,
      lon,
      units: 'metric',
      exclude: 'minutely,hourly,alerts',
      appid: API_KEY
    }
  });
  return response.data;
};

export const getWeatherByCity = async (city) => {
  const response = await axios.get(`${BASE_URL}/weather`, {
    params: {
      q: city,
      units: 'metric',
      appid: API_KEY
    }
  });
  return response.data;
};
---

C. Hooks

useGeolocation.js : Récupère la position de l’utilisateur.

```
import { useState, useEffect } from 'react';

export const useGeolocation = () => {
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => setCoords(position.coords),
      (err) => console.error(err)
    );
  }, []);

  return coords;
};

---

D. App.jsx

Coordonne tous les composants et récupère les données météo.

5. Fonctionnalités bonus

Thème clair/sombre.

Prévisions détaillées (humidité, vent, pression).

Sauvegarde des villes favorites dans le localStorage.

Animation d’icônes météo (soleil, nuages, pluie).