"use client";
import Seo from "@/pages/components/seo";
import { useEffect, useRef, useState, useCallback } from "react";
import { CallApi } from "@/api";
import constant from "@/env";
import BlogSection from "@/pages/components/blogpage/sectionone";

const PER_PAGE = 5;

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [recent, setRecent] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  const reqIdRef = useRef(0);

  const recentLockedRef = useRef(false);

  const fetchPage = useCallback(async (p = 1) => {
    const base = constant?.API?.BLOG || "";
    if (!base) {
      console.warn("BLOG API base URL missing at constant.API.BLOG");
      setLoading(false);
      setBlogs([]);
      setCategories([]);
      setPage(1);
      setTotalPages(1);
      return;
    }

    const id = ++reqIdRef.current;
    setLoading(true);

    try {
      const url = `${base}?page=${p}&per_page=${PER_PAGE}`;
      const res = await CallApi(url, "GET");
      console.log(res);
      if (id !== reqIdRef.current) return;

      if (res?.status === true) {
        const pg = res.data || {};
        const rcRaw = res.recentblog || res.recent || res.recentBlogs || [];

        // main list
        const rows = Array.isArray(pg?.data)
          ? pg.data
          : Array.isArray(res?.data)
          ? res.data
          : [];
        setBlogs(rows);

        const recentArr = Array.isArray(rcRaw?.data)
          ? rcRaw.data
          : Array.isArray(rcRaw)
          ? rcRaw
          : [];
        if (!recentLockedRef.current) {
          setRecent(recentArr);
          recentLockedRef.current = true;
        }

        const catArr = Array.isArray(res?.categoryCounts)
          ? res.categoryCounts
          : [];
        setCategories(catArr);

        const lastPage =
          Number(pg?.last_page) ||
          Number(pg?.meta?.last_page) ||
          Number(pg?.data?.last_page) ||
          Number((res.recentblog && res.recentblog.last_page) || 0) ||
          (pg?.total && pg?.per_page
            ? Math.ceil(Number(pg.total) / Number(pg.per_page))
            : 1) ||
          1;

        setTotalPages(lastPage);
        setPage(p);
      } else {
        console.warn("Blogs API returned non-success status:", res);
        setBlogs([]);
        setCategories([]);
        setPage(1);
        setTotalPages(1);
      }
    } catch (err) {
      if (id !== reqIdRef.current) return;
      console.error("Blogs fetch error:", err);
      setBlogs([]);
      setCategories([]);
      setPage(1);
      setTotalPages(1);
    } finally {
      if (id === reqIdRef.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPage(page);
  }, [page, fetchPage]);

  const handlePageChange = (p) => {
    if (!Number.isFinite(p)) return;
    const next = Math.min(Math.max(1, p), Math.max(1, totalPages));
    if (next !== page) setPage(next);
  };

  return (
 <>
      <Seo
        title="Blog | DigiBima – Insurance Tips, News & Guides"
        description="Explore the DigiBima Blog for expert insurance tips, latest industry news, and helpful guides to make informed decisions about your health, life, and general insurance."
      />
    <main className="relative w-full overflow-hidden pt-36 sm:pt-28 md:pt-32">
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
      ) : blogs.length > 0 ? (
        <BlogSection
          key={page} 
          blogs={blogs}
          recentPosts={Array.isArray(recent) ? recent : []}
          sidebarCategories={Array.isArray(categories) ? categories : []} 
          pagination={{ page, totalPages, onChange: handlePageChange }}
        />
      ) : (
        <p className="text-center py-10">No blogs found.</p>
      )}
    </main>
 </>
  );
}
