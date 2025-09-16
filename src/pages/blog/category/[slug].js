"use client";
import Seo from "@/pages/components/seo";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { CallApi } from "@/api";
import constant from "@/env";
import BlogSection from "@/pages/components/blogpage/sectionone";

const PER_PAGE = 2; 


const slugify = (str = "") =>
  str
    .toString()
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const unslugify = (slug = "") =>
  slug
    .toString()
    .trim()
    .replace(/-/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase());

function normalizeCategoryChips(categoryCounts = []) {
  const arr = Array.isArray(categoryCounts) ? categoryCounts : [];
  return arr
    .map((r) => {
      const name =
        (r?.name || r?.category || "").toString().trim() || "Uncategorized";
      const count = Number(r?.count ?? r?.total ?? 0) || 0;
      return { name, count, slug: slugify(name) };
    })
    .filter((x) => x.name)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export default function CategoryPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);

  /* ---- server data ---- */
  const [blogs, setBlogs] = useState([]); 
  const [recentRaw, setRecentRaw] = useState([]); 
  const [categoriesRaw, setCategoriesRaw] = useState([]); 

  const [categoriesChips, setCategoriesChips] = useState([]);

  const category = useMemo(() => unslugify(String(slug || "")), [slug]);

  const reqIdRef = useRef(0);

  useEffect(() => {
    setPage(1);
  }, [slug]);

  const fetchPage = useCallback(
    async (p = 1) => {
      if (!slug) return;
      const base = constant?.API?.SINGLEBLOG || "";
      if (!base) {
        console.warn(
          "SINGLEBLOG API base URL missing at constant.API.SINGLEBLOG"
        );
        setLoading(false);
        setBlogs([]);
        setRecentRaw([]);
        setCategoriesRaw([]);
        setTotalPages(1);
        return;
      }

      const id = ++reqIdRef.current;
      setLoading(true);

      try {
        const url = `${base}?page=${p}&per_page=${PER_PAGE}`;
        const res = await CallApi(url, "POST", { category });
        console.log(res);

        if (id !== reqIdRef.current) return; 

        if (res?.status === true) {
          const pg = res.data || {};
          const rows = Array.isArray(pg?.data) ? pg.data : [];
          setBlogs(rows);

          const r = res.recent;
          const recentArr = Array.isArray(r?.data)
            ? r.data
            : Array.isArray(r)
            ? r
            : [];
          setRecentRaw(recentArr);

          const cats = Array.isArray(res.categoryCounts)
            ? res.categoryCounts
            : [];
          setCategoriesRaw(cats);

          setCategoriesChips(normalizeCategoryChips(cats));

          const lastPage =
            Number(pg?.last_page) ||
            Number(pg?.meta?.last_page) ||
            Number(pg?.data?.last_page) ||
            1;

          setTotalPages(lastPage);
          setPage(p);
        } else {
          console.warn("Category API returned non-success status:", res);
          setBlogs([]);
          setRecentRaw([]);
          setCategoriesRaw([]);
          setCategoriesChips([]);
          setTotalPages(1);
          setPage(1);
        }
      } catch (e) {
        if (id !== reqIdRef.current) return;
        console.error("Category fetch error:", e);
        setBlogs([]);
        setRecentRaw([]);
        setCategoriesRaw([]);
        setCategoriesChips([]);
        setTotalPages(1);
        setPage(1);
      } finally {
        if (id === reqIdRef.current) setLoading(false);
      }
    },
    [slug, category]
  );

  useEffect(() => {
    fetchPage(page);
  }, [page, fetchPage]);

  const pagination = {
    page,
    totalPages,
    onChange: (p) => {
      if (!Number.isFinite(p)) return;
      const next = Math.min(Math.max(1, p), Math.max(1, totalPages));
      if (next !== page) setPage(next);
    },
  };

  return (
   <>
     <Seo
      title={`${category} Blogs | DigiBima`}
      description={`Read the latest blogs, articles and insights about ${category} on DigiBima. Stay updated with tips, guides, and news.`}
      keywords={`${category}, insurance blogs, DigiBima`}
    />
    <main className="relative w-full overflow-hidden pt-28 sm:pt-32 md:pt-28">
      {loading ? (
        <div className="animate-pulse grid grid-cols-1 md:grid-cols-3 gap-6 mx-4 sm:mx-8 md:mx-20 my-10">
          <div className="rounded-lg h-64 w-full bg-white dark:bg-gray-700/40" />
          <div className="col-span-2 flex flex-col gap-4">
            <div className="h-6 rounded w-1/3 bg-white dark:bg-gray-700/40" />
            <div className="h-8 rounded w-3/4 bg-white dark:bg-gray-700/40" />
            <div className="h-4 rounded w-full bg-white dark:bg-gray-700/40" />
            <div className="h-4 rounded w-5/6 bg-white dark:bg-gray-700/40" />
            <div className="h-10 rounded w-32 mt-4 bg-white dark:bg-gray-700/40" />
          </div>
        </div>
      ) : (
        <>
          {categoriesChips.length > 0 && (
            <div className="mx-4 sm:mx-8 md:mx-20 mb-6 mt-10">
              <div className="rounded-xl border bg-white/70 backdrop-blur p-4">
                <h3 className="text-base sm:text-lg font-semibold mb-3">
                  Categories
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categoriesChips.map((c) => {
                    const isActive =
                      c.name.trim().toLowerCase() ===
                      unslugify(String(slug || "")).toLowerCase();
                    return (
                      <Link
                        key={c.slug}
                        href={`/blog/category/${c.slug}`}
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm border transition
                          ${
                            isActive
                              ? "bg-gray-900 text-white border-gray-900"
                              : "bg-white hover:bg-gray-50 border-gray-200"
                          }
                        `}
                      >
                        <span>{c.name}</span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded ${
                            isActive ? "bg-white/20" : "bg-gray-100"
                          }`}
                        >
                          {c.count}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {Array.isArray(blogs) && blogs.length ? (
            <BlogSection
              key={`${slug || "all"}-${page}`} 
              blogs={blogs}
              recentPosts={recentRaw} 
              sidebarCategories={categoriesRaw}
              pagination={pagination} 
              meta={{ category }}
            />
          ) : (
            <p className="text-center py-10">
              No posts found in “{unslugify(String(slug || ""))}”.
            </p>
          )}
        </>
      )}
    </main>
   </>
  );
}
