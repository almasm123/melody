export interface CartItem {
  id: string; // unique identifier for cart item
  farmerId: number;
  farmerName: string;
  farmerVillage: string;
  productType: string;
  breed: string;
  weight: string;
  age: string;
  price: number;
  available: number; // available stock
  quantity: number; // quantity in cart
  image?: string;
}

export interface Product {
  type: string;
  breed: string;
  weight: string;
  age: string;
  available: number;
  price: number;
  category: string;
}

export interface Farmer {
  id: number;
  name: string;
  village: string;
  distance: string;
  rating: number;
  verified: boolean;
  products: Product[];
  image?: string;
}

// Generate unique cart item ID
export const generateCartItemId = (
  farmerId: number,
  productType: string,
  breed: string
): string => {
  return `${farmerId}-${productType}-${breed}`
    .replace(/\s+/g, "-")
    .toLowerCase();
};

// Check if adding quantity would exceed available stock
export const canAddToCart = (
  currentQuantity: number,
  available: number,
  addQuantity: number = 1
): boolean => {
  return currentQuantity + addQuantity <= available;
};

// Check if quantity can be increased
export const canIncreaseQuantity = (
  currentQuantity: number,
  available: number
): boolean => {
  return currentQuantity < available;
};

// Check if quantity can be decreased
export const canDecreaseQuantity = (currentQuantity: number): boolean => {
  return currentQuantity > 0;
};

// Validate cart item quantity against available stock
export const validateCartItemQuantity = (cartItem: CartItem): CartItem => {
  if (cartItem.quantity > cartItem.available) {
    return { ...cartItem, quantity: cartItem.available };
  }
  if (cartItem.quantity < 0) {
    return { ...cartItem, quantity: 0 };
  }
  return cartItem;
};

// Calculate total items in cart
export const getTotalCartItems = (cartItems: CartItem[]): number => {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
};

// Calculate cart subtotal
export const getCartSubtotal = (cartItems: CartItem[]): number => {
  return cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
};

// Convert farmer product to cart item
export const createCartItemFromProduct = (
  farmer: Farmer,
  product: Product,
  quantity: number = 1
): CartItem => {
  return {
    id: generateCartItemId(farmer.id, product.type, product.breed),
    farmerId: farmer.id,
    farmerName: farmer.name,
    farmerVillage: farmer.village,
    productType: product.type,
    breed: product.breed,
    weight: product.weight,
    age: product.age,
    price: product.price,
    available: product.available,
    quantity: Math.min(quantity, product.available), // ensure quantity doesn't exceed available
    image: farmer.image,
  };
};
