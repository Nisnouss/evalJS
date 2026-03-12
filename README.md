# Projet Javascript - Afficher la météo d'une ville à partir d'API

## Structure du projet

### Stucture HTML
- div: pour l'affichage
- input type search: pour entrer le nom de la ville
- select: avec pour option les villes ajoutées en favoris
- bouton: "Afficher la météo"
- bouton: "Ajouter aux favoris"

### Création d'une classe

Création de la classe Weather permettant de stocker les variables: ville, température et description. Mise en place de la méthode displayWeather() qui permettra plus tard l'affichage des variables météo.

### Tableau traduisant le weathercode qui est un entier en une description textuel

Chaque indice du tableau est lié à une description.

### Fonction permettant l'affichage des données stockées dans le localStorage au rafraichissment de la page

Mise en place d'un select où les villes ajoutées en favoris sont en option.

### Mise en place d'une fonction asynchrone pour récupérer les données météos des liens API

- Récupération de la ville à partir d'un input et l'inclure au remier lien de l'API

- Le premier lien de l'API nous a permis de récupérer la latitude et la longitude de la ville saisie en input par l'utilisateur, et utiliser ces variables dans le second lien afin de récupérer les données météo

- Les données récupérée sont la description et la température et liées à la classe Weather et la méthode displayWeather() pour l'affichage.

- Mise en place également d'un localStorage permettant à l'utilisateur de stocker une ville de sont choix en favoris en cliquant sur le bouton "Ajouter aux favoris