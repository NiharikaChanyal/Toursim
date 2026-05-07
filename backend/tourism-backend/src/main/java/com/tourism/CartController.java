package com.tourism;

import com.tourism.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*")
public class CartController {

    @Autowired
    private CartRepository cartRepository;

    // 1. Add to Cart
    @PostMapping("/add")
    public ResponseEntity<String> addToCart(@RequestBody Cart cart) {
        cartRepository.save(cart);
        return ResponseEntity.ok("Package added to Cart successfully!");
    }

    // 2. View Cart by User
    @GetMapping("/user/{userId}")
    public List<Cart> getCartByUserId(@PathVariable Long userId) {
        return cartRepository.findByUserId(userId);
    }

    // 3. Remove from Cart
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> removeFromCart(@PathVariable Long id) {
        cartRepository.deleteById(id);
        return ResponseEntity.ok("Item removed from cart");
    }
}

