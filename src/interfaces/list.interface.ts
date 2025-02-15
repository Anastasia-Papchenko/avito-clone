export interface List {
    id:number;
    name: string;
    description: string;
    location: string;
    type: 'Недвижимость' | 'Авто' | 'Услуги';
    image?: string;
  }
  
export interface RealEstate extends List {
    type: 'Недвижимость';
    propertyType: string;
    area: number;
    rooms: number;
    price: number;
  }
  
export interface Car extends List {
    type: 'Авто';
    brand: string;
    model: string;
    year: number;
    mileage?: number;
  }
  
export interface Service extends List {
    type: 'Услуги';
    serviceType: string;
    experience: number;
    cost: number;
    workSchedule?: string;
  }
  
export type Item = RealEstate | Car | Service;
  