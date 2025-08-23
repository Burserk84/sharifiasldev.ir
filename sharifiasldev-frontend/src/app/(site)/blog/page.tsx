import { getPosts } from "@/lib/api";
import PostCard from "@/components/blog/PostCard";
import AuthorCard from "@/components/blog/AuthorCard";
import SearchCard from "@/components/blog/SearchCard";
import CtaCard from "@/components/blog/CtaCard";

/**
 * @file src/app/(site)/blog/page.tsx
 * @description صفحه اصلی وبلاگ که لیست پست‌ها را در یک چیدمان گرید نمایش می‌دهد.
 */
export default async function BlogPage() {
  // دریافت تمام پست‌ها از Strapi در سمت سرور
  const posts = await getPosts();

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">وبلاگ</h1>
        <p className="mt-4 text-lg text-gray-400">مطالب و مقالات تخصصی درباره طراحی، برنامه‌نویسی و کسب درآمد از وب.</p>
      </div>
      
      {/* استفاده از گرید ۱۲ ستونی برای ایجاد چیدمان نامتقارن و مدرن */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* ردیف اول: یک پست بزرگ در کنار کارت‌های جستجو و نویسنده */}
        <div className="col-span-12 lg:col-span-8">
          {posts?.[0] && <PostCard post={posts[0]} className="h-96" />}
        </div>
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <SearchCard />
          <AuthorCard />
        </div>

        {/* ردیف دوم: دو پست متوسط در کنار کارت فراخوان (CTA) */}
        {posts?.[1] && <PostCard post={posts[1]} className="col-span-12 lg:col-span-4 h-96" />}
        {posts?.[2] && <PostCard post={posts[2]} className="col-span-12 lg:col-span-4 h-96" />}
        <div className="col-span-12 lg:col-span-4"><CtaCard /></div>

        {/* بقیه پست‌ها به صورت یک گرید استاندارد نمایش داده می‌شوند */}
        {posts?.slice(3).map(post => (
          <PostCard key={post.id} post={post} className="col-span-12 lg:col-span-4 h-96" />
        ))}

      </div>
    </div>
  );
}