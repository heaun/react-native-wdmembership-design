export enum MembershipType {
  VIP = "VIP",
  PREMIUM = "PREMIUM",
  GOLD = "GOLD",
  SILVER = "SILVER",
  BRONZE = "BRONZE",
  SAINT_PAUL = "SAINT_PAUL",
  PH_1603 = "PH_1603",
  WITH_DOCTORS = "WITH_DOCTORS"
}

export interface MembershipDetail {
  id: string;
  title: string;
  subtitle: string;
  membershipType: string;
  joinFee: string;
  annualFee: string;
  returnType: string;
  unit: string;
  familyDiscount: string;
  benefits: {
    title: string;
    items: string[];
  }[];
  cardImage: any;
  notes?: string[];
  backgroundColor: string;
}

export interface MembershipItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: any;
  type: "with-doctors" | "ph-1603" | "saint-paul";
}

export interface MembershipResult {
  approveStatus: boolean;
}
export interface MembershipCard {
  id: string;
  title: string;
  subtitle: string;
  membershipNumber: string;
  expiryDate: string;
  cardImage: any;
  backgroundColor: string;
  qrCodeImage: any;
  couponCount: number;
  infoSections: {
    id: string;
    title: string;
    type: "verification" | "coupon" | "action";
    value?: string | number;
    image?: any;
    onPress?: () => void;
  }[];
}

export interface MembershipLevel {
  id: string;
  name: string;
  color: string;
  benefits: string[];
  minPoints: number;
  discount: number;
}
