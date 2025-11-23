package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;


import com.example.demo.Model.CartItem;
import com.example.demo.Model.Order;
import com.example.demo.Model.User;
import com.example.demo.Service.CartItemService;
import com.example.demo.Service.UserService;

@CrossOrigin(origins = "*", allowedHeaders ="*")
@RestController
@RequestMapping("/api")
public class CartItemController {
    
    @Autowired
    private CartItemService cartService;

    @Autowired
    private UserService userService;

    @GetMapping
     @PreAuthorize("hasRole('CLIENT')")
    public List<CartItem> getCart(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userService.findByUsername(userDetails.getUsername());
        return cartService.getCart(user);
    }
    @PreAuthorize("hasRole('CLIENT')")
    @PostMapping("/add")
    public CartItem addToCart(@AuthenticationPrincipal UserDetails userDetails,
                              @RequestParam Long productId,
                              @RequestParam int quantity) {
        User user = userService.findByUsername(userDetails.getUsername());
        return cartService.addToCart(user, productId, quantity);
    }
@PreAuthorize("hasRole('CLIENT')")
@DeleteMapping("/remove/{id}")
public void removeFromCart(@PathVariable Long id) {
    cartService.removeFromCart(id);
}

@Transactional
@PreAuthorize("hasRole('CLIENT')")
@DeleteMapping("/clear")
public void clearCart(@AuthenticationPrincipal UserDetails userDetails) {
    User user = userService.findByUsername(userDetails.getUsername());
    cartService.clearCart(user);
}


    @PreAuthorize("hasRole('CLIENT')")    
    @PostMapping("/confirm")
    public ResponseEntity<Order> confirmCart(@AuthenticationPrincipal UserDetails userDetails) {
    User user = userService.findByUsername(userDetails.getUsername());
    Order order = cartService.confirmCart(user);
    return ResponseEntity.ok(order);
}

}
