package com.example.demo.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Model.CartItem;
import com.example.demo.Model.Order;
import com.example.demo.Model.OrderItem;
import com.example.demo.Model.Product;
import com.example.demo.Model.Status;
import com.example.demo.Model.User;
import com.example.demo.Repository.CartItemRepository;
import com.example.demo.Repository.OrderRepository;

import org.springframework.transaction.annotation.Transactional;

import com.example.demo.Repository.ProductRepository;

@Service
public class CartItemService {
        @Autowired
    private CartItemRepository cartItemRepo;

    @Autowired
    private ProductRepository productRepo;
    @Autowired
    private OrderRepository orderRepository;

    public List<CartItem> getCart(User user) {
        return cartItemRepo.findByUser(user);
    }

@Transactional
public CartItem addToCart(User user, Long productId, int quantity) {
    Product product = productRepo.findById(productId).orElseThrow();

    if (product.getStock() < quantity) {
        throw new RuntimeException("Stock insuffisant");
    }

    // Vérifie si ce produit est déjà dans le panier de l'utilisateur (en attente)
    Optional<CartItem> existingItem = cartItemRepo.findByUserAndProductAndStatus(user, product, Status.EN_ATTENTE);

    CartItem item;
    if (existingItem.isPresent()) {
        item = existingItem.get();
        int newQuantity = item.getQuantity() + quantity;
        item.setTotalPrice(product.getPrix() * newQuantity); // 🔁 Mettre à jour le total


        if (product.getStock() < newQuantity) {
            throw new RuntimeException("Stock insuffisant");
        }

        item.setQuantity(newQuantity);
    } else {
        item = CartItem.builder()
                .user(user)
                .product(product)
                .quantity(quantity)
                .status(Status.EN_ATTENTE)
                .totalPrice(product.getPrix() * quantity) // 🔁 Calcul initial
                .build();
    }

    return cartItemRepo.save(item);
}



    public void removeFromCart(Long itemId) {
        cartItemRepo.deleteById(itemId);
    }

    public void clearCart(User user) {
        cartItemRepo.deleteByUser(user);
    }

@Transactional
public Order confirmCart(User user) {
    List<CartItem> cartItems = cartItemRepo.findByUserAndStatus(user, Status.EN_ATTENTE);

    if (cartItems.isEmpty()) {
        throw new IllegalStateException("Le panier est vide.");
    }

    Order order = new Order();
    order.setUser(user);
    order.setOrderDate(LocalDateTime.now());

    // Calculer le prix total
    double totalPrice = 0;
    List<OrderItem> orderItems = new ArrayList<>();

    for (CartItem cartItem : cartItems) {
        Product product = cartItem.getProduct();
        int newStock = product.getStock() - cartItem.getQuantity();

        if (newStock < 0) {
            throw new IllegalStateException("Stock insuffisant pour le produit : " + product.getNom());
        }

        // Calcul du prix total
        totalPrice += product.getPrix() * cartItem.getQuantity();

        // Décrémenter le stock
        product.setStock(newStock);
        productRepo.save(product);

        // Créer un OrderItem
        OrderItem orderItem = new OrderItem();
        orderItem.setOrder(order);
        orderItem.setProduct(product);
        orderItem.setQuantity(cartItem.getQuantity());
        orderItems.add(orderItem);

        // Modifier le statut du CartItem
        cartItem.setStatus(Status.CONFIRMED);
        cartItemRepo.save(cartItem); // Assurez-vous de sauvegarder le CartItem modifié
    }

    // Enregistrer la commande et ses éléments
    order.setTotalPrice(totalPrice); // Utiliser totalPrice calculé
    order.setStatus("CONFIRMED");
    order.setItems(orderItems);
    orderRepository.save(order);

    // Supprimer les CartItems après confirmation
    cartItemRepo.deleteAll(cartItems);

    return order;
}



}
