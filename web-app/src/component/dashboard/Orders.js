import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Title from './Title';

export default function Orders({ orders, visibleOrders, showMoreOrders }) {
  let orderNumber = 0;

  const [expandedOrderId, setExpandedOrderId] = React.useState(null);

  const toggleOrderLines = (orderId) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
    } else {
      setExpandedOrderId(orderId);
    }
  };

  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
            <TableCell>Order Lines</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders && orders.length > 0 ? (
            orders.slice(0, visibleOrders).map((order) => {
              orderNumber++;
              const isExpanded = expandedOrderId === order.id;
              return (
                <React.Fragment key={order.id}>
                  <TableRow>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.dateTime}</TableCell>
                    <TableCell>{`${order.customer.firstName} ${order.customer.lastName}`}</TableCell>
                    <TableCell>{order.customer.email}</TableCell>
                    <TableCell>{order.address}</TableCell>
                    <TableCell>{order.city}</TableCell>
                    <TableCell>{order.paymentType}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell align="right">{`$${order.total.toFixed(2)}`}</TableCell>
                    <TableCell>
                      <Paper
                        elevation={3}
                        sx={{
                          padding: '10px',
                          background: '#f0f0f0',
                          cursor: 'pointer',
                        }}
                        onClick={() => toggleOrderLines(order.id)}
                      >
                        <Typography variant="body2" color="primary" sx={{ textDecoration: 'none' }}>
                          {isExpanded ? 'Hide Lines' : 'Show Lines'}
                        </Typography>
                      </Paper>
                    </TableCell>
                  </TableRow>
                  {isExpanded && (
                    <TableRow>
                      <TableCell colSpan={10}>
                        <Paper elevation={3} sx={{ padding: '10px', background: '#f9f9f9' }}>
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell style={{fontWeight: 'bold'}}>Product</TableCell>
                                <TableCell style={{fontWeight: 'bold'}}>Quantity</TableCell>
                                <TableCell style={{fontWeight: 'bold'}} align="right">Total Price</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {order.lines.map((line, index) => (
                                <TableRow key={index}>
                                  <TableCell>{line.product.name}</TableCell>
                                  <TableCell>{line.quantity}</TableCell>
                                  <TableCell align="right">{`${line.quantity} x ${line.price.toFixed(2)}`} {' - '} {`${(line.quantity * line.price).toFixed(2)}$`}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={7}>No orders found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {orders && visibleOrders < orders.length && (
        <Link color="primary" href="#" onClick={showMoreOrders} sx={{ mt: 3 }} style={{fontSize: '16px'}}>
          See more orders
        </Link>
      )}
    </React.Fragment>
  );
}
