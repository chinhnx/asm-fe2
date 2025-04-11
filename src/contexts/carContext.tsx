import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useList, useUpdate } from "../hooks";
// import { useUser } from "./userContext";
import { getList, update } from "../providers";
import { useMutation, useQuery } from "@tanstack/react-query";
import { message } from "antd";
import { Icart } from "../interface/cart";
import { useUser } from "./userContext";



type CartContextType = {
  cart: Icart | null;
  setCart: (cart: Icart | null) => void;
  addToCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<Icart | null>(null);
  const [quantity, setQuantity] = useState(0);

  const { user } = useUser();
  console.log(user);

  useEffect(() => {
    if (!user) setCart(null);
  }, [user]);

  const { data } = useQuery({
    queryKey: ["carts"],
    queryFn: () => getList({ resource: `carts?userId=${user?.id}` }),
    enabled: !!user?.id,
  });

  const cartUser = data ? data[0] : null;

  const cartId = cartUser?.id;

  const { mutate } = useMutation({
    mutationFn: (values: any) =>
      update({ resource: "carts", values, id: cartId }),
    onSuccess: (data) => {
      message.success("add cart ok");
      setCart(data);
      setQuantity(data.quantity);
    },
  });

  useEffect(() => {
    if (!cartUser) return;
    setCart(cartUser);
    setQuantity(cartUser.quantity);
  }, [cartUser]);

  const addToCart = () => {
    if (!cartId || !user) return;
    mutate({
      userId: user.id,
      quantity: quantity + 1,
    });
  };
  return (
    <CartContext.Provider value={{ cart, setCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
