import type { Product } from "@/registry/ui/types"

const mockImageSources = [
  "/mock/product-1.jpg",
  "/mock/product-2.jpg",
  "/mock/product-3.jpg",
] as const

function getMockImage(index: number, alt: string) {
  return {
    src: mockImageSources[index % mockImageSources.length],
    alt,
  }
}

export const mockProductSimple: Product = {
  id: "linen-carryall",
  title: "Linen Market Carryall",
  category: "Accessories",
  image: getMockImage(0, "Linen market carryall in soft sand"),
  price: {
    amount: 6800,
    currency: "USD",
  },
}

export const mockProductNew: Product = {
  id: "meridian-knit-polo",
  title: "Meridian Knit Polo",
  category: "Menswear",
  image: getMockImage(1, "Meridian knit polo folded on a studio backdrop"),
  price: {
    amount: 9200,
    currency: "USD",
  },
  rating: {
    value: 4.5,
    count: 128,
  },
  badge: {
    label: "New",
    variant: "new",
  },
}

export const mockProductWithSale: Product = {
  id: "alto-leather-sneaker",
  title: "Alto Leather Sneaker",
  category: "Footwear",
  description:
    "A clean low-top sneaker with padded lining, tonal stitching, and a lightweight cupsole built for daily wear.",
  image: getMockImage(2, "Alto leather sneaker photographed from a slight angle"),
  price: {
    amount: 11900,
    compareAt: 15900,
    currency: "USD",
  },
  rating: {
    value: 4,
    count: 84,
  },
  badge: {
    label: "Sale",
    variant: "sale",
  },
}

export const mockProductLongTitle: Product = {
  id: "atelier-throw",
  title:
    "Atelier Merino Throw Blanket with Reversible Woven Check Pattern and Brushed Finish for Layered Living Spaces",
  category: "Home",
  image: getMockImage(0, "Atelier merino throw blanket draped over a chair"),
  price: {
    amount: 14500,
    currency: "USD",
  },
  rating: {
    value: 4.5,
    count: 42,
  },
}

export const mockProductNoCategory: Product = {
  id: "cove-ceramic-diffuser",
  title: "Cove Ceramic Diffuser",
  image: getMockImage(1, "Cove ceramic diffuser with matte glaze finish"),
  price: {
    amount: 5400,
    currency: "USD",
  },
  rating: {
    value: 4,
    count: 23,
  },
}

export const mockProductDetailed: Product = {
  id: "studio-overshirt",
  title: "Studio Overshirt",
  category: "Womenswear",
  description:
    "A structured overshirt in brushed cotton twill with oversized pockets, corozo buttons, and a softly tailored silhouette.",
  image: getMockImage(2, "Studio overshirt styled on a neutral set"),
  price: {
    amount: 13200,
    compareAt: 16800,
    currency: "USD",
  },
  rating: {
    value: 5,
    count: 311,
  },
  badge: {
    label: "Best Seller",
    variant: "default",
  },
  href: "/products/studio-overshirt",
  variants: [
    {
      id: "color",
      name: "Color",
      type: "swatch",
      required: true,
      options: [
        { label: "Bone", value: "bone", swatch: "#e7e2d9" },
        { label: "Olive", value: "olive", swatch: "#5d6b4d" },
      ],
    },
  ],
}

export const mockProductBrokenImage: Product = {
  id: "nomad-weekender",
  title: "Nomad Weekender",
  category: "Travel",
  image: {
    src: "/mock/does-not-exist.jpg",
    alt: "Nomad weekender bag with intentionally broken image source",
  },
  price: {
    amount: 18800,
    currency: "USD",
  },
  rating: {
    value: 3.5,
    count: 19,
  },
}

export const mockProductLowRating: Product = {
  id: "atlas-running-cap",
  title: "Atlas Running Cap",
  category: "Accessories",
  image: getMockImage(1, "Atlas running cap on a simple display stand"),
  price: {
    amount: 2800,
    currency: "USD",
  },
  rating: {
    value: 1.5,
    count: 1248,
  },
}

export const mockProducts: Product[] = [
  mockProductNew,
  mockProductWithSale,
  mockProductSimple,
  mockProductLongTitle,
  mockProductNoCategory,
  mockProductDetailed,
  mockProductBrokenImage,
  mockProductLowRating,
]
