package com.example.demo.Model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String description;
    private Double prix;
    private Integer stock;
    
    @Column(columnDefinition = "MEDIUMTEXT")
    private String photoBase64;
    private byte[] photo;
    private String descPhoto;
    private String categorie;


    public String getCategorie() {
        return this.categorie;
    }

    public void setCategorie(String categorie) {
        this.categorie = categorie;
    }



    public String getDescPhoto() {
        return this.descPhoto;
    }

    public void setDescPhoto(String descPhoto) {
        this.descPhoto = descPhoto;
    }
    

    // Getters and Setters for all fields
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrix() {
        return prix;
    }

    public void setPrix(Double prix) {
        this.prix = prix;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public String getPhotoBase64() {
        return photoBase64;
    }

    public void setPhotoBase64(String photoBase64) {
        this.photoBase64 = photoBase64;
    }

    public byte[] getPhoto() {
        return photo;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

}
