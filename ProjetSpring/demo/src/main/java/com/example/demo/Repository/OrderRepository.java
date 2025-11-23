package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Model.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByStatus(String status);

}

