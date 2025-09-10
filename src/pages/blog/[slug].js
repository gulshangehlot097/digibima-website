"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { CallApi } from "@/api";
import constant from "@/env";
import { motion } from "framer-motion";
import {
  FiUser,
  FiCalendar,
  FiClock,
  FiTag,
  FiShare2,
  FiCopy,
  FiChevronLeft,
  FiCheck,
} from "react-icons/fi";


const toAbs = (url = "") => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  const clean = url.startsWith("/") ? url : `/${url}`;
  return `${constant.BASE_URL}${clean}`;
};
const stripHtml = (s = "") =>
  s
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
const calcReadingTime = (html = "") =>
  Math.max(
    1,
    Math.ceil(stripHtml(html).split(/\s+/).filter(Boolean).length / 200)
  );

function sanitizeAndAbsolutize(html = "") {
  if (!html) return "";
  html = html.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "");
  html = html.replace(/\son[a-z]+\s*=\s*(['"]).*?\1/gi, "");
  html = html.replace(
    /\s(src|href)\s*=\s*(['"])\s*\/(?!\/)([^'"]+)\2/gi,
    (m, a, q, p) => ` ${a}=${q}${toAbs("/" + p)}${q}`
  );
  html = html.replace(
    /\s(src|href)\s*=\s*(['"])(?!https?:\/\/|\/)([^'"]+)\2/gi,
    (m, a, q, p) => ` ${a}=${q}${toAbs("/" + p)}${q}`
  );
  html = html.replace(
    /url\((['"]?)\/(?!\/)([^'")]+)\1\)/gi,
    (m, q, p) => `url(${q}${toAbs("/" + p)}${q})`
  );
  html = html.replace(
    /url\((['"]?)(?!https?:\/\/|\/)([^'")]+)\1\)/gi,
    (m, q, p) => `url(${q}${toAbs("/" + p)}${q})`
  );
  return html;
}
const pickTitle = (b) =>
  b?.metatitle ||
  (b?.title && b.title !== "Untitled post") ||
  stripHtml(b?.content || "").slice(0, 80) ||
  b?.slug ||
  "Blog";


export default function BlogDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [post, setPost] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    (async () => {
      setLoading(true);
      setErr("");
      try {
        const res = await CallApi(constant.API.SINGLEBLOG, "POST", { id });

        if (!cancelled) {
          const b =
            res?.status && (res?.data || res?.blog)
              ? res.data || res.blog
              : null;

          if (b && typeof b === "object") {
            setPost({
              id: b.id,
              slug: b.slug,
              title: pickTitle(b),
              content: b.content || "",
              image: b.image || b.featured_image_url || b.featuredImage || "",
              date:
                b.publishdate ||
                b.publishDate ||
                b.created_at ||
                b.updated_at ||
                "",
              author: b.author || b.created_by || "",
              meta: {
                description: b.metadescription || "",
                keywords: b.keywords || "",
              },
              category: b.category || "",
              tags: b.tags || "",
            });
          } else {
            setErr(res?.message || "Post not found.");
          }
        }
      } catch {
        if (!cancelled) setErr("Failed to load the post.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const safeHtml = useMemo(
    () => sanitizeAndAbsolutize(post?.content || ""),
    [post?.content]
  );
  const title = post ? post.title : "Blog";
  const hero = toAbs(post?.image || "");
  const readMins = post ? calcReadingTime(post.content) : null;

  const fadeUp = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.45, ease: "easeOut" },
  };

  return (
    <main className="relative w-full overflow-hidden pt-32 sm:pt-28 md:pt-40 mb-16">
      <div className=" mx-auto max-w-4xl px-4">
        <div className="bg-white p-4 rounded-2xl mb-4">
          <motion.div
            {...fadeUp}
            className="flex items-center justify-between text-xs text-slate-500 mb-4"
          >
            <nav>
              <Link href="/" className="hover:text-[#1F4C7A]">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/blog" className="hover:text-[#1F4C7A]">
                Blogs
              </Link>
              {post?.slug ? (
                <>
                  <span className="mx-2">/</span>
                  <span className="text-slate-700">{post.slug}</span>
                </>
              ) : null}
            </nav>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1.5 hover:bg-slate-50"
            >
              <FiChevronLeft /> Back
            </Link>
          </motion.div>
        </div>

        {hero && (
          <motion.div
            {...fadeUp}
            className="rounded-[28px] bg-gradient-to-r from-sky-400/60 via-indigo-300/50 to-sky-400/60 p-[2px] shadow-sm ring-1 ring-black/5"
          >
            <div className="overflow-hidden rounded-[26px] bg-white">
              <motion.img
                src={hero}
                alt={title}
                className="w-full h-[420px] md:h-[540px] object-cover"
                initial={{ scale: 1.02 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                loading="eager"
              />
            </div>
          </motion.div>
        )}

        <motion.section {...fadeUp} className="mt-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1F4C7A]">
            {title}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
            {post?.author && (
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-slate-700">
                <FiUser /> {post.author}
              </span>
            )}
            {post?.date && (
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-slate-700">
                <FiCalendar />
                <time dateTime={post.date} className="ml-1">
                  {post.date}
                </time>
              </span>
            )}
            {readMins && (
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-slate-700">
                <FiClock /> {readMins} min read
              </span>
            )}
            {post?.category && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#E9F7FE] text-[#1F4C7A] px-3 py-1">
                <FiTag /> {post.category}
              </span>
            )}
          </div>

          <div className="mt-4 flex items-center gap-2">
            <button
              onClick={async () => {
                const url = window.location.href;
                try {
                  if (navigator.share)
                    await navigator.share({ title, text: title, url });
                  else if (navigator.clipboard) {
                    await navigator.clipboard.writeText(url);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1400);
                  }
                } catch {}
              }}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm hover:bg-slate-50"
            >
              <FiShare2 /> Share
            </button>
            <button
              onClick={async () => {
                const url = window.location.href;
                if (navigator.clipboard) {
                  await navigator.clipboard.writeText(url);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1400);
                }
              }}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm hover:bg-slate-50"
            >
              {copied ? <FiCheck /> : <FiCopy />}{" "}
              {copied ? "Copied" : "Copy link"}
            </button>
          </div>
        </motion.section>

        <motion.article
          {...fadeUp}
          className="mt-6 rounded-[28px] bg-white shadow-sm ring-1 ring-black/5 p-5 sm:p-8"
        >
          <div
            className="prose prose-slate max-w-none prose-img:rounded-xl prose-headings:scroll-mt-28 prose-a:text-[#1F4C7A] hover:prose-a:text-sky-600 prose-h2:border-l-4 prose-h2:border-sky-400 prose-h2:pl-2"
            dangerouslySetInnerHTML={{ __html: safeHtml }}
          />
          {(post?.tags || "") && (
            <div className="mt-6 flex flex-wrap gap-2">
              {(post?.tags || "")
                .split(",")
                .filter(Boolean)
                .map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-full bg-slate-100 text-xs text-slate-700"
                  >
                    {t.trim()}
                  </span>
                ))}
            </div>
          )}
        </motion.article>

        {loading && (
          <div className="overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-black/5 animate-pulse md:min-h-[320px]">
            <div className="grid grid-cols-1 md:grid-cols-2 h-full">
              <div className="relative h-48 md:h-full bg-slate-200"></div>

              <div className="p-6 sm:p-8 md:border-l md:border-slate-200 flex flex-col h-full space-y-4">
                <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                <div className="h-6 bg-slate-200 rounded w-1/2"></div>

                <div className="space-y-2">
                  <div className="h-4 bg-slate-200 rounded w-full"></div>
                  <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                  <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                </div>

                <div className="mt-auto pt-6 flex items-center justify-between">
                  <div className="h-10 bg-slate-200 rounded w-24"></div>
                  <div className="h-4 bg-slate-200 rounded w-16"></div>
                </div>
              </div>
            </div>
          </div>
        )}
        {!loading && err && (
          <p className="py-10 text-center text-red-600">{err}</p>
        )}
      </div>

      <Head>
        <title>{title} | Blog</title>
        {hero ? <meta property="og:image" content={hero} /> : null}
        <meta name="description" content={post?.meta?.description || title} />
        {post?.meta?.keywords ? (
          <meta name="keywords" content={post.meta.keywords} />
        ) : null}
      </Head>
    </main>
  );
}
