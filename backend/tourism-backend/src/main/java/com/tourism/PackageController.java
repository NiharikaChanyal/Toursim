package com.tourism;
import com.tourism.PackageService;
import com.tourism.repository.PackageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.*;

@RestController
@RequestMapping("/api/packages")
@CrossOrigin(origins = "*")

public class PackageController {

    @Autowired
    private  PackageService packageService;

    @Autowired
    private PackageRepository packageRepository;

    @GetMapping("/all")
        public List<Package> getAllPackages(){
        return packageRepository.findAll();
        }

    @PostMapping("/add")
    public Package addPackage(@RequestBody Package pkg) {
        try {
            System.out.println("Package save:"+ pkg.getPackName());
            return packageRepository.save(pkg);
        } catch (Exception e) {
            System.err.println("ERROR SAVING PACKAGE: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }
        @DeleteMapping("/delete/{id}")
    public String deletePackage(@PathVariable Long id){
        packageRepository.deleteById(id);
        return  "Package deleted successfully!";
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<String> updatePackage(@PathVariable Long id, @RequestBody Package updatedPkg) {
        packageService.updatePackage(id,updatedPkg);
        return ResponseEntity.ok("Package Updated Successfully!");
    }
}

