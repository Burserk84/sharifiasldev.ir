"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export default function NewTicketPage() {
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('Technical Support');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    await fetch('/api/tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, department, message }),
    });

    setIsLoading(false);
    router.push('/dashboard/support'); // Redirect back to the ticket list
  };

  const inputStyles = "w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-gray-200 text-right";

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-right">ایجاد تیکت جدید</h1>
        <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-2">عنوان</label>
            <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className={inputStyles} />
          </div>
          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-400 mb-2">دپارتمان</label>
            <select id="department" value={department} onChange={(e) => setDepartment(e.target.value)} className={inputStyles}>
              <option>پشتیبانی فنی</option>
              <option>فروش</option>
            </select>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">پیام شما</label>
            <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} required rows={8} className={inputStyles}></textarea>
          </div>
          <Button type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? 'در حال ارسال...' : 'ارسال تیکت'}
          </Button>
        </form>
      </div>
    </div>
  );
}