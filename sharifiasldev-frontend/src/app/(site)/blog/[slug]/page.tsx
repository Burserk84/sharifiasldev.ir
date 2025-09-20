import { getPostBySlug, getPosts } from "@/lib/api";
import Image from "next/image";
import { notFound } from "next/navigation";
import slugify from "slugify";
import Sidebar from "@/components/blog/Sidebar";
import PostCard from "@/components/blog/PostCard";
import ContentRenderer from "@/components/blog/ContentRenderer";
import CtaBanner from "@/components/ui/CtaBanner";

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const postData = await getPostBySlug(slug);

  if (!postData) {
    notFound();
  }
  const post = postData.attributes;

  const toc = [];
  const contentWithIds: BlocksContent =
    post.content?.map((block) => {
      if (block.type === "heading") {
        const text = block.children.map((child) => child.text).join("");
        const id = slugify(text, { lower: true, strict: true });
        toc.push({ id, text, level: block.level });
        return { ...block, id };
      }
      return block;
    }) || [];

  const excerpt = post.content
    ? post.content
        .filter((block) => block.type === "paragraph")
        .map((block) => block.children.map((child) => child.text).join(""))
        .join(" ")
        .substring(0, 160) + "..."
    : post.title;

  const allPosts = await getPosts();
  const relatedPosts = allPosts.filter((p) => p.id !== postData.id).slice(0, 3);
  const STRAPI_URL =
    process.env.NEXT_PUBLIC_STRAPI_URL || "process.env.NEXT_PUBLIC_STRAPI_URL";
  const imageUrl = post.coverImage?.data?.attributes?.url
    ? `${STRAPI_URL}${post.coverImage.data.attributes.url}`
    : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://sharifiasldev.ir/blog/${slug}`,
    },
    headline: post.title,
    description: excerpt,
    image: imageUrl,
    author: {
      "@type": "Person",
      name: "امیرعلی شریفی اصل", // Your name as the author
      url: "https://sharifiasldev.ir/about",
    },
    publisher: {
      "@type": "Organization",
      name: "SharifiaslDev",
      logo: {
        "@type": "ImageObject",
        url: "https://sharifiasldev.ir/logo.png", // A URL to your logo
      },
    },
    datePublished: post.publishedAt || post.createdAt, // Use publishedAt if available
    dateModified: post.updatedAt,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <main className="lg:col-span-8">
            <article>
              <h1 className="text-4xl lg:text-5xl font-extrabold mb-4 text-white text-right">
                {post.title}
              </h1>
              <p className="text-gray-400 mb-8 text-right">
                منتشر شده در:{" "}
                {new Date(post.createdAt).toLocaleDateString("fa-IR")}
              </p>
              {imageUrl && (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8 shadow-lg">
                  <Image
                    src={imageUrl}
                    alt={post.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover"
                    priority
                  />
                </div>
              )}
              {/* ✨ 3. Use the BlocksRenderer with custom components for headings */}
              <div className="prose prose-invert lg:prose-xl max-w-none text-right leading-loose">
                
                <ContentRenderer content={contentWithIds} />
                
                <CtaBanner />
                
              </div>
            </article>
          </main>
          <aside className="lg:col-span-4">
            <Sidebar toc={toc} />
          </aside>
        </div>
        <section className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-8">
            نوشته های دیگر
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <PostCard
                key={relatedPost.id}
                post={relatedPost}
                className="h-80"
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
