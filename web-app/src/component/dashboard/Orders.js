import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

export default function Orders({ orders, visibleOrders, showMoreOrders }) {
  let orderNumber = 0;

  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>City</TableCell>
            {/* <TableCell>Payment Method</TableCell> */}
            <TableCell>Status</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders && orders.length > 0 ? (
            orders.slice(0, visibleOrders).map((order) => {
              orderNumber++;
              return (
                <TableRow key={order.id}>
                  <TableCell>{orderNumber}</TableCell>
                  <TableCell>{order.dateTime}</TableCell>
                  <TableCell>{`${order.customer.firstName} ${order.customer.lastName}`}</TableCell>
                  <TableCell>{order.customer.email}</TableCell>
                  <TableCell>{order.address}</TableCell>
                  <TableCell>{order.city}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell align="right">{`$${order.total}`}</TableCell>
                </TableRow>
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
        <Link color="primary" href="#" onClick={showMoreOrders} sx={{ mt: 3 }}>
          See more orders
        </Link>
      )}
    </React.Fragment>
  );
}
