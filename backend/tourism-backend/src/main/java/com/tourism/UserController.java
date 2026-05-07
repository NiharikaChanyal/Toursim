package com.tourism;

import com.tourism.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/all-users")
    public List<User> getAllUsers(){

        return userRepository.findAll();
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
        return ResponseEntity.ok("User deleted successfully");
    }

    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        // 1. Check  email is null or not
        User existingUser = userRepository.findByEmail(user.getEmail());
        if(existingUser != null) {
            return "Error: Email already registered!";
        }

        // 2. Default Role set
        user.setRole("USER");

        userRepository.save(user);
        return "Registration successful for: " + user.getName();
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginData){
        User u = userRepository.findByEmail(loginData.getEmail());

        // Password matching
        if(u != null && u.getPassword().equals(loginData.getPassword())){
            u.setPassword(null);
            return ResponseEntity.ok(u);
        }
        else {
            return ResponseEntity.status(401).body("Invalid Email or Password!");
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(user -> ResponseEntity.ok(user))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/update/{id}")
    @CrossOrigin(origins = "*")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        return userRepository.findById(id).map(user -> {
            user.setName(userDetails.getName());
            user.setMobile(userDetails.getMobile());
            user.setAddress(userDetails.getAddress());
            userRepository.save(user);
            return ResponseEntity.ok("User updated successfully");
        }).orElse(ResponseEntity.notFound().build());

    }

    @PutMapping("/update-password/{id}")
    public ResponseEntity<?> updatePassword(@PathVariable Long id, @RequestBody java.util.Map<String, String> passwords) {
        return userRepository.findById(id).map(user -> {
            String oldPassword = passwords.get("oldPassword");
            String newPassword = passwords.get("newPassword");

            // Check if old password matches
            if (!user.getPassword().equals(oldPassword)) {
                return ResponseEntity.status(401).body("Current password is incorrect!");
            }

            user.setPassword(newPassword);
            userRepository.save(user);
            return ResponseEntity.ok("Password updated successfully!");
        }).orElse(ResponseEntity.notFound().build());
    }

}

