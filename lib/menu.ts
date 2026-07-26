import { img } from "./images";

export type Dish = {
  name: string;
  desc: string;
  price: number; // PKR
  tags?: ("chef" | "spicy" | "veg" | "seafood" | "new")[];
};

export type MenuCategory = {
  id: string;
  title: string;
  blurb: string;
  image: string;
  items: Dish[];
};

// KK Grove menu — BBQ, Pakistani, Continental, seafood, desserts & coolers.
export const menu: MenuCategory[] = [
  {
    id: "appetizers",
    title: "Appetizers",
    blurb: "Little plates to open the evening.",
    image: img.plating,
    items: [
      { name: "Dynamite Prawns", desc: "Crispy prawns tossed in a creamy sweet-chilli glaze.", price: 1650, tags: ["chef", "seafood"] },
      { name: "Crab Rangoon", desc: "Golden wontons filled with crab & cream cheese.", price: 1250, tags: ["seafood"] },
      { name: "Jumbo Shrimp Cocktail", desc: "Chilled jumbo shrimp, house cocktail sauce.", price: 1750, tags: ["seafood"] },
      { name: "Calamari Fritti", desc: "Lightly fried calamari, lemon aioli.", price: 1450, tags: ["seafood"] },
      { name: "Crispy Chicken Wings", desc: "Charred wings, honey-buffalo or BBQ.", price: 1100 },
      { name: "Mozzarella Sticks", desc: "Molten mozzarella, marinara dip.", price: 950, tags: ["veg"] },
      { name: "Hummus & Pita", desc: "Silky chickpea hummus, warm pita, olive oil.", price: 900, tags: ["veg"] },
      { name: "Bruschetta", desc: "Toasted sourdough, vine tomato, basil.", price: 850, tags: ["veg"] },
    ],
  },
  {
    id: "soups-salads",
    title: "Soups & Salads",
    blurb: "Fresh, warm and everything between.",
    image: img.salad,
    items: [
      { name: "Coconut Soup", desc: "Signature creamy coconut broth, lemongrass.", price: 750, tags: ["chef", "veg"] },
      { name: "Lobster Bisque", desc: "Velvety lobster bisque, brandy cream.", price: 1250, tags: ["seafood"] },
      { name: "Thai Hot & Sour", desc: "Aromatic chilli-lime broth, prawns.", price: 850, tags: ["spicy", "seafood"] },
      { name: "French Onion", desc: "Caramelised onion, gruyère crouton.", price: 780 },
      { name: "Caesar Salad", desc: "Cos lettuce, parmesan, garlic croutons.", price: 950, tags: ["veg"] },
      { name: "Cobb Salad", desc: "Grilled chicken, egg, avocado, blue cheese.", price: 1150 },
      { name: "Greek Salad", desc: "Feta, cucumber, olives, oregano.", price: 950, tags: ["veg"] },
    ],
  },
  {
    id: "bbq",
    title: "Grill & BBQ",
    blurb: "Charcoal-kissed cuts, the house specialty.",
    image: img.ribs,
    items: [
      { name: "Mutton Ribs", desc: "Slow-cooked ribs, smoky house rub.", price: 3400, tags: ["chef"] },
      { name: "Charred Beef Skewers", desc: "Marinated tenderloin, chimichurri.", price: 2400 },
      { name: "Chicken Malai Boti", desc: "Creamy char-grilled chicken skewers.", price: 1650 },
      { name: "Seekh Kebab Platter", desc: "Hand-minced beef seekh, mint chutney.", price: 1850, tags: ["spicy"] },
      { name: "BBQ Mixed Grill", desc: "Ribs, boti, kebab & grilled prawns to share.", price: 4200, tags: ["chef"] },
    ],
  },
  {
    id: "pakistani",
    title: "Pakistani",
    blurb: "Local flavours, done immaculately.",
    image: img.grill,
    items: [
      { name: "Chicken Karahi", desc: "Wok-tossed chicken, tomato & green chilli.", price: 1950, tags: ["spicy"] },
      { name: "Chicken Cashew Nut", desc: "Silky cashew gravy, toasted nuts.", price: 1750, tags: ["chef"] },
      { name: "Mutton Biryani", desc: "Fragrant layered rice, tender mutton.", price: 1650 },
      { name: "Dal Makhani", desc: "Slow-simmered black lentils, butter & cream.", price: 950, tags: ["veg"] },
      { name: "Butter Chicken", desc: "Tandoori chicken, velvety tomato butter.", price: 1650 },
    ],
  },
  {
    id: "continental",
    title: "Continental & Mains",
    blurb: "International plates for every craving.",
    image: img.steak,
    items: [
      { name: "Dijon Beef Steak", desc: "Grain-fed tenderloin, dijon peppercorn jus.", price: 3200, tags: ["chef"] },
      { name: "Filet Mignon", desc: "8oz filet, red-wine reduction, gratin.", price: 3600, tags: ["chef"] },
      { name: "Morocco Spicy Chicken Steak", desc: "Harissa-spiced chicken, couscous.", price: 2200, tags: ["spicy"] },
      { name: "Mediterranean Baked Snapper", desc: "Whole snapper, herbs, lemon & capers.", price: 2900, tags: ["seafood"] },
      { name: "Grilled Salmon", desc: "Atlantic salmon, dill butter, greens.", price: 2800, tags: ["seafood"] },
      { name: "Chicken Alfredo", desc: "Fettuccine, parmesan cream, grilled chicken.", price: 1650 },
      { name: "Shrimp Scampi", desc: "Garlic-butter jumbo shrimp, linguine.", price: 2100, tags: ["seafood"] },
      { name: "Texas Burger", desc: "Double beef, cheddar, crispy onion, BBQ.", price: 1450 },
      { name: "Vegetable Lasagna", desc: "Layered pasta, roast veg, béchamel.", price: 1350, tags: ["veg"] },
    ],
  },
  {
    id: "desserts",
    title: "Desserts",
    blurb: "A sweet finish under the palms.",
    image: img.dessert,
    items: [
      { name: "Chocolate Lava Cake", desc: "Molten centre, vanilla bean ice cream.", price: 850, tags: ["chef"] },
      { name: "Tiramisu", desc: "Espresso-soaked ladyfingers, mascarpone.", price: 800 },
      { name: "Crème Brûlée", desc: "Vanilla custard, caramelised sugar.", price: 800 },
      { name: "Coconut Panna Cotta", desc: "House coconut cream, mango coulis.", price: 780, tags: ["new"] },
      { name: "Ice Cream Sundae", desc: "Triple scoop, hot fudge, nuts.", price: 650 },
    ],
  },
  {
    id: "drinks",
    title: "Coolers & Drinks",
    blurb: "Tropical refreshment, all evening long.",
    image: img.cooler,
    items: [
      { name: "Coconut Cooler", desc: "Signature fresh coconut, lime & mint.", price: 650, tags: ["chef", "new"] },
      { name: "Passion Mojito (Virgin)", desc: "Passionfruit, lime, soda, mint.", price: 600 },
      { name: "Fresh Juices", desc: "Orange, watermelon or seasonal.", price: 450 },
      { name: "Artisan Coffee", desc: "Espresso, cappuccino or latte.", price: 500 },
      { name: "Masala Chai", desc: "Spiced milk tea, the classic.", price: 350 },
    ],
  },
];

export const deals = [
  { title: "Weekend Brunch", detail: "Sat & Sun, 12:30–4 PM · unlimited spread", price: "Rs 1,995++" },
  { title: "Student Discount", detail: "Flat 10% off with a valid student ID", price: "10% OFF" },
  { title: "Happy Hour", detail: "Daily 5–7 PM on all signature coolers", price: "Buy 1 Get 1" },
  { title: "Family Meal Deal", detail: "Biryani, sides & drinks for four", price: "Rs 4,500" },
];
