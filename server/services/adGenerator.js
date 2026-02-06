function generatePrompt(productName, productDescription, adType) {
  const adTypePrompts = {
    facebook: `Create a lifestyle product photo for Facebook ads. Product: ${productName}. ${productDescription}. Style: professional, lifestyle, modern`,
    instagram: `Create an Instagram-ready lifestyle product image. Product: ${productName}. ${productDescription}. Style: trendy, aesthetic, high-quality`,
    tiktok: `Create a TikTok-style product showcase image. Product: ${productName}. ${productDescription}. Style: dynamic, engaging, vibrant`,
    luxury: `Create a luxury product lifestyle image. Product: ${productName}. ${productDescription}. Style: premium, elegant, sophisticated`,
    minimalist: `Create a minimalist product image. Product: ${productName}. ${productDescription}. Style: clean, simple, modern`,
    trendy: `Create a trendy product image. Product: ${productName}. ${productDescription}. Style: contemporary, stylish, fashionable`
  };

  const template = adTypePrompts[adType] || adTypePrompts.facebook;
  return template;
}

module.exports = { generatePrompt };
