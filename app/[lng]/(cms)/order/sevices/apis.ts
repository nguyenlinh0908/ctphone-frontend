import { OrderService } from "@services/order.service";
import { useQuery } from "react-query";

const orderService = new OrderService()

export const useOrderCms = ()=>{
    return useQuery("order", ()=> orderService.getOrdersInCms())
}