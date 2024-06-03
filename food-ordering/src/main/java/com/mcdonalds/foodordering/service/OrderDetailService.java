package com.mcdonalds.foodordering.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.TreeMap;
import java.util.stream.Collectors;

import com.mcdonalds.foodordering.model.Customer;
import com.mcdonalds.foodordering.repository.CustomerRepository;
import org.springframework.stereotype.Service;

import com.mcdonalds.foodordering.model.OrderDetail;
import com.mcdonalds.foodordering.model.OrderStatus;
import com.mcdonalds.foodordering.repository.OrderDetailRepository;

@Service
public class OrderDetailService extends BasicServiceOperations<OrderDetailRepository, OrderDetail>{

    private final CustomerRepository customerRepository;

    public OrderDetailService(OrderDetailRepository orderDetailRepository, CustomerRepository customerRepository){
        super(orderDetailRepository);
        this.customerRepository = customerRepository;
    }

    @Override
    public OrderDetail save(OrderDetail orderDetail) {
        int totalBonusPoints = orderDetail.getLines().stream()
                .mapToInt(line -> Optional.ofNullable(line.getProduct().getBonusPoints()).orElse(0) * line.getQuantity().intValue())
                .sum();

        Customer customer = orderDetail.getCustomer();

        customer.setTotalBonusPoints(customer.getTotalBonusPoints() + totalBonusPoints);

        customerRepository.save(customer);

        return super.save(orderDetail);
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