"use client";
import Link from "next/link";
import { FiPlusCircle, FiList } from "react-icons/fi";

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex flex-col items-center justify-center px-6 py-16">
      <div className="max-w-4xl w-full text-center">
        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
          ✍️ Blog Management
        </h1>
        <p className="text-lg text-gray-600 mb-12">
          Manage all your blogs in one place. Add new blogs or view existing
          ones.
        </p>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Add Blog Card */}
          <Link
            href="/blogs/add"
            className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 p-10 flex flex-col items-center justify-center border border-gray-100"
          >
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-indigo-100 group-hover:bg-indigo-200 transition">
              <FiPlusCircle className="text-indigo-600 w-8 h-8" />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-gray-800">
              Add New Blog
            </h2>
            <p className="mt-2 text-gray-500 text-sm">
              Create and publish a brand new blog post easily.
            </p>
            <span className="absolute bottom-0 left-0 w-full h-1 bg-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </Link>

          <Link
            href="/blogs/view"
            className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 p-10 flex flex-col items-center justify-center border border-gray-100"
          >
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 group-hover:bg-green-200 transition">
              <FiList className="text-green-600 w-8 h-8" />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-gray-800">
              View All Blogs
            </h2>
            <p className="mt-2 text-gray-500 text-sm">
              Browse, edit, and manage all existing blog posts.
            </p>
            <span className="absolute bottom-0 left-0 w-full h-1 bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </Link>
        </div>
      </div>
    </div>
  );
}
