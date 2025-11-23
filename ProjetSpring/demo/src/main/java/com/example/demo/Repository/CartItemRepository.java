package com.example.demo.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Model.CartItem;
import com.example.demo.Model.Product;
import com.example.demo.Model.Status;
import com.example.demo.Model.User;


public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByUser(User user);
    void deleteByUser(User user);
    CartItem findByUserAndProduct(User user, Product product);
    Optional<CartItem> findByUserAndProductAndStatus(User user, Product product, Status status);
List<CartItem> findByUserAndStatus(User user, Status status);

}