export interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  description :string;
  body_type: string;
  price: number | string;
  condition:string;
  color:string;
  images: string[] ;
  mileage: number ;
  engine:string;
  status:string;
}

export interface Advertisement {
  id: number;
  title: string;
  description: string;
  image: string;
  button_text: string;
  instagram_url: string;
  telegram_url: string;
  whatsapp_url: string;
}

