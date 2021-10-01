var faker = require('faker');

var database = { product: [], country:[] };

// Fake products
for (var i = 1; i <= 10; i++) {
  const productName = faker.commerce.productName();
  database.product.push({
    id: i,
    name: productName,
    description: faker.lorem.sentences(),
    price: faker.commerce.price(),
    imageUrl: `https://source.unsplash.com/1600x900/?${productName}`,
    quantity: faker.datatype.number()
  });
}

// Fake countries
for (var i = 1; i <= 5; i++) {
  const address = faker.address;
  database.country.push({
    countryId: i,
    countryName: address.country(),
    countryCode: address.countryCode()
  });
}

console.log(JSON.stringify(database));