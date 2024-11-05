export interface Dish {
  id?: string; // MongoDB automatically assigns _id, but we alias it to id
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
