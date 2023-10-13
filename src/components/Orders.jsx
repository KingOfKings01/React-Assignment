import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.auth.id);

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return date.toLocaleDateString(undefined, options);
  }

  async function getOrders() {
    try {
      const response = await axios.get("https://api-assignment-jpjg.onrender.com/ordersByUserId/"+userId)
      setOrders([...response.data].slice().reverse()); //* Set orders in reverse order
      setLoading(false); // Set loading to false once the data is fetched
    } catch (error) {
      console.error('Error:', error);
      setLoading(false); // Set loading to false in case of an error
    }
  }

  useEffect(() => {
    getOrders();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>My Orders</h1>


<Table striped bordered hover>
      <thead>
        <tr>
          <th>Title</th>
          <th>Price</th>
          <th>Total</th>
          <th>Order date</th>
        </tr>
      </thead>
      <tbody>
      {orders.map((order, index) => (
          <tr key={index}>
            <td>
              {order.products.map((product, productIndex) => (
                <div key={productIndex}>{product.title}</div>
              ))}
            </td>
            <td>
              {order.products.map((product, productIndex) => (
                <div key={productIndex}>$ {product.price}</div>
              ))}
            </td>
            <td>
              $ {order.products.reduce((total, product) => total + product.price, 0)}
            </td>
            <td>{formatTimestamp(order.timestamp)}</td>
          </tr>
        ))}

      </tbody>
    </Table>
    </div>
  );
}
