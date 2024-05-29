package com.mcdonalds.foodordering.payload;

import lombok.Data;

@Data
public class RefreshTokenPayload {

    private String refreshToken;
}