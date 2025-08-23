"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function SupportPage() {
  const [tickets, setTickets] = useState<unknown[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await fetch("/api/tickets");
        if (res.ok) {
          const data = await res.json();
          // --- DEBUG LOG ---
          console.log("Fetched tickets in component:", data);
          setTickets(data);
        }
      } catch (error) {
        console.error("Failed to fetch tickets:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTickets();
  }, []);

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-green-500/20 text-green-400";
      case "In Progress":
        return "bg-yellow-500/20 text-yellow-400";
      case "Closed":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8 text-right">
        <h1 className="text-4xl font-bold">تیکت‌های پشتیبانی</h1>
        <Button href="/dashboard/support/new" variant="primary">
          ایجاد تیکت جدید
        </Button>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-lg">
        {isLoading ? (
          <p className="p-6 text-center text-gray-400">
            در حال بارگذاری تیکت‌ها...
          </p>
        ) : tickets.length > 0 ? (
          <ul className="divide-y divide-gray-700">
            {tickets.map((ticket) => (
              <li key={ticket.id}>
                <Link
                  href={`/dashboard/support/${ticket.id}`}
                  className="block p-6 hover:bg-gray-700/50 transition-colors text-right"
                >
                  <div className="flex justify-between items-center">
                    {/* Accessing title via .attributes */}
                    <p className="font-bold text-white">
                      {ticket.attributes.title}
                    </p>
                    {/* Accessing status via .attributes */}
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusClass(
                        ticket.attributes.status
                      )}`}
                    >
                      {ticket.attributes.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    {/* Accessing createdAt via .attributes */}
                    ایجاد شده در:{" "}
                    {new Date(ticket.attributes.createdAt).toLocaleDateString(
                      "fa-IR"
                    )}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="p-6 text-center text-gray-400">
            شما هنوز هیچ تیکتی ثبت نکرده‌اید.
          </p>
        )}
      </div>
    </div>
  );
}
