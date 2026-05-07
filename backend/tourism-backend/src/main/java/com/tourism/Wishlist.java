package com.tourism;

import jakarta.persistence.*;

@Entity
@Table(name="wishlist")
public class Wishlist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private Long packId;
    private String packName;
    private Double price;

    @Column(name="imageUrl",length=2000)
    private String imageUrl;

    public Long getId() { return id;}
    public void setId(Long id) { this.id = id; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId=userId; }
    public Long getPackId() { return packId; }
    public void setPackId(Long packId) { this.packId=packId; }
    public String getPackName() { return packName;}
    public void setPackName(String packName) { this.packName=packName; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price=price; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl;}

}
