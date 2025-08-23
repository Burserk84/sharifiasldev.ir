"use client";
import { useState, useEffect, useCallback, use, ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { useSession } from "next-auth/react";
import { Ticket, TicketMessage } from "@/lib/definitions";

export default function SingleTicketPage({
  params,
}: {
  params: { ticketId: string };
}): ReactNode {
  // ✨ FIX: Unwrap the params promise with React.use() at the top.
  const { ticketId } = use(params);

  const { data: session } = useSession();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [isReplying, setIsReplying] = useState(false);

  const fetchTicket = useCallback(async () => {
    setIsLoading(true);
    // ✨ FIX: Use the unwrapped 'ticketId' variable.
    const res = await fetch(`/api/tickets/${ticketId}`);
    if (res.ok) {
      setTicket(await res.json());
    } else {
      setTicket(null);
    }
    setIsLoading(false);
  }, [ticketId]); // ✨ FIX: Use 'ticketId' in the dependency array.

  useEffect(() => {
    fetchTicket();
  }, [fetchTicket]);

  const handleReplySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setIsReplying(true);
    // ✨ FIX: Use the unwrapped 'ticketId' variable.
    await fetch(`/api/tickets/${ticketId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: newMessage }),
    });
    setNewMessage("");
    setIsReplying(false);
    fetchTicket();
  };

  if (isLoading) return <p className="text-center p-24">در حال بارگذاری...</p>;
  if (!ticket) return <p className="text-center p-24">تیکت یافت نشد.</p>;

  const { title, createdAt } = ticket.attributes;
  const messages = ticket.attributes.messages || [];

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-right">{title}</h1>
        <p className="text-gray-400 text-right mb-8">
          ایجاد شده در: {new Date(createdAt).toLocaleDateString("fa-IR")}
        </p>
        <div className="space-y-6">
          {messages.map((msg: TicketMessage, index: number) => {
            const author = msg.author?.data;
            if (!author) return null;

            const isMe = author.id === session?.user?.id;
            return (
              <div
                key={index}
                className={`p-4 rounded-lg max-w-xl ${
                  isMe
                    ? "bg-blue-800/50 text-right ml-auto"
                    : "bg-gray-700 text-left mr-auto"
                }`}
              >
                <p className="font-bold text-white mb-2">
                  {isMe ? "شما" : author.attributes.username}
                </p>
                <p className="whitespace-pre-wrap">{msg.message}</p>
              </div>
            );
          })}
        </div>
        <form
          onSubmit={handleReplySubmit}
          className="mt-8 border-t border-gray-700 pt-8"
        >
          <h2 className="text-2xl font-bold mb-4 text-right">ارسال پاسخ</h2>
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="پاسخ خود را بنویسید..."
            rows={5}
            className="w-full bg-gray-700 border border-gray-600 rounded-md py-3 px-4 text-gray-200 text-right"
            required
          ></textarea>
          <Button
            type="submit"
            variant="primary"
            className="mt-4"
            disabled={isReplying}
          >
            {isReplying ? "در حال ارسال..." : "ارسال پاسخ"}
          </Button>
        </form>
      </div>
    </div>
  );
}
