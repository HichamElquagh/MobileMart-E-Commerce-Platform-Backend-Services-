const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function seed() {
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
}
seed()
    .catch((error) => {
    throw error;
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map