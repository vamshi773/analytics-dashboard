export type ProductRow = {
  id: string;
  name: string;
  category: "Electronics" | "Fashion" | "Home" | "Other";
  price: number;
  stock: number;
  status: "Active" | "Inactive";
  createdAt: string;
};

export type ProductsResponse = {
  products: ProductRow[];
};
