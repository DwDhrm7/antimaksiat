export const getProducts = () => {
  return [
    {
      id: '11',
      name: 'NEW WORLD ORDER TEE',
      price: 45,
      category: 'Tops',
      img: '/images/black_front.jpg',
      imgBack: '/images/black_back.jpg',
      alt: 'New World Order Tee',
      description: 'Heavyweight black cotton. Front features aggressive punk/goth print. Back message: "SPEAK LOUDLY, EVEN WHEN THE CULTURE WHISPERS WRONG. LOUDER AND LOUDER. THE NEW WORLD IN ORDER".',
      sizes: ['S', 'M', 'L', 'XL'],
      stock: 50,
      isNew: true
    },
    {
      id: '12',
      name: 'UNTOUCHED HERITAGE TEE',
      price: 45,
      category: 'Tops',
      img: '/images/white_front_nobg.jpg',
      imgBack: '/images/white_back_nobg.jpg',
      alt: 'Untouched Heritage Tee',
      description: 'Premium white tee. Front features skull, wine glass, and red crosshair. Back features a red star and declaration: "OUR HERITAGE ISN\'T JUST ABOUT SIN. PROTECT OUR CULTURE UNTOUCHED BY SIN".',
      sizes: [],
      stock: 0,
      isNew: false
    },
    { id: '1', name: 'TECHNO SYNDICATE', price: 40, category: 'Tops', img: '/images/product_shirt_1775644302740.png', alt: 'Product 1', description: 'Underground rave essential. Heavyweight cotton with oversized fit.', sizes: ['S', 'M', 'L', 'XL'], stock: 12 },
    { id: '2', name: 'ACID HOUSE', price: 40, category: 'Tops', img: '/images/product_shirt_2_1775644354289.png', alt: 'Product 2', description: 'Acid smiley distortion print. Inspired by 90s warehouse parties.', sizes: ['M', 'L'], stock: 5 },
    { id: '3', name: 'MIDNIGHT ZIP-UP', price: 75, category: 'Outerwear', img: '/images/product_hoodie_1775646087371.png', alt: 'Midnight Zip-Up Hoodie', description: 'Thermal insulated zip-up for late night escapades.', sizes: ['S', 'M', 'L', 'XL'], stock: 20 },
    { id: '4', name: 'PARACHUTE PANTS', price: 80, category: 'Bottoms', img: '/images/product_pants_1775646050628.png', alt: 'Cyber Parachute Pants', description: 'Ultra-wide parachute pants with adjustable toggles.', sizes: ['28', '30', '32', '34'], stock: 8 },
    { id: '5', name: 'NEO TRIBAL BEANIE', price: 25, category: 'Accessories', img: '/images/product_beanie_1775646068268.png', alt: 'Neo Tribal Beanie', description: 'Y2K tribal knit beanie. Snug fit.', sizes: ['OS'], stock: 15 },
    { id: '6', name: 'ACID SHIELD GLASSES', price: 35, category: 'Accessories', img: '/images/product_glasses_1775646108360.png', alt: 'Acid Shield Glasses', description: 'Wrap-around aerodynamic shades. UV400 protection.', sizes: ['OS'], stock: 3 },
    { id: '7', name: 'CHROME TRIBAL TEE', price: 45, category: 'Tops', img: '/images/product_7_1775655460477.png', alt: 'Chrome Tribal Tee', description: 'Reflective chrome prints on premium pre-shrunk cotton.', sizes: ['S', 'M', 'L'], stock: 10, isNew: true },
    { id: '8', name: 'BLOKECORE RACING JERSEY', price: 60, category: 'Tops', img: '/images/product_8_jersey_1775655949884.png', alt: 'Blokecore Retro Jersey', description: 'Vintage racing-inspired long sleeve jersey.', sizes: ['M', 'L', 'XL'], stock: 0, isNew: true },
    { id: '9', name: 'CYBER STEALTH PANTS', price: 85, category: 'Bottoms', img: '/images/product_pants_1775646050628.png', alt: 'Cyber Stealth Pants', description: 'Multi-pocket tactical pants with water-resistant finish.', sizes: ['30', '32', '34', '36'], stock: 22 },
    { id: '10', name: 'TRIBAL BEANIE REDUX', price: 25, category: 'Accessories', img: '/images/product_beanie_1775646068268.png', alt: 'Tribal Beanie Redux', description: 'Updated heavy-knit version of our classic tribal beanie.', sizes: ['OS'], stock: 45 }
  ];
};

export const getProductById = (id) => {
  return getProducts().find(p => p.id === id);
};
