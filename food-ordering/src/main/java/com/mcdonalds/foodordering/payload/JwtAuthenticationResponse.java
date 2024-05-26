package com.mcdonalds.foodordering.payload;

import com.mcdonalds.foodordering.model.UserAccount;
import lombok.Data;
@Data
public class JwtAuthenticationResponse {

    private String accessToken;

    private UserAccount user;

    public JwtAuthenticationResponse(UserAccount user, String accessToken) {
        this.accessToken = accessToken;
        this.user = user;
    }

}