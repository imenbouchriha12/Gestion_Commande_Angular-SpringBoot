📦 Gestion des Commandes – Angular & Spring Boot (JWT Security)

Ce projet est une application complète de gestion des commandes composée d’un frontend Angular et d’un backend Spring Boot, protégés par une authentification JWT (JSON Web Token).
Il permet la gestion des produits, du panier, des commandes, ainsi que la séparation des rôles (Admin / Client).

🚀 Technologies utilisées
Backend – Spring Boot

Spring Boot 3+

Spring Security + JWT

Spring Data JPA (MySQL)

Jakarta Persistence

Lombok

ModelMapper

MySQL

Frontend – Angular

Angular 16+

Angular Routing

Services & Interceptors

JWT Token handling (localStorage)

Guards (AuthGuard, RoleGuard)

Bootstrap / Angular Material (optionnel)

🔐 Fonctionnalités – Sécurité
Authentification et rôles

Login avec email + mot de passe

Génération d’un JWT

Vérification automatique du token côté Angular via interceptor

Contrôle des accès côté backend avec :

@PreAuthorize("hasRole('ADMIN')")
@PreAuthorize("hasRole('CLIENT')")


Contrôle des routes côté Angular avec :

canActivate: [AuthGuard, RoleGuard]

🛒 Fonctionnalités principales
👨‍💼 Admin

CRUD Produits (Ajouter, Modifier, Supprimer, Consulter)

Gestion des commandes clients

Gestion du stock

🧑‍💻 Client

Voir la liste des produits

Ajouter au panier + choisir la quantité

Modifier / supprimer du panier

Valider le panier → création d’une commande

Consulter ses commandes

🧩 Architecture du projet
📁 Backend (Spring Boot)
src/
 ├── controller/
 ├── service/
 ├── repository/
 ├── entity/
 ├── security/
 │     ├── JwtFilter
 │     ├── JwtService
 │     ├── AuthController
 │     ├── SecurityConfig
 └── dto/

📁 Frontend (Angular)
src/app/
 ├── auth/
 │     ├── login/
 │     ├── register/
 │     ├── auth.service.ts
 │     ├── auth.guard.ts
 │     ├── role.guard.ts
 ├── products/
 ├── cart/
 ├── orders/
 ├── services/
 └── interceptors/
       └── jwt.interceptor.ts

🛠️ Installation & lancement
📌 Backend (Spring Boot)

Cloner le projet

git clone https://github.com/username/gestion-commandes.git


Configurer MySQL dans application.properties :

spring.datasource.url=jdbc:mysql://localhost:3306/gestion_commandes
spring.datasource.username=root
spring.datasource.password=


Lancer l’application :

mvn spring-boot:run

📌 Frontend (Angular)

Installer les dépendances :

npm install


Lancer l’application :

ng serve


Ouvrir dans le navigateur :
👉 http://localhost:4200/

🔗 API Principales
Auth
Méthode	Endpoint	Rôle	Description
POST	/auth/login	Public	Connexion
POST	/auth/register	Public	Création compte
Produits
Méthode	Endpoint	Rôle
GET	/products	PUBLIC / CLIENT / ADMIN
POST	/products	ADMIN
PUT	/products/{id}	ADMIN
DELETE	/products/{id}	ADMIN
Panier / Commandes
Endpoint	Rôle
/cart/add	CLIENT
/cart/remove	CLIENT
/orders/validate	CLIENT
/orders/all	ADMIN
🛡️ JWT Interceptor (Angular)

Le token est automatiquement ajouté aux requêtes HTTP :

const token = localStorage.getItem('token');
if (token) {
  req = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  });
}

👥 Contributeur

Bouchriha Imen
email : imenbouchriha5@gmail.com
