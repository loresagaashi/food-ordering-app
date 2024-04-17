package com.mcdonalds.foodordering.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.mcdonalds.foodordering.model.OrderDetail;
import com.mcdonalds.foodordering.model.OrderStatus;
import com.mcdonalds.foodordering.repository.OrderDetailRepository;

@Service
public class OrderDetailService extends BasicServiceOperations<OrderDetailRepository, OrderDetail>{

    public OrderDetailService(OrderDetailRepository orderDetailRepository){
        super(orderDetailRepository);
    }

    public OrderDetail moveToProgress(OrderDetail orderDetail) {
        orderDetail.setStatus(OrderStatus.IN_PROGRESS);
        orderDetail.setStartDateTime(LocalDateTime.now());

        return save(orderDetail);
    }

    public OrderDetail moveToProcessing(OrderDetail orderDetail) {
        orderDetail.setStatus(OrderStatus.PROCESSING);
        orderDetail.setEndDateTime(LocalDateTime.now());

        return save(orderDetail);
    }

    public OrderDetail moveToDelivering(OrderDetail orderDetail) {
        orderDetail.setStatus(OrderStatus.DELIVERING);
        orderDetail.setEndDateTime(LocalDateTime.now());

        return save(orderDetail);
    }

    public OrderDetail moveToCompleted(OrderDetail orderDetail) {
        orderDetail.setStatus(OrderStatus.COMPLETED);
        orderDetail.setEndDateTime(LocalDateTime.now());

        return save(orderDetail);
    }
    public Map<LocalDate, List<OrderDetail>> findAllByDateBetweenAndStatus(String customer, LocalDateTime from, LocalDateTime to, String status){
        if (customer == null) {
            customer = "";
        }
        return repository.findByDateTimeBetweenAndStatus(customer.trim().toLowerCase(), from, to, OrderStatus.valueOf(status))
        .stream()
        .collect(Collectors.groupingBy(x -> x.getDateTime().toLocalDate(), TreeMap::new, Collectors.toList()));
    }
}
