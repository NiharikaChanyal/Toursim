package com.tourism;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name="bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private Long packId;
    private String packName;
    private String userName;
    private String bookingDate;
    private int persons;
    private Double totalPrice;
    private String status;

    public Booking() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public Long getPackId() { return packId; }
    public void setPackId(Long packId) { this.packId = packId; }
    public String getPackName() { return packName; }
    public void setPackName(String packName) { this.packName = packName; }
    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }
    public String getBookingDate() { return bookingDate; }
    public void setBookingDate(String bookingDate) { this.bookingDate = bookingDate; }
    public int getPersons() { return persons; }
    public void setPersons(int persons) { this.persons = persons; }
    public Double getTotalPrice() { return totalPrice; }
    public void setTotalPrice(Double totalPrice) { this.totalPrice = totalPrice; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}