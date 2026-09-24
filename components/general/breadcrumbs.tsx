"use client";

import Link from "next/link";
import React from "react";

interface BreadcrumbsProps {
  items: {
    label: string;
    href?: string;
  }[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center text-sm text-gray-500 mb-2 whitespace-nowrap overflow-x-auto">
      <Link href="/" className="hover:text-gray-900 flex items-center shrink-0">
        <i className="fa-solid fa-house"></i>
      </Link>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <span className="mx-2 text-gray-400 shrink-0">›</span>
          {item.href ? (
            <Link href={item.href} className="hover:text-gray-900 shrink-0">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium shrink-0">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
