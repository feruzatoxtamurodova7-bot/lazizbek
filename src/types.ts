export type UserRole = 'shop' | 'wholesaler' | 'manufacturer' | 'logistics' | null;

export interface UserProfile {
  name: string;
  role: UserRole;
  businessType?: string; // for shop
  district?: string; // tuman
  topProducts?: string[]; // top 3 products
  purchaseFrequency?: string; // haftasiga necha marta
  productGroup?: string; // for wholesaler
  warehouseLocation?: string; // for wholesaler
  minOrder?: string;
  hasDelivery?: boolean; // for wholesaler
  manufacturesWhat?: string; // for manufacturer
  factoryLocation?: string;
  monthlyVolume?: string;
  directSales?: boolean;
  vehicleType?: string; // for logistics: Labo, Isuzu, Gazel, Fura
  tripPrice?: string; // if Labo
  hasRefrigeration?: boolean; // if heavy vehicle
  serviceArea?: string;
  stir?: string; // 9-digit tax ID or 'Keyinroq'
  isVerified: boolean;
  registeredAt: string;
}

export interface SupplierOffer {
  id: string;
  supplierName: string;
  marketName: string;
  isVerified: boolean;
  updatedHoursAgo: number;
  confirmationsCount: number;
  deliveryTime: string;
  price: number;
  confidenceScore: number;
  isAnomaly: boolean;
}

export interface ProductData {
  id: string;
  name: string;
  category: string;
  unit: string;
  basePrice: number;
  history7Days: number[]; // 7 days of price points
  change7DaysPercent: number;
  offers: SupplierOffer[];
  fairRange: {
    cheap: number;
    fair: number;
    expensive: number;
  };
}

export interface BasketItem {
  id: string;
  name: string;
  qty: string;
  standardPrice: number;
  optimizedPrice: number;
  supplier: string;
  savings: number;
}

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text?: string;
  timestamp: string;
  type?: 'text' | 'register_card' | 'profile_summary' | 'price_card' | 'trend_card' | 'basket_card' | 'group_order' | 'receipt' | 'photo_scan' | 'accuracy_info' | 'wholesaler_demand' | 'logistics_request';
  data?: any;
  quickReplies?: Array<{ label: string; action: string; payload?: any }>;
}

export type RegistrationStep =
  | 'idle'
  | 'ask_name'
  | 'ask_role'
  // Shop steps
  | 'shop_biz_type'
  | 'shop_district'
  | 'shop_top_products'
  | 'shop_frequency'
  // Wholesaler steps
  | 'wholesaler_category'
  | 'wholesaler_warehouse'
  | 'wholesaler_min_order'
  | 'wholesaler_delivery'
  | 'wholesaler_stir'
  // Manufacturer steps
  | 'manufacturer_product'
  | 'manufacturer_factory'
  | 'manufacturer_volume'
  | 'manufacturer_direct'
  | 'manufacturer_stir'
  // Logistics steps
  | 'logistics_vehicle'
  | 'logistics_trip_or_fridge'
  | 'logistics_area'
  | 'logistics_stir'
  | 'completed';
