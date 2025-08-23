"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Order, Product } from "@/lib/definitions";

const ImagePlaceholder = () => (
  <div className="w-full h-full bg-gray-600 flex items-center justify-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  </div>
);

export default function PurchasedProducts() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders");
        if (res.ok) {
          setOrders(await res.json());
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusChip = (status: string) => {
    switch (status) {
      case "Completed":
        return (
          <span className="text-xs bg-green-500/30 text-green-400 font-bold rounded-full px-2 py-1">
            تکمیل شده
          </span>
        );
      case "Pending":
        return (
          <span className="text-xs bg-yellow-500/30 text-yellow-400 font-bold rounded-full px-2 py-1">
            در انتظار
          </span>
        );
      case "Failed":
        return (
          <span className="text-xs bg-red-500/30 text-red-400 font-bold rounded-full px-2 py-1">
            ناموفق
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-white text-right">
        محصولات خریداری شده
      </h2>
      {isLoading ? (
        <p className="text-gray-400 text-right">در حال بارگذاری سفارشات...</p>
      ) : orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => {
            // ✨ FIX: Check the order status here
            const isCompleted = order.attributes.status === "Completed";

            return (
              <div key={order.id} className="bg-gray-700 p-4 rounded-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg text-white">
                    سفارش #{order.attributes.orderId}
                  </h3>
                  {getStatusChip(order.attributes.status)}
                </div>
                <div className="space-y-3">
                  {order.attributes.products.data.map((product: Product) => {
                    const imageUrl =
                      product.attributes.productImage?.data?.[0]?.attributes
                        ?.url;
                    const downloadUrl =
                      product.attributes.downloadableFile?.data?.attributes
                        ?.url;

                    return (
                      <div
                        key={product.id}
                        className="flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-4">
                          <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                            {imageUrl ? (
                              <Image
                                src={`${STRAPI_URL}${imageUrl}`}
                                alt={product.attributes.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <ImagePlaceholder />
                            )}
                          </div>
                          <p className="text-white">
                            {product.attributes.name}
                          </p>
                        </div>

                        {/* ✨ FIX: Only show the download button if the order is completed AND a download link exists */}
                        {isCompleted && downloadUrl ? (
                          <a
                            href={`${STRAPI_URL}${downloadUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition-colors"
                          >
                            دانلود
                          </a>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-400 text-right">
          شما هنوز هیچ محصولی خریداری نکرده‌اید.
        </p>
      )}
    </div>
  );
}
