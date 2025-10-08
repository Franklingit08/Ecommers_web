import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Button, Col, ListGroup, Image, Card } from "react-bootstrap";
import Message from "../components/Message";
import { useNavigate, Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { clearCartItems } from "../slices/cartSlice";
import {useCreateOrderMutation,usePayOrderMutation,} from "../slices/orderApiSlice";
import Loader from "../components/Loader";


const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const [orderToPaid] = usePayOrderMutation();


  const placeOrderHandler = () => {
    var options = {
      key: 'rzp_test_RMH4oBE5E6YuaQ',
      key_secret: 'lf1gNihsSquPT84PoF4IQVFs',
      amount: parseInt(cart.totalPrice * 100),
      currency: "INR",
      name: "Franklin Geo",
      description: "Ecommers Transaction",
      handler: async function (response) {
        const pay = response.razorpay_payment_id;
        try {
          const res = await createOrder({
            cartItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            paymentResult: pay,
            itemPrice: cart.itemsPrice,
            taxPrice: cart.taxPrice,
            shippingPrice: cart.shippingPrice,
            totalPrice: cart.totalPrice,
          }).unwrap();

          dispatch(clearCartItems());
          await orderToPaid(res._id);
          navigate(`/order/${res._id}`);
        } catch (error) {
          console.log(error?.message || error?.data?.message);
        }
      },
      theme: {
        color: "#13a755ff",
      },
    };

    var pay = new window.Razorpay(options);
    pay.open();
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {cart?.shippingAddress.address}, {cart?.shippingAddress.city}{" "}
                {cart?.shippingAddress.postalCode},{" "}
                {cart?.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart?.paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart?.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart?.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart?.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart?.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart?.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart?.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart?.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
                {isLoading && <Loader />}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;