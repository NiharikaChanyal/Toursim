package com.tourism;

import com.tourism.repository.EnquiryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.*;

@RestController
@RequestMapping("/api/enquiries")
@CrossOrigin(origins = "*")
public class EnquiryController {

    @Autowired
    private EnquiryRepository enquiryRepository;

    @PostMapping("/send")
    public String sendEnquiry(@RequestBody Enquiry enq) {
        enq.setStatus("New");
        enquiryRepository.save(enq);
        return "Message Sent Successfully!";
    }

    @GetMapping("/all")
    public List<Enquiry> getAllEnquiries() {
        return enquiryRepository.findAll();
    }

    @DeleteMapping("/delete/{id}")
    public String deleteEnquiry(@PathVariable Long id) {
        enquiryRepository.deleteById(id);
        return "Enquiry deleted successfully!";
    }

    @PutMapping("/reply/{id}")
    public ResponseEntity<String> replyToEnquiry(@PathVariable Long id, @RequestBody java.util.Map<String, String> payload) {
        try {
            Enquiry enq = enquiryRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Enquiry not found"));

            String response = (String) payload.get("reply");
            enq.setResponse(response);
            enq.setStatus("Replied");
            enquiryRepository.save(enq);

            return ResponseEntity.ok("Reply Sent and Status Updated in Database!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }

    }
}

