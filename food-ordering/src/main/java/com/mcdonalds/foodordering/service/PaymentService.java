package com.mcdonalds.foodordering.service;

import com.mcdonalds.foodordering.model.OrderDetail;
import com.mcdonalds.foodordering.response.PaymentResponse;
import com.stripe.exception.StripeException;

public interface PaymentService {
    
    public PaymentResponse createPaymentLink(OrderDetail order) throws StripeException;
}
