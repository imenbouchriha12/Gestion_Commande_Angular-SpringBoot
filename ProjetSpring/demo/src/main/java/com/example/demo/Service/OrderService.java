package com.example.demo.Service;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Model.Order;
import com.example.demo.Model.OrderItem;
import com.example.demo.Repository.OrderRepository;

@Service  // Ajoutez cette annotation
public class OrderService {
       @Autowired
    OrderRepository orderRepository;

public List<Map<String, Object>> getAllConfirmedOrdersWithDetails() {
    List<Order> orders = orderRepository.findByStatus("CONFIRMED");

    List<Map<String, Object>> results = new ArrayList<>();
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");

    for (Order order : orders) {
        Map<String, Object> orderData = new HashMap<>();
        orderData.put("orderId", order.getId());
        orderData.put("client", order.getUser().getFirstname() + " " + order.getUser().getLastname());
        orderData.put("email", order.getUser().getEmail());
        orderData.put("orderDate", order.getOrderDate().format(formatter)); // ✅ correction ici
        orderData.put("total_price", order.getTotalPrice());
        results.add(orderData);
    }

    return results;
}

public Map<String, Object> getOrderDetails(Long orderId) {
    Optional<Order> optionalOrder = orderRepository.findById(orderId);

    if (optionalOrder.isEmpty()) {
        throw new RuntimeException("Commande introuvable avec ID : " + orderId);
    }

    Order order = optionalOrder.get();
    Map<String, Object> orderData = new HashMap<>();
    orderData.put("orderId", order.getId());

    List<Map<String, Object>> itemList = new ArrayList<>();
    for (OrderItem item : order.getItems()) {
        Map<String, Object> itemData = new HashMap<>();
        itemData.put("nom", item.getProduct().getNom());
        itemData.put("photoBase64", item.getProduct().getPhotoBase64());
        itemData.put("quantity", item.getQuantity());
        itemData.put("price", item.getProduct().getPrix());
        itemList.add(itemData);
    }

    orderData.put("items", itemList);

    return orderData;
}

}
