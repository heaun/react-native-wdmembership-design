export enum ReservationMode {
  CONFIRM = "CONFIRM",
  CHANGE = "CHANGE",
  CANCEL = "CANCEL"
}

export enum ReservationType {
  SERVICE = "SERVICE",
  PRODUCT = "PRODUCT",
  EVENT = "EVENT"
}

export interface Reservation {
  service: {
    id: number;
    title: string;
    category: string;
    tags: string;
    image: any;
  };
  location: {
    id: number;
    name: string;
    address: string;
    image: any;
  };
  date: string;
  time: string;
  personCount: number;
  type: ReservationType;
}
