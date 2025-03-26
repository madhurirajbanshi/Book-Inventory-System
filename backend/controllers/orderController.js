import Order from "../models/Order.js";
import User from "../models/User.js";

const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const user = await User.findById(userId).populate("cart.book");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    if (user.cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty. Add items before placing an order." });
    }
    
    const orders = user.cart.map(item => ({
      user: userId,
      book: item.book._id,
      quantity: item.quantity,
      status: "Order placed",
    }));
    
    const createdOrders = await Order.insertMany(orders);
    
    user.orders.push(...createdOrders.map(order => order._id));
    user.cart = [];
    await user.save();
    
    res.status(201).json({ message: "Order placed successfully", orders: createdOrders });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Populate the book information for each order
    const user = await User.findById(userId).populate({
      path: "orders",
        populate: { path: "book", model: "Books" }
    });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    if (user.orders.length === 0) {
      return res.status(200).json({ message: "No orders found for this user", orders: [] });
    }
    
    res.status(200).json({ message: "Orders retrieved successfully", orders: user.orders });
  } catch (error) {
    console.error("Error retrieving orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const user = await User.findById(userId);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
    
    const { orderId, status } = req.body;
    
    // Validate the status
    const validStatuses = ["Order placed", "Out for delivery", "Delivered", "Canceled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid order status" });
    }
    
    // Find and update the order
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    
    order.status = status;
    await order.save();
    
    res.status(200).json({ message: "Order updated successfully", order });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { placeOrder, getUserOrders, updateOrder };