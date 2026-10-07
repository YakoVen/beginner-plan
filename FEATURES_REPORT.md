# 🔰 BEGINNER PLAN — Features Report
> **Project:** `beginner-plan` (d:\web\ecom\beginner-plan)  
> **Tier:** 1 of 5 (Cheapest)  
> **Target Users:** Dropshippers, Instagram sellers, hobbyists, beginners  
> **Status:** ✅ Built and functional

---

## ✅ FEATURES ALREADY IMPLEMENTED

### Storefront
| # | Feature | Status | File(s) |
|---|---------|--------|---------|
| 1 | Landing page (Hero + CTA) | ✅ Done | `components/landingpage/welcom-section.tsx` |
| 2 | Featured products carousel | ✅ Done | `components/general/featured-carousel.tsx` |
| 3 | Category previews (horizontal scroll) | ✅ Done | `components/landingpage/categories-previews.tsx` |
| 4 | Product suggestions section | ✅ Done | `components/landingpage/suggestions-preview.tsx` |
| 5 | Customer testimonials section | ✅ Done | `components/landingpage/ratings-preview.tsx` |
| 6 | Product catalog with search | ✅ Done | `components/articles-page/articles-listing.tsx` |
| 7 | Category filtering (checkboxes) | ✅ Done | `components/articles-page/filter-bar.tsx` |
| 8 | Price range slider | ✅ Done | `components/articles-page/filter-bar.tsx` |
| 9 | Sort (price asc/desc, newest) | ✅ Done | `components/articles-page/articles-listing.tsx` |
| 10 | Product detail page with image carousel | ✅ Done | `components/article-page/presentation.tsx` |
| 11 | COD order form (name, phone, wilaya, commune) | ✅ Done | `components/article-page/order-card.tsx` |
| 12 | Order confirmation modal | ✅ Done | `components/article-page/order-card.tsx` |
| 13 | WhatsApp "Order" button | ✅ Done | `components/article-page/presentation.tsx` |
| 14 | Social sharing (Facebook, WhatsApp, copy link) | ✅ Done | `components/article-page/presentation.tsx` |

### Admin Dashboard
| # | Feature | Status | File(s) |
|---|---------|--------|---------|
| 15 | Admin login (Firebase Auth) | ✅ Done | `app/dashboard/layout.tsx` |
| 16 | Create/edit articles (title, desc, price, category) | ✅ Done | `components/dashboard/article-editor.tsx` |
| 17 | Upload thumbnail + multiple screenshots | ✅ Done | `components/dashboard/article-editor.tsx` |
| 18 | Delete/hide articles | ✅ Done | `service/firebase/database.ts` |
| 19 | View all orders | ✅ Done | `components/dashboard/order-table.tsx` |
| 20 | Filter orders (name, date, status) | ✅ Done | `components/dashboard/order-table.tsx` |
| 21 | Change order status (4 states) | ✅ Done | `components/dashboard/order-table.tsx` |
| 22 | Order summary stats (Total, Pending, Revenue) | ✅ Done | `components/dashboard/order-table.tsx` |
| 23 | Amplified order detail view | ✅ Done | `components/dashboard/command-amplify.tsx` |

### Infrastructure
| # | Feature | Status | File(s) |
|---|---------|--------|---------|
| 24 | Responsive design (mobile-first) | ✅ Done | All components |
| 25 | Mobile hamburger menu | ✅ Done | `components/general/header.tsx` |
| 26 | Mobile filter drawer | ✅ Done | `components/articles-page/filter-bar.tsx` |
| 27 | Server-side price validation | ✅ Done | `app/actions/orders.ts` |
| 28 | Breadcrumbs navigation | ✅ Done | `components/general/breadcrumbs.tsx` |
| 29 | Skeleton loading states | ✅ Done | `components/general/skeleton.tsx` |
| 30 | SEO metadata from constants | ✅ Done | `app/layout.tsx` |
| 31 | Store config file (constants.ts) | ✅ Done | `service/constants.ts` |
| 32 | Data seeding scripts | ✅ Done | `admin-seed.mjs`, `seed.mjs` |

---

## 🔧 FEATURES TO ADD / IMPROVE IN THIS TIER

These are polish items that **should still be in the Beginner tier** but are missing or need improvement:

| # | Feature to Add | Priority | Why |
|---|----------------|----------|-----|
| 1 | **Product visibility toggle in listing** | 🔴 High | Admin can toggle `active` but the storefront doesn't filter out `active: false` articles consistently |
| 2 | **Proper 404 for missing products** | 🟡 Medium | Currently shows a generic error when visiting a deleted product |
| 3 | **Image lazy loading & optimization** | 🟡 Medium | No `next/image` `sizes` optimization on all components |
| 4 | **Favicon / logo from constants** | 🟡 Medium | `logo` constant is defined but never actually used in the header |
| 5 | **Real category thumbnails & icons** | 🟡 Medium | Categories have empty `thumbnail` and `icon` fields, falling back to placeholders |
| 6 | **Replace hardcoded testimonials** | 🟢 Low | Testimonials in `ratings-preview.tsx` are fake/static — at minimum make them configurable via constants |
| 7 | **Confirm before deleting an article** | 🟢 Low | No confirmation dialog when admin deletes a product |
| 8 | **Dashboard mobile layout improvement** | 🟢 Low | The mobile top bar overlaps slightly with sidebar |
| 9 | **Loading state for order submission** | 🟢 Low | Button says "Envoi..." but no spinner animation on the order card |
| 10 | **Max quantity configurable** | 🟢 Low | Currently hardcoded to 10 in `order-card.tsx` |

---

## 🚫 FEATURES EXPLICITLY NOT IN THIS TIER
> These belong to higher tiers only:

* ❌ Shopping Cart (→ Basic)
* ❌ Product Variants / Sizes / Colors (→ Basic)
* ❌ Coupon / Promo Codes (→ Basic)
* ❌ Stock / Inventory Tracking (→ Basic)
* ❌ Customer Accounts (→ Intermediate)
* ❌ Order Tracking for Customers (→ Intermediate)
* ❌ Online Payment (→ Professional)
* ❌ Analytics Dashboard (→ Professional)
* ❌ Multi-store / API (→ Enterprise)
