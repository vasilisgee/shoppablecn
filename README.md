# shoppablecn — Ecommerce UI Components

![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-111111?style=flat&logo=shadcnui&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)

<img src="https://github.com/vasilisgee/shoppablecn-docs/blob/main/public/img/og_image.jpg" style="max-width: 100%;">

A set of ecommerce UI components built with [shadcn/ui](https://ui.shadcn.com) for React and Next.js applications.

📚 [View Documentation](https://docs.shoppablecn.dev)

---

## Features

- 🧩 Built on shadcn/ui primitives  
- ⚡ CLI-based component integration  
- 📱 Fully responsive  
- ♿ Accessibility-ready  
- 🎨 Easy to customize with Tailwind CSS  
- 🛒 Focused on real ecommerce interactions  

## Tech Stack

- React 19
- Next.js 16
- Tailwind CSS  
- shadcn/ui  
- TypeScript  

## UI Components

- **Product Card** — A product-focused card component for displaying key item information such as image, title, price, and actions in a clean, conversion-oriented layout.  
- **Quick Options** — An interactive component that surfaces selectable product choices like size, color, or variant options in a fast and compact way.
- **Hotspot** — A clickable hotspot component for highlighting specific areas of an image or product visual, useful for interactive product discovery and contextual details.  


## Example

```tsx
import { ProductCard } from "@/components/ui/product-card"
import type { Product } from "@/components/ui/types"

export function Example() {
  const product = {
    id: "product-001",
    title: "Product Name",
    category: "Category",
    images: [
      {
        src: "/products/product-image.jpg",
        alt: "Product image",
      },
    ],
    price: { amount: 10000, currency: "USD" },
  } satisfies Product

  return (
    <ProductCard
      product={product}
    />
  )
}
```

## Installation

```bash
git clone https://github.com/vasilisgee/shoppablecn.git
cd shoppablecn
npm install
npm run dev
```

---

## Usage

Components can be added to your project via CLI, with full examples available in the documentation.

The repository also serves as a full reference implementation and source code.

[docs.shoppablecn.dev](https://docs.shoppablecn.dev/)

---

## License

MIT
