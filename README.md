# 📘 README – Projet « Monde de Dév »

## 📌 Description

« Monde de Dév » est un réseau social dédié aux développeurs.

Il a pour objectif de favoriser la mise en relation entre développeurs partageant des intérêts communs afin de faciliter les opportunités professionnelles et la collaboration.

Ce projet est un MVP composé de :
- un front-end Angular
- un back-end Spring Boot
- une base de données MySQL

---

# Pré-requis

Avant installation, vous devez disposer de :
- [Node.js 22](https://nodejs.org/fr/download)
- [Angular CLI 20](https://angular.dev/tools/cli/setup-local#install-the-angular-cli)
- [Java 23](https://www.oracle.com/fr/java/technologies/downloads/) ou plus récent
- [Maven](https://maven.apache.org/download.cgi)
- [MySQL](https://dev.mysql.com/downloads/mysql/)
- [Git](https://git-scm.com/install/)

---

## 📥 Installation du projet

```
git clone https://github.com/Openclassrooms-Java-Angular/Projet-6
cd Projet-6
```

---

## ⚙️ Configuration des variables d’environnement

L’application utilise des variables d’environnement pour configurer la connexion à la base de données.

**Sous Linux / MacOS** :
```
export DB_USERNAME=root
export DB_PASSWORD=secret
export DB_NAME=mdd
```

**Sous Windows (avec PowerShell)** :
```
$env:DB_USERNAME="root"
$env:DB_PASSWORD="secret"
$env:DB_NAME="mdd"
```

## 🗄️ Base de données

### 1️⃣ Création de la base
```
CREATE DATABASE mdd;
```

---

### 2️⃣ Création des tables

Les tables sont créées automatiquement au démarrage du backend grâce à Hibernate :

```
spring.jpa.hibernate.ddl-auto=update
```
✔ création automatique si tables absentes  
✔ aucune suppression de données

---

### 3️⃣ Données initiales

À exécuter après création de la base et des tables :
```
mysql -u VOTRE_LOGIN -p VOTRE_BASE < back/src/main/resources/data.sql
```

---

## Installation des dépendances back-end

```
cd backend
mvn clean install
```

---

## 🚀 Lancement du back-end

```
cd backend
mvn spring-boot:run
```

### API et documentation Swagger
```
http://localhost:8080/
http://localhost:8080/swagger-ui/index.html
```

---

## Installation des dépendances front-end

```
cd frontend
npm install
```

## 🌐 Lancement du front-end

```
npm start
```

Le front-end sera accessible sur :
```
http://localhost:4200
```