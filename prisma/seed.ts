import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {

  await prisma.variantAttribute.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.attributeValue.deleteMany();
  await prisma.attribute.deleteMany();
  await prisma.category.deleteMany();
  await prisma.adress.deleteMany();
  await prisma.refreshToken.deleteMany();
  await prisma.user.deleteMany();

  const password = await bcrypt.hash("12345678", 10);

  //----------------------------------------
  // Users
  //----------------------------------------

  const admin = await prisma.user.create({
    data: {
      firstName: "Admin",
      lastName: "System",
      phone: "09120000000",
      email: "admin@test.com",
      password,
      role: UserRole.ADMIN,
    },
  });

  const customer = await prisma.user.create({
    data: {
      firstName: "Ali",
      lastName: "Ahmadi",
      phone: "09121111111",
      email: "customer@test.com",
      password,
      role: UserRole.CUSTOMER,
    },
  });

  const vendor = await prisma.user.create({
    data: {
      firstName: "Reza",
      lastName: "Karimi",
      phone: "09123333333",
      email: "vendor@test.com",
      password,
      role:UserRole.CUSTOMER
    },
  });

  //----------------------------------------
  // Address
  //----------------------------------------

  await prisma.adress.create({
    data: {
      userId: customer.id,
      province: "Tehran",
      city: "Tehran",
      postalCode: 1234567890,
      receiverName: "Ali Ahmadi",
      receiverPhone: "09121111111",
    },
  });

  //----------------------------------------
  // Categories
  //----------------------------------------

  const digital = await prisma.category.create({
    data:{
      name:'Digital',
      slug:"digital",
    }
  })

  const mobile = await prisma.category.create({
    data: {
      name: "Mobile",
      slug: "mobile",
      parent:{connect:{slug:"digital"}}
    },
  });

  const laptop = await prisma.category.create({
    data: {
      name: "Laptop",
      slug: "laptop",
      parent:{connect:{slug:"digital"}}
    },
  });

  //----------------------------------------
  // Attributes
  //----------------------------------------

  const color = await prisma.attribute.create({
    data: {
      name: "Color",
    },
  });

  const storage = await prisma.attribute.create({
    data: {
      name: "Storage",
    },
  });

  //----------------------------------------
  // Attribute Values
  //----------------------------------------

  const black = await prisma.attributeValue.create({
    data: {
      attributeId: color.id,
      value: "Black",
    },
  });

  const white = await prisma.attributeValue.create({
    data: {
      attributeId: color.id,
      value: "White",
    },
  });

  const s128 = await prisma.attributeValue.create({
    data: {
      attributeId: storage.id,
      value: "128GB",
    },
  });

  const s256 = await prisma.attributeValue.create({
    data: {
      attributeId: storage.id,
      value: "256GB",
    },
  });

  const s512 = await prisma.attributeValue.create({
    data: {
      attributeId: storage.id,
      value: "512GB",
    },
  });

  const s1028 = await prisma.attributeValue.create({
    data: {
      attributeId: storage.id,
      value: "1T",
    },
  });

  //----------------------------------------
  // Product
  //----------------------------------------

  const iphone = await prisma.product.create({
    data: {
      title: "iPhone 15",
      slug: "iphone-15",
      description: "Apple iPhone 15",
      categoryId: mobile.id,
    },
  });

  //----------------------------------------
  // Images
  //----------------------------------------

  await prisma.productImage.createMany({
    data: [
      {
        productId: iphone.id,
        url: "/images/iphone-front.jpg",
        isPrimary: true,
        sortOrder: 1,
      },
      {
        productId: iphone.id,
        url: "/images/iphone-back.jpg",
        sortOrder: 2,
      },
    ],
  });

  //----------------------------------------
  // Variants
  //----------------------------------------

  const variant1 = await prisma.productVariant.create({
    data: {
      productId: iphone.id,
      sku: "IPH15-BLK-128",
      stock: 12,
      price: 950,
      discountPrice: 900,
    },
  });

  const variant2 = await prisma.productVariant.create({
    data: {
      productId: iphone.id,
      sku: "IPH15-WHT-256",
      stock: 7,
      price: 1150,
    },
  });

  //----------------------------------------
  // Variant Attributes
  //----------------------------------------

  await prisma.variantAttribute.createMany({
    data: [
      {
        variantId: variant1.id,
        attributeValueId: black.id,
      },
      {
        variantId: variant1.id,
        attributeValueId: s128.id,
      },
      {
        variantId: variant2.id,
        attributeValueId: white.id,
      },
      {
        variantId: variant2.id,
        attributeValueId: s256.id,
      },
    ],
  });

  console.log("Seed completed");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });