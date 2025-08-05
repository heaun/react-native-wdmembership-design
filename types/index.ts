export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  membershipLevel: MembershipLevel;
  points: number;
  joinDate: string;
}

export interface MembershipLevel {
  id: string;
  name: string;
  color: string;
  benefits: string[];
  minPoints: number;
  discount: number;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: string;
  isActive: boolean;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  points: number;
  image: string;
  isAvailable: boolean;
}

export interface Transaction {
  id: string;
  type: "earn" | "redeem";
  amount: number;
  description: string;
  date: string;
  points: number;
}

export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Benefits: undefined;
  Rewards: undefined;
  Transactions: undefined;
  Settings: undefined;
};
