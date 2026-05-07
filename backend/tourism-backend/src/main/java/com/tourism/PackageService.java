package com.tourism;

import com.tourism.repository.PackageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PackageService {

    @Autowired
    private PackageRepository packageRepository;

    public void updatePackage(Long id, Package updatedData) {
        Package existingPkg = packageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Package not found with id: " + id));

        existingPkg.setPackName(updatedData.getPackName());
        existingPkg.setDescription(updatedData.getDescription());
        existingPkg.setDuration(updatedData.getDuration());
        existingPkg.setPrice(updatedData.getPrice());
        existingPkg.setImageUrl(updatedData.getImageUrl());

        packageRepository.save(existingPkg);
    }
}