const fs = require('fs');

const path = './services/ContentService.ts';
let content = fs.readFileSync(path, 'utf8');

// The new nutra products
const newNutra = fs.readFileSync('nutra_temp.txt', 'utf8');

const startIndex = content.indexOf('  products: [');
const endIndex = content.indexOf('] as Product[],', startIndex);

if (startIndex === -1 || endIndex === -1) {
  console.log('Could not find products array');
  process.exit(1);
}

const existingNonNutraProductsStr = `
    {
      id: "prod-2",
      name: "Lingzhi Coffee 3-in-1",
      category: "Coffee",
      description: "The world's first healthy coffee blend, combining premium Brazilian coffee beans with 100% organic Ganoderma extract.",
      image: "/coffee/lingzhi.png",
      features: ["Low Acidity", "No Artificial Colors", "Organic Extract"],
      status: "Available"
    },
    {
      id: "prod-3",
      name: "Ganozhi Soap",
      category: "Cosmetics",
      description: "A specialized formula enriched with Ganoderma extract and palm oil to gently cleanse and moisturize the skin while preserving natural oils.",
      image: "/cosmetics/Ganozhisoap.png",
      features: ["pH Balanced", "Vitamin E Enriched", "Suitable for all Skin Types"],
      status: "Available"
    },
    {
      id: "prod-dish-cleen",
      name: "DXN Dish Cleen",
      category: "Cosmetics",
      description: "1 litre and 500 ml of viscous liquid form of dish cleen. A concentrated dishwashing liquid that effectively removes grease and food residues.",
      image: "/cosmetics/3d-dish-cleen.png",
      features: ["Grease Remover", "No Smell", "Aloe Vera Extract"],
      status: "Available"
    },
    {
      id: "prod-kombucha-saffron",
      name: "Saffron Kombucha",
      category: "Kombucha",
      description: "A premium fermented tea infused with Grade A Kashmiri Saffron cultivated right here in our Siddipet indoor facility.",
      image: "/kombucha/safronKombucha.png",
      features: ["Probiotic Rich", "Antioxidant Boost", "Indigenous Saffron"],
      status: "Available"
    },
    {
      id: "prod-kombucha-butterfly",
      name: "Butterfly Kombucha",
      category: "Kombucha",
      description: "A refreshing fermented tea infused with natural Butterfly Pea flower for a distinct flavor and antioxidant benefits.",
      image: "/kombucha/Butterfly pea copy.png",
      features: ["Probiotic Rich", "Antioxidant Boost", "Unique Flavor"],
      status: "Available"
    },
    {
      id: "prod-kombucha-classic",
      name: "Classic Kombucha",
      category: "Kombucha",
      description: "Our signature fermented tea, traditionally brewed to perfection for a balanced, refreshing taste.",
      image: "/kombucha/classicKomucha.png",
      features: ["Probiotic Rich", "Gut Health", "Naturally Carbonated"],
      status: "Available"
    },
    {
      id: "prod-6",
      name: "DXN Cocozhi",
      category: "Coffee",
      description: "This unique blend combines premium ingredients. DXN Cocozhi is a unique blend of Non-Dairy Creamer and cocoa, combining the rich flavors of these ingredients. Packaged in a convenient 500g powder form containing 20 sachets.",
      image: "/coffee/cocozhi.png",
      features: ["Premium Cocoa Blend", "Ganoderma Extract", "20 Servings Per Bag"],
      status: "Available"
    },
    {
      id: "prod-7",
      name: "DXN Cordyceps Coffee 3 in 1",
      category: "Coffee",
      description: "500 gm powder form of coffee with Cordyceps powder (Each sachet contains 20 gm). Premium coffee premix that is smooth, aromatic, and revitalizing.",
      image: "/coffee/cordyceps.png",
      features: ["Organic Cordyceps", "Premium Instant Coffee", "25 Servings Per Bag"],
      status: "Available"
    },
    {
      id: "prod-8",
      name: "DXN Zhi Mocha",
      category: "Coffee",
      description: "500 gm Powder form of coffee DXN Zhi mocha powder (Each Sachet contains 20gm). A premium instant coffee blend that combines the rich flavors of fine cocoa powder and Ganoderma extract.",
      image: "/coffee/zhimocha.png",
      features: ["Coffee Blend", "Ganoderma Extract", "25 Servings Per Bag"],
      status: "Available"
    },
    {
      id: "prod-8b",
      name: "DXN Hibiscus Floral Tea",
      category: "Coffee",
      description: "Each paper canister box contains 30g of dried Hibiscus flowers. This full-bodied flower produces a brilliant crimson-red tea featuring a tangy-sweet flavor.",
      image: "/coffee/hibiscus.png",
      features: ["Sun Dried Hibiscus", "Rich in Antioxidants", "35 Servings Per Pack"],
      status: "Available"
    },
    {
      id: "prod-8c",
      name: "DXN Wedelia Floral Tea",
      category: "Coffee",
      description: "Each paper canister box contains 30g of dried Wedelia flowers. This naturally aromatic flower brews into a delicate, fragrant tea with a mild floral taste.",
      image: "/coffee/wedelia.png",
      features: ["Sun Dried Wedelia", "Rich in Antioxidants", "75 Servings Per Pack"],
      status: "Available"
    },
    {
      id: "prod-8d",
      name: "DXN Butterfly Pea Floral Tea",
      category: "Coffee",
      description: "Each paper canister box contains 30g of dried Butterfly Pea flowers. This unique, naturally coloured tea offers a mild, earthy floral flavour and promotes memory function.",
      image: "/coffee/butterflyPea.png",
      features: ["Sun Dried Butterfly Pea", "Promotes Brain Health", "75 Servings Per Pack"],
      status: "Available"
    },
    {
      id: "prod-9",
      name: "DXN Veg Mayonnaise",
      category: "Agro",
      description: "A creamy, eggless spread crafted for sandwiches, salads, and dips. Packaged in a convenient 500g format. 100% vegetarian.",
      image: "/agro/veg_minus.png",
      features: ["Eggless & Cholesterol Free", "Smooth Consistency", "25 Servings Per Pack"],
      status: "Available"
    },
    {
      id: "prod-10",
      name: "DXN Radish Salt",
      category: "Agro",
      description: "A premium seasoning known as 'radish salt' created by combining salt and finely crushed radish. Packaged in a 200 ml PET bottle.",
      image: "/agro/Radist Salt.png",
      features: ["Flavour Enhancer", "Salt Alternative", "100% Natural"],
      status: "Available"
    },
    {
      id: "prod-12",
      name: "DXN Pita Bhringaraja Hair Oil",
      category: "Cosmetics",
      description: "DXN Pita Bhringaraja Oil is a premium Ayurvedic hair oil crafted with traditional herbal ingredients. Gently massage into the scalp for conditioning and nourishment — leaving hair healthy, strong and revitalised.",
      image: "/R and D/bhringaraja.png",
      features: ["Ayurvedic Formula", "Nourishes Scalp", "Strengthens Hair"],
      status: "Available"
    },
    {
      id: "prod-13",
      name: "DXN Cut Chilli Vinegar",
      category: "Agro",
      description: "By adding vinegar to chopped or sliced chillies, a flavoured vinegar known as 'DXN Cut Chilli Vinegar' is produced. The flavour of Indo-Chinese cuisines was the inspiration for the creation of DXN Cut Chilli Vinegar, which was made from the best green chillies.",
      image: "/agro/Cut chilli.png",
      features: ["Flavoured Vinegar", "Premium Green Chillies", "Indo-Chinese Inspired"],
      status: "Available"
    },
    {
      id: "prod-14",
      name: "D'Burger Patty Dough",
      category: "Agro",
      description: "Vegetable Dough is made for cooked, boiled or reheated vegetables. Sandwich a veggie patty between two sandwich halves, then top with lettuce, mayonnaise, raw onion slices, and any additional topping you choose.",
      image: "/agro/Dburger.jpg copy.png",
      features: ["100% Vegetarian", "Easy to Cook", "Versatile Use"],
      status: "Available"
    },
    {
      id: "prod-15",
      name: "DXN Ganozhi Shampoo",
      category: "Cosmetics",
      description: "Specially designed using Ganoderma extract with vitamin B5 (Panthenol), this refreshing shampoo makes hair smooth, healthy, soft and shiny. Suitable for all types of hair.",
      image: "/cosmetics/shampoo.png",
      features: ["Ganoderma Extract", "Vitamin B5", "For All Hair Types"],
      status: "Available"
    },
    {
      id: "prod-16",
      name: "DXN Instant Upma",
      category: "Agro",
      description: "DXN Instant Upma is a tasty and healthy breakfast made with suji, lentils, and vegetables like onion, garlic, and green chilli. It's quick to make and packed with nutrients. No artificial preservatives, just a wholesome, vegetarian-friendly meal to start your day!",
      image: "/agro/Upma.png",
      features: ["Quick Breakfast", "Nutrient Packed", "No Artificial Preservatives"],
      status: "Available"
    },
    {
      id: "prod-17",
      name: "DXN Lingzhi Coffee 2 in 1",
      category: "Coffee",
      description: "Lingzhi Coffee 2 in 1 is a unique blend of premium instant coffee mix and Ganoderma extract, designed to offer both a rich coffee experience and health-enhancing benefits. It contains no added sugar, making it ideal for health-conscious individuals who enjoy their coffee with a smooth, slightly earthy flavor.",
      image: "/coffee/lingzhi2in1.png",
      features: ["No Added Sugar", "Ganoderma Extract", "Premium Coffee Mix"],
      status: "Available"
    },
    {
      id: "prod-18",
      name: "DXN Morinzhi",
      category: "Wetfood",
      description: "Morinzhi is a health drink made from Noni fruit. It is prepared using a natural process and is commonly consumed daily to support overall health and wellness.",
      image: "/kombucha/Morinzhi Bottle 600ml.png",
      features: ["Noni Fruit Extract", "Natural Processing", "Daily Wellness"],
      status: "Available"
    },
    {
      id: "prod-19",
      name: "DXN Tomato Ketchup",
      category: "Agro",
      description: "DXN Tomato Ketchup is made from red tomatoes, sugar, acetic acid, salt and a blend of spices. It has a smooth texture and tangy-savoy flavor — perfect as a base for pasta, pizzas, marinades and many more recipes.",
      image: "/agro/tomato-ketchup.png",
      features: ["Smooth Texture", "Tangy Flavor", "Versatile Base"],
      status: "Available"
    },
    {
      id: "prod-20",
      name: "DXN Tomato Sauce",
      category: "Agro",
      description: "DXN Tomato Sauce is made from ripe tomatoes, acetic acid, and a blend of spices. It has a smooth texture and a tangy-savory flavor. This versatile sauce is commonly used as a base for foods like pasta dishes, pizzas, marinades, and more.",
      image: "/agro/tomatoSauce.png",
      features: ["Rich Flavor", "Ripe Tomatoes", "Versatile Use"],
      status: "Available"
    }
`;

const newProductsBlock = '  products: [\n' + newNutra + existingNonNutraProductsStr + '  ';
content = content.substring(0, startIndex) + newProductsBlock + content.substring(endIndex);

const oldMergeStr = `      } else {
        merged.push(cp);
      }`;
const newMergeStr = `      } else {
        if (!['prod-1', 'prod-11', 'prod-18'].includes(cp.id)) {
          merged.push(cp);
        }
      }`;

content = content.replace(oldMergeStr, newMergeStr);

fs.writeFileSync(path, content);
console.log('done');
