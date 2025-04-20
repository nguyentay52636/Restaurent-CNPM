export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
  }
  
  export interface OrderItem {
    order_id: number;
    product_id: number;
    quantity: number;
    price: number;
    product: Product;
  }
  
  export interface User {
    id: number;
    full_name: string;
    address: string;
  }
  
  export interface Order {
    id: number;
    user_id: number;
    status: "New Order" | "Processed" | "Canceled";
    created_at: string;
    user: User;
    order_items: OrderItem[];
  }

    // Sample data
export const orders: Order[] = [
  {
    id: 1001,
    user_id: 1,
    status: "New Order",
    created_at: "2023-04-29",
    user: {
          id: 1,
          full_name: "Devon Lane",
          address: "3517 W. Gray St. Utica, Pennsylvania 57867",
        },
        order_items: [
          {
            order_id: 1001,
            product_id: 1,
            quantity: 1,
            price: 293,
            product: {
              id: 1,
              name: "RISTRETTO BIANCO",
              description: "A strong coffee",
              price: 293,
            },
          },
        ],
      },
      {
        id: 1002,
        user_id: 2,
        status: "New Order",
        created_at: "2023-04-29",
        user: {
          id: 2,
          full_name: "Arlene McCoy",
          address: "2972 Westheimer Rd. Santa Ana, Illinois 85486",
        },
        order_items: [
          {
            order_id: 1002,
            product_id: 1,
            quantity: 2,
            price: 293,
            product: {
              id: 1,
              name: "RISTRETTO BIANCO",
              description: "A strong coffee",
              price: 293,
            },
          },
          {
            order_id: 1002,
            product_id: 2,
            quantity: 3,
            price: 188,
            product: {
              id: 2,
              name: "ICED CREAMY LATTE",
              description: "A refreshing latte",
              price: 188,
            },
          },
        ],
      },
      {
        id: 1003,
        user_id: 3,
        status: "New Order",
        created_at: "2023-04-29",
        user: {
          id: 3,
          full_name: "Leslie Alexander",
          address: "2715 Ash Dr. San Jose, South Dakota 83475",
        },
        order_items: [
          {
            order_id: 1003,
            product_id: 1,
            quantity: 2,
            price: 293,
            product: {
              id: 1,
              name: "RISTRETTO BIANCO",
              description: "A strong coffee",
              price: 293,
            },
          },
          {
            order_id: 1003,
            product_id: 3,
            quantity: 2,
            price: 100,
            product: {
              id: 3,
              name: "CAPPUCINO",
              description: "A classic cappuccino",
              price: 100,
            },
          },
        ],
      },
      {
        id: 1004,
        user_id: 4,
        status: "Processed",
        created_at: "2023-04-29",
        user: {
          id: 4,
          full_name: "Savannah Nguyen",
          address: "3517 W. Gray St. Utica, Pennsylvania 57867",
        },
        order_items: [
          {
            order_id: 1004,
            product_id: 1,
            quantity: 1,
            price: 293,
            product: {
              id: 1,
              name: "RISTRETTO BIANCO",
              description: "A strong coffee",
              price: 293,
            },
          },
          {
            order_id: 1004,
            product_id: 2,
            quantity: 2,
            price: 188,
            product: {
              id: 2,
              name: "ICED CREAMY LATTE",
              description: "A refreshing latte",
              price: 188,
            },
          },
        ],
      },
      {
        id: 1005,
        user_id: 5,
        status: "Processed",
        created_at: "2023-04-29",
        user: {
          id: 5,
          full_name: "Courtney Henry",
          address: "4140 Parker Rd. Allentown, New Mexico 31134",
        },
        order_items: [
          {
            order_id: 1005,
            product_id: 1,
            quantity: 1,
            price: 293,
            product: {
              id: 1,
              name: "RISTRETTO BIANCO",
              description: "A strong coffee",
              price: 293,
            },
          },
          {
            order_id: 1005,
            product_id: 3,
            quantity: 2,
            price: 100,
            product: {
              id: 3,
              name: "CAPPUCINO",
              description: "A classic cappuccino",
              price: 100,
            },
          },
        ],
      },
      {
        id: 1006,
        user_id: 6,
        status: "Canceled",
        created_at: "2023-04-29",
        user: {
          id: 6,
          full_name: "Darrell Steward",
          address: "1901 Thornridge Cir.",
        },
        order_items: [
          {
            order_id: 1006,
            product_id: 1,
            quantity: 1,
            price: 293,
            product: {
              id: 1,
              name: "RISTRETTO BIANCO",
              description: "A strong coffee",
              price: 293,
            },
          },
          {
            order_id: 1006,
            product_id: 2,
            quantity: 1,
            price: 489,
            product: {
              id: 2,
              name: "ICED CREAMY LATTE",
              description: "A refreshing latte",
              price: 489,
            },
          },
        ],
      },
    ];