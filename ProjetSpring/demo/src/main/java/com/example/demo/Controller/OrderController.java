package com.example.demo.Controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Model.Order;
import com.example.demo.Model.OrderItem;
import com.example.demo.Service.OrderService;

@CrossOrigin(origins = "*", allowedHeaders ="*")
@RestController
@RequestMapping("/api")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PreAuthorize("hasRole('ADMIN')")
@GetMapping("/orders")
public List<Map<String, Object>> getAllConfirmedOrders() {
    return orderService.getAllConfirmedOrdersWithDetails();
}
    @GetMapping("/details/{orderId}")
    public ResponseEntity<Map<String, Object>> getOrderDetails(@PathVariable Long orderId) {
        Map<String, Object> orderDetails = orderService.getOrderDetails(orderId);
        return ResponseEntity.ok(orderDetails);
    }

}
