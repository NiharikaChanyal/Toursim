package com.tourism;

import com.tourism.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*", allowedHeaders = "*") // Added allowedHeaders
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @PostMapping("/place")
    public String addBooking(@RequestBody Booking booking) {
        if (booking.getStatus() == null) {
            booking.setStatus("Confirmed");
        }
        bookingRepository.save(booking);
        return "Booking Successful!";
    }

    @GetMapping("/user/{userId}")
    public List<Booking> getMyBookings(@PathVariable Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    @GetMapping("/all")
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @DeleteMapping("/delete/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public String deleteBooking(@PathVariable Long id) {
        try {
            bookingRepository.deleteById(id);
            return "Booking Deleted Successfully!";
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }
}