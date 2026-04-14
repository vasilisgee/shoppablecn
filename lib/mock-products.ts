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

function getMockImages(...alts: [string, ...string[]]) {
  return alts.map((alt, index) => getMockImage(index, alt))
}

export const mockProductSimple: Product = {
  id: "linden-trail-cap",
  title: "Linden Trail Cap",
  category: "Accessories",
  images: [getMockImage(0, "Linden trail cap in mustard yellow with a charcoal brim")],
  price: {
    amount: 6800,
    currency: "USD",
  },
}

export const mockProductNew: Product = {
  id: "meridian-resort-shirt",
  title: "Meridian Resort Shirt",
  category: "Menswear",
  images: [
    getMockImage(1, "Meridian resort shirt with an abstract multicolor print"),
  ],
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
  id: "alto-fleece-hoodie",
  title: "Alto Fleece Hoodie",
  category: "Outerwear",
  description:
    "A heavyweight fleece hoodie with contrast sleeves, a roomy kangaroo pocket, and a soft brushed interior for cooler days.",
  images: getMockImages(
    "Alto fleece hoodie in black and bright blue",
    "Alto fleece hoodie alternate product angle using the local shirt mock image",
    "Alto fleece hoodie alternate product angle using the local cap mock image"
  ),
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
  id: "atelier-field-cap",
  title:
    "Atelier Field Cap with Contrast Brim, Embroidered Front Logo, and Structured Crown for Everyday Wear",
  category: "Accessories",
  images: [
    getMockImage(
      0,
      "Atelier field cap with a structured crown and contrast charcoal brim"
    ),
  ],
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
  id: "cove-camp-shirt",
  title: "Cove Camp Shirt",
  images: [getMockImage(1, "Cove camp shirt with oversized abstract shapes")],
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
  id: "studio-colorblock-hoodie",
  title: "Studio Colorblock Hoodie",
  category: "Outerwear",
  description:
    "A colorblocked hoodie with a structured hood, ribbed trims, and athletic paneling designed for standout casual layering.",
  images: getMockImages(
    "Studio colorblock hoodie styled against a neutral backdrop",
    "Studio colorblock hoodie alternate catalog image using the local shirt mock image",
    "Studio colorblock hoodie alternate catalog image using the local cap mock image"
  ),
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
  href: "/products/studio-colorblock-hoodie",
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
  images: [
    {
      src: "/mock/does-not-exist.jpg",
      alt: "Nomad weekender bag with intentionally broken image source",
    },
  ],
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
  id: "atlas-print-shirt",
  title: "Atlas Print Shirt",
  category: "Menswear",
  images: [getMockImage(1, "Atlas print shirt with a relaxed camp collar")],
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
