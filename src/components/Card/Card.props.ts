export interface CardProps {
    id:number;
    name: string;
    description: string;
    location: string;
    type: 'Недвижимость' | 'Авто' | 'Услуги';
    image?: string;
  }
  
export interface RealEstateProps extends CardProps {
    type: 'Недвижимость';
    propertyType: string;
    area: number;
    rooms: number;
    price: number;
  }
  
export interface CarProps extends CardProps {
    type: 'Авто';
    brand: string;
    model: string;
    year: number;
    mileage?: number;
  }
  
export interface ServiceProps extends CardProps {
    type: 'Услуги';
    serviceType: string;
    experience: number;
    cost: number;
    workSchedule?: string;
  }
  
export type ItemProps = RealEstateProps | CarProps | ServiceProps;
  