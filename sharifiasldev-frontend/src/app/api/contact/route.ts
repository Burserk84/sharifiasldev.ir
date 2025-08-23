import { NextResponse } from 'next/server';

/**
 * @file src/app/api/contact/route.ts
 * @description این API Route داده‌های فرم تماس را دریافت کرده و به Strapi ارسال می‌کند.
 */
export async function POST(request: Request) {
  try {
    // ۱. دریافت داده‌های JSON از درخواست فرانت‌اند
    const { name, email, message } = await request.json();

    // آدرس اندپوینت Strapi برای ذخیره پیام‌ها
    const strapiUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/submissions`;

    // ۲. آماده‌سازی داده‌ها برای ارسال به Strapi (نیاز به یک آبجکت data دارد)
    const submissionData = {
      data: {
        name,
        email,
        message,
      },
    };

    // ۳. ارسال درخواست POST به Strapi برای ذخیره داده‌ها
    const res = await fetch(strapiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submissionData),
    });

    // ۴. بررسی پاسخ از سمت Strapi و مدیریت خطا
    if (!res.ok) {
      const errorData = await res.json();
      console.error("Strapi Error:", errorData);
      throw new Error('Failed to submit form to Strapi');
    }

    // ۵. ارسال پاسخ موفقیت‌آمیز به فرانت‌اند
    return NextResponse.json({ success: true, message: 'Message sent successfully!' });

  } catch (error) {
    // مدیریت خطاهای کلی در سرور
    console.error("API Route Error:", error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}