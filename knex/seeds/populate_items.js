const postgis = require("knex-postgis")
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  const users = await knex('User').whereIn('email', ['test@example.com', 'test2@example.com'])

  if (users.length < 2) {
    throw {code: 'users-not-created', message: 'Create users with emails test@example.com and test2@example.com before running item seed'}
  }

  pgis = postgis(knex)

  const exampleImages = [
    'https://taperedmenswear.com/cdn/shop/articles/How_to_stretch_a_shirt.jpg?v=1620806946',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Blue_Tshirt.jpg/220px-Blue_Tshirt.jpg',
    'https://cdn.shopify.com/s/files/1/0096/2622/2688/products/TT-5212-19-4152_blue_540x.jpg?v=1681403576',
    'https://img.freepik.com/free-photo/basic-green-shirt-men-rsquo-s-fashion-apparel-studio-shoot_53876-101197.jpg?size=626&ext=jpg&ga=GA1.1.44546679.1699920000&semt=ais'
  ]

  // Deletes ALL existing entries
  await knex('UserInteractsItem').del()
  await knex('Item').del()
  await knex('Item').insert([
    {
      userID: users[0].userID,
      name: 'Test Item 1',
      description: 'This is a test item 1',
      priceData: {
        minPrice: 10,
        basePrice: 10,
        feePrice: 2,
        facePrice: 12
      },
      category: 'top',
      gender: 'unisex',
      size: "Large",
      colors: ['black', 'cream'],
      fit: "proper",
      condition: "good",
      images: [exampleImages[Math.floor(Math.random() * exampleImages.length)], exampleImages[Math.floor(Math.random() * exampleImages.length)]],
      country: "canada",
      region: "ontario",
      keywords: [],
      viewCount: 0,
      likeCount: 0,
      favCount: 0,
      isVisible: true,
      geoCoords: pgis.makePoint(-79.38595225392513, 43.65319988149475)
    },
    {
      userID: users[0].userID,
      name: 'Test Item 2',
      description: 'This is a test item 2. It is a shirt. This is a test item 2. It is a shirt. This is a test item 2. It is a shirt. This is a test item 2. It is a shirt. This is a test item 2. It is a shirt. This is a test item 2. It is a shirt. This is a test item 2. It is a shirt. This is a test item 2. It is a shirt. This is a test item 2. It is a shirt. This is a test item 2. It is a shirt.',
      priceData: {
        minPrice: 50,
        basePrice: 50,
        feePrice: 5,
        facePrice: 55
      },
      category: 'top',
      gender: 'unisex',
      size: "Small",
      colors: ['black', 'cream'],
      fit: "proper",
      condition: "good",
      images: [exampleImages[Math.floor(Math.random() * exampleImages.length)], exampleImages[Math.floor(Math.random() * exampleImages.length)]],
      country: "canada",
      region: "ontario",
      keywords: [],
      viewCount: 0,
      likeCount: 0,
      favCount: 0,
      isVisible: true,
      geoCoords: pgis.makePoint(-79.51812532616493, 43.6152785118532)
    },
    {
      userID: users[1].userID,
      name: 'Example 3',
      description: 'This is a example 3. It is a shirt. This is a example 3. It is a shirt. This is a example 3. It is a shirt. This is a example 3. It is a shirt. This is a test item 2. It is a shirt. This is a test item 2. It is a shirt. This is a test item 2. It is a shirt. This is a test item 2. It is a shirt. This is a test item 2. It is a shirt. This is a test item 2. It is a shirt.',
      priceData: {
        minPrice: 100,
        basePrice: 100,
        feePrice: 10,
        facePrice: 110
      },
      category: 'bottom',
      gender: 'men',
      size: "Medium",
      colors: ['red', 'blue'],
      fit: "proper",
      condition: "fair",
      images: [exampleImages[Math.floor(Math.random() * exampleImages.length)], exampleImages[Math.floor(Math.random() * exampleImages.length)], exampleImages[Math.floor(Math.random() * exampleImages.length)]],
      country: "canada",
      region: "ontario",
      keywords: [],
      viewCount: 0,
      likeCount: 0,
      favCount: 0,
      isVisible: true,
      geoCoords: pgis.makePoint(-79.70594065717958, 43.425343693428054)
    },
    {
      userID: users[1].userID,
      name: 'Too far away',
      description: 'You should not be able to see this item.',
      priceData: {
        minPrice: 100,
        basePrice: 100,
        feePrice: 10,
        facePrice: 110
      },
      category: 'bottom',
      gender: 'men',
      size: "Not found",
      colors: ['red', 'blue'],
      fit: "proper",
      condition: "fair",
      images: [exampleImages[Math.floor(Math.random() * exampleImages.length)], exampleImages[Math.floor(Math.random() * exampleImages.length)], exampleImages[Math.floor(Math.random() * exampleImages.length)]],
      country: "canada",
      region: "ontario",
      keywords: [],
      viewCount: 0,
      likeCount: 0,
      favCount: 0,
      isVisible: true,
      geoCoords: pgis.makePoint(17.64583589580121, 52.09891939542663)
    },
  ]);
  await knex('Item').insert((new Array(100)).fill(0).map((_, i) => {
    return {
      userID: users[1].userID,
      name: `Auto Example ${i}`,
      description: 'Some description',
      priceData: {
        minPrice: 10*i,
        basePrice: 10*i,
        feePrice: Math.ceil((10*i)/10),
        facePrice: 10*i + Math.ceil((10*i)/10)
      },
      category: 'bottom',
      gender: 'women',
      size: `Size ${i}`,
      colors: ['orange', 'blue'],
      fit: "proper",
      condition: "fair",
      images: [exampleImages[Math.floor(Math.random() * exampleImages.length)], exampleImages[Math.floor(Math.random() * exampleImages.length)], exampleImages[Math.floor(Math.random() * exampleImages.length)]],
      country: "canada",
      region: "ontario",
      keywords: [],
      viewCount: 0,
      likeCount: 0,
      favCount: 0,
      isVisible: true,
      geoCoords: pgis.makePoint(
        -79.70594065717958 + (Math.random() - 0.5)*0.2,
        43.425343693428054 + (Math.random() - 0.5)*0.2
      )
    }
  }))
};
