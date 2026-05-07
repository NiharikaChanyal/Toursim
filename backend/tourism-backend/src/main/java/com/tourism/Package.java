package com.tourism;

import jakarta.persistence.*;

@Entity
@Table(name="packages")
public class Package {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String packName;
    @Column(length=1000)
    private String description;
    private String duration;
    private String price;
    @Column(name="imageUrl",length=2000)
    private String imageUrl;

    public Package() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getPackName() { return packName; }
    public void setPackName(String packName) { this.packName = packName; }

    public String getDescription() { return  description; }
    public void setDescription(String description) { this.description = description; }

    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }

    public String getPrice() { return price; }
    public void setPrice(String price) { this.price = price; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl;}
}
