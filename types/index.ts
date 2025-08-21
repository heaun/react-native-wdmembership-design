import { MembershipLevel } from "./membership";

// 이미지 파일 타입 선언
declare module "*.png" {
  const value: any;
  export default value;
}

declare module "*.jpg" {
  const value: any;
  export default value;
}

declare module "*.jpeg" {
  const value: any;
  export default value;
}

declare module "*.svg" {
  const value: any;
  export default value;
}

declare module "*.lottie" {
  const value: any;
  export default value;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  membershipLevel: MembershipLevel;
  points: number;
  joinDate: string;
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
