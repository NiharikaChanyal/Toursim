package com.tourism;

import com.tourism.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
    @RequestMapping("/api/wishlist")
    @CrossOrigin(origins = "*")
    public class WishlistController {

        @Autowired
        private WishlistRepository wishlistRepository;

        @PostMapping("/add")
        public ResponseEntity<String> addToWishlist(@RequestBody Wishlist wish) {
            wishlistRepository.save(wish);
            return ResponseEntity.ok("Added to Wishlist!");
        }

        @GetMapping("/user/{userId}")
        public List<Wishlist> getWishlist(@PathVariable Long userId) {

            return wishlistRepository.findByUserId(userId);
        }

        @DeleteMapping("/delete/{id}")
        public ResponseEntity<String> remove(@PathVariable Long id) {
            wishlistRepository.deleteById(id);
            return ResponseEntity.ok("Removed from wishlist");
        }
    }


