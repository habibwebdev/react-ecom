import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrdersForAdmin } from '../actions/orderActions'

const OrdersListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const getOrders = useSelector((state) => state.getOrders)
  const { loading, error, orders } = getOrders

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      // Dispatch the action to get all the orders for Admin
      dispatch(getOrdersForAdmin())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])

  //   const deleteHandler = (id) => {
  //     // console.log('delete')

  //     if (window.confirm('Are you sure')) {
  //       // Dispatch the action for admin to delete the order
  //         dispatch(deleteUser(id))
  //     }
  //   }

  return (
    <>
      <h1>Orders</h1>
      {!orders ? (
        <p>No orders found...</p>
      ) : loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </LinkContainer>
                  {/* <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(order._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default OrdersListScreen
