
# 📦 Gestion des Commandes -- Spring Boot & Angular (JWT Security)

Ce projet est une application complète de **gestion des commandes**
composée d'un **backend Spring Boot sécurisé par JWT** et d'un
**frontend Angular**.\
Il permet la gestion des produits, du panier, des commandes et la
séparation des rôles (Admin / Client).

------------------------------------------------------------------------

## ✨ Fonctionnalités

### 🔐 Sécurité (JWT)

-   Authentification avec JWT.
-   Autorisation par rôles (ADMIN / CLIENT).
-   Protection des routes Angular avec `AuthGuard` et `RoleGuard`.
-   Interceptor pour attacher automatiquement le token aux requêtes
    HTTP.

### 👨‍💼 Rôle Admin

-   CRUD Produits.
-   Consultation des commandes.
-   Gestion du stock.

### 🧑‍💻 Rôle Client

-   Consulter les produits.
-   Ajouter / modifier / supprimer les articles du panier.
-   Valider le panier → Génération d'une commande.

------------------------------------------------------------------------

## 🛠️ Technologies utilisées

### Backend (Spring Boot)

-   Java 17+
-   Spring Boot 3+
-   Spring Security + JWT
-   Spring Data JPA (MySQL)
-   Jakarta Persistence
-   Lombok
-   ModelMapper

### Frontend (Angular)

-   Angular 16+
-   Angular Router
-   Services / Guard / Interceptor
-   Bootstrap / Angular Material (optionnel)

------------------------------------------------------------------------

## 📁 Structure du projet

### Backend

    src/main/java/com/project/
     ├── controller/
     ├── service/
     ├── repository/
     ├── entity/
     ├── security/
     │     ├── JwtService
     │     ├── JwtFilter
     │     ├── SecurityConfig
     │     ├── AuthController
     └── dto/

### Frontend

    src/app/
     ├── auth/
     ├── products/
     ├── cart/
     ├── orders/
     ├── services/
     └── interceptors/jwt.interceptor.ts

------------------------------------------------------------------------

# 🚀 Installation & Exécution

## 1️⃣ Cloner le projet

``` bash
git clone https://github.com/username/gestion-commandes.git
cd gestion-commandes
```

------------------------------------------------------------------------

# 🖥️ Backend -- Spring Boot

## 2️⃣ Configurer MySQL

Créer une base de données :

``` sql
CREATE DATABASE gestion_commandes;
```

Configurer le fichier `application.properties` :

``` properties
spring.datasource.url=jdbc:mysql://localhost:3306/gestion_commandes
spring.datasource.username=root
spring.datasource.password=

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

## 3️⃣ Lancer le backend

``` bash
mvn spring-boot:run
```

------------------------------------------------------------------------

# 🌐 Frontend -- Angular

## 4️⃣ Installer les dépendances

``` bash
cd frontend
npm install
```

## 5️⃣ Lancer Angular

``` bash
ng serve --open
```

L'application ouvrira :\
👉 http://localhost:4200/

------------------------------------------------------------------------

# 🔗 API Principales

## Authentification

  Méthode   Endpoint           Description
  --------- ------------------ -------------
  POST      `/auth/login`      Connexion
  POST      `/auth/register`   Inscription

## Produits

  Méthode   Endpoint           Rôle
  --------- ------------------ --------
  GET       `/products`        PUBLIC
  POST      `/products`        ADMIN
  PUT       `/products/{id}`   ADMIN
  DELETE    `/products/{id}`   ADMIN

## Panier & Commandes

  Méthode   Endpoint             Rôle
  --------- -------------------- --------
  POST      `/cart/add`          CLIENT
  POST      `/cart/remove`       CLIENT
  POST      `/orders/validate`   CLIENT
  GET       `/orders/all`        ADMIN

------------------------------------------------------------------------

# 🔐 Angular -- Interceptor JWT

``` ts
const token = localStorage.getItem('token');

if (token) {
  req = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  });
}
```

------------------------------------------------------------------------

# 👤 Auteur

**Bouchriha Imen**\
Développeuse Full Stack -- Spring Boot & Angular
=======

>>>>>>> b9737c7c1da139b703247d9ca65f97526f8c713e
