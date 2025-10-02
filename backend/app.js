import { promises as fs } from "fs";

import bodyParser from "body-parser";
import express from "express";

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/meals", async (req, res) => {
  try {
    const meals = await fs.readFile("./data/available-meals.json", "utf8");
    return res.json(JSON.parse(meals));
  } catch (err) {
    console.error("Error reading meals file:", err);
    return res.status(500).json({ message: "Failed to load meals." });
  }
});

app.post("/orders", async (req, res) => {
  try {
    const orderData = req.body && req.body.order;

    // Validate orderData and items
    if (
      !orderData ||
      !Array.isArray(orderData.items) ||
      orderData.items.length === 0
    ) {
      return res
        .status(400)
        .json({ message: "Missing or invalid order data." });
    }

    const customer = orderData.customer || {};
    const email = customer.email || "";
    const name = customer.name || "";
    const street = customer.street || "";
    const postal = customer["postal-code"] || "";
    const city = customer.city || "";

    if (
      !email.includes("@") ||
      name.trim() === "" ||
      street.trim() === "" ||
      postal.trim() === "" ||
      city.trim() === ""
    ) {
      return res.status(400).json({
        message:
          "Missing data: Email, name, street, postal code or city is missing.",
      });
    }

    const newOrder = {
      ...orderData,
      id: (Math.random() * 1000).toString(),
    };

    const ordersRaw = await fs.readFile("./data/orders.json", "utf8");
    const allOrders = JSON.parse(ordersRaw || "[]");
    allOrders.push(newOrder);
    await fs.writeFile(
      "./data/orders.json",
      JSON.stringify(allOrders, null, 2)
    );
    return res.status(201).json({ message: "Order created!" });
  } catch (err) {
    console.error("Error in /orders:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
});

app.use((req, res) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: "Not found" });
});

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

server.on("error", (err) => {
  console.error("Server failed to start:", err);
  // exit the process so platform (Render) sees the failure clearly
  process.exit(1);
});
