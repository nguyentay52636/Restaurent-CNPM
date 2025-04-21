import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Order } from "../../DataOrder"

interface DialogViewDetailsProps {
  order: Order | null;
}

export default function DialogViewDetails({ order }: DialogViewDetailsProps) {
  // Helper function to calculate total amount
  const calculateTotalAmount = (orderItems: any[]) => {
    return orderItems.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  return (
    <>
      <Dialog open={!!order} onOpenChange={() => order = null}>
        <DialogContent className="max-w-4xl p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Order Details</DialogTitle>
          </DialogHeader>
          {order && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Column: Order Details and Products */}
              <div className="md:col-span-2 space-y-6">
                {/* Order Details */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <Badge
                        variant={
                          order.status === "New Order"
                            ? "default"
                            : order.status === "Processed"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {order.status}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Transaction Date</p>
                      <p className="font-medium">
                        {new Date(order.created_at).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Payment Method</p>
                      <p className="font-medium">
                        {/* Replace with order.payment_method if available */}
                        Credit or Debit Card
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Ship Method</p>
                      <p className="font-medium">
                        {/* Replace with order.ship_method if available */}
                        Free Shipping (7-10 Days)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Product List */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Your Order</h3>
                  <div className="space-y-4">
                    {order.order_items.map((item) => (
                      <div
                        key={`${item.order_id}-${item.product_id}`}
                        className="flex items-center border rounded-lg p-4"
                      >
                        <img
                          src={
                            // Replace with item.product.image_url if available
                            "https://via.placeholder.com/80"
                          }
                          alt={item.product.name}
                          className="w-20 h-20 object-cover rounded mr-4"
                        />
                        <div className="flex-1">
                          <p className="font-medium">{item.product.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.product.description}
                          </p>
                          <p className="text-sm">
                            {item.quantity} x ${item.price.toFixed(2)}
                          </p>
                        </div>
                        <p className="font-medium">
                          ${(item.quantity * item.price).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Customer Details */}
              <div className="space-y-4 bg-muted/50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold">Customer Detail</h3>
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{order.user.full_name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Account</p>
                  <p className="font-medium">
                    {/* Replace with order.user.email if available */}
                    {order.user.full_name.toLowerCase().replace(" ", ".") + "@mail.com"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium">{order.user.address}</p>
                </div>
                <div className="border-t pt-4">
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-xl font-semibold">
                    ${calculateTotalAmount(order.order_items).toFixed(2)}
                  </p>
                </div>
                <Button
                  variant="default"
                  className="w-full"
                >
                  Process Order
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

