// Import necessary modules
const { PrismaClient } = require('@prisma/client');

// Instantiate Prisma Client
const prisma = new PrismaClient();

// Function to seed the database
async function seed() {
  // Create products
  const product1 = await prisma.product.create({
    data: {
      name: 'Product 1',
      description: 'Description for Product 1',
      price: 19.99,
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: 'Product 2',
      description: 'Description for Product 2',
      price: 29.99,
    },
  });

  // Create customers
  const customer1 = await prisma.customer.create({
    data: {
      name: 'Customer 3',
      email: 'customer3@example.com',
    },
  });

  const customer2 = await prisma.customer.create({
    data: {
      name: 'Customer 4',
      email: 'customer5@example.com',
    },
  });

  // Create order items
  const orderItem1 = await prisma.orderItem.create({
    data: {
      productId: product1.id,
      quantity: 2,
      price: product1.price,
    },
  });

  const orderItem2 = await prisma.orderItem.create({
    data: {
      productId: product2.id,
      quantity: 1,
      price: product2.price,
    },
  });

  // Create orders
  const order1 = await prisma.order.create({
    data: {
      customerId: customer1.id,
      OrderItemId: orderItem1.id,
      total: orderItem1.price * orderItem1.quantity,
      status: 'Completed',
    },
  });

  const order2 = await prisma.order.create({
    data: {
      customerId: customer2.id,
      OrderItemId: orderItem2.id,
      total: orderItem2.price * orderItem2.quantity,
      status: 'Pending',
    },
  });

  // Create payments
  // const payment1 = await prisma.payment.create({
  //   data: {
  //     orderId: order1.id,
  //     amount: order1.total,
  //     currency: 'USD',
  //     method: 'Credit Card',
  //     status: 'Success',
  //   },
  // });

  // const payment2 = await prisma.payment.create({
  //   data: {
  //     orderId: order2.id,
  //     amount: order2.total,
  //     currency: 'USD',
  //     method: 'PayPal',
  //     status: 'Pending',
  //   },
  // });

  // console.log('Seed data created successfully');
}

// Run the seed function
seed()
  .catch((error) => {
    throw error;
  })
  .finally(async () => {
    // Close the Prisma Client connection
    await prisma.$disconnect();
  });
