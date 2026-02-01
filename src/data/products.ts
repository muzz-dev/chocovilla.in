export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Dark Chocolate Truffles",
    description: "Rich and velvety dark chocolate truffles made with 70% premium cocoa",
    price: 599,
    image: "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=800&h=600&fit=crop",
    category: "Truffles",
  },
  {
    id: 2,
    name: "Milk Chocolate Pralines",
    description: "Smooth milk chocolate pralines with hazelnut filling",
    price: 549,
    image: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=800&h=600&fit=crop",
    category: "Pralines",
  },
  {
    id: 3,
    name: "White Chocolate Raspberry",
    description: "Delicate white chocolate infused with real raspberry essence",
    price: 649,
    image: "https://images.unsplash.com/photo-1481391032119-d89fee407e44?w=800&h=600&fit=crop",
    category: "Bars",
  },
  {
    id: 4,
    name: "Assorted Chocolate Box",
    description: "A luxurious collection of our finest chocolates in an elegant box",
    price: 1299,
    image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800&h=600&fit=crop",
    category: "Gift Boxes",
  },
  {
    id: 5,
    name: "Caramel Sea Salt Dark",
    description: "Dark chocolate with gourmet caramel and a hint of sea salt",
    price: 699,
    image: "https://images.unsplash.com/photo-1606312619070-d48b4cbc8bf0?w=800&h=600&fit=crop",
    category: "Bars",
  },
  {
    id: 6,
    name: "Hazelnut Crunch",
    description: "Milk chocolate with roasted hazelnuts and crispy wafer",
    price: 579,
    image: "https://images.unsplash.com/photo-1511911063855-2bf39afa5b2e?w=800&h=600&fit=crop",
    category: "Bars",
  },
  {
    id: 7,
    name: "Champagne Truffles",
    description: "Luxurious truffles infused with premium champagne",
    price: 899,
    image: "https://images.unsplash.com/photo-1590080876778-b8e9dc5c6c8e?w=800&h=600&fit=crop",
    category: "Truffles",
  },
  {
    id: 8,
    name: "Orange Dark Chocolate",
    description: "Intense dark chocolate with zesty orange essence",
    price: 629,
    image: "https://images.unsplash.com/photo-1610450949065-1f2841536c88?w=800&h=600&fit=crop",
    category: "Bars",
  },
  {
    id: 9,
    name: "Luxury Gift Collection",
    description: "Premium assortment of 24 handcrafted chocolates in gold packaging",
    price: 1999,
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&h=600&fit=crop",
    category: "Gift Boxes",
  },
];

export const featuredProducts = products.slice(0, 3);
