import type { Product } from "@/registry/ui/types"

import {
  mockProductSimple,
  mockProductWithImages,
  mockProductWithVariants,
} from "./mock-products"

export type MockScene = {
  id: string
  src: string
  alt: string
  width: number
  height: number
  pins: Array<{
    id: string
    x: number
    y: number
    content:
      | { kind: "product"; product: Product }
      | { kind: "tooltip"; title: string; description: string }
      | { kind: "link"; label: string; href: string }
  }>
}

const placeholderSceneSize = {
  width: 960,
  height: 960,
} as const

export const mockSceneLivingRoom: MockScene = {
  id: "living-room",
  src: "/mock/product-1.jpg",
  alt: "Placeholder living room scene using the local cap mock image",
  ...placeholderSceneSize,
  pins: [
    {
      id: "living-room-product-simple",
      x: 28,
      y: 45,
      content: { kind: "product", product: mockProductSimple },
    },
    {
      id: "living-room-product-bundle",
      x: 62,
      y: 60,
      content: { kind: "product", product: mockProductWithImages },
    },
    {
      id: "living-room-tooltip",
      x: 80,
      y: 30,
      content: {
        kind: "tooltip",
        title: "Wall Art",
        description: "Hand-painted canvas, 60 x 80 cm, framed in smoked oak.",
      },
    },
  ],
}

export const mockSceneProductHero: MockScene = {
  id: "product-hero",
  src: "/mock/product-2.jpg",
  alt: "Placeholder product hero scene using the local shirt mock image",
  ...placeholderSceneSize,
  pins: [
    {
      id: "product-hero-feature-fit",
      x: 38,
      y: 28,
      content: {
        kind: "tooltip",
        title: "Relaxed fit",
        description:
          "Cut with extra ease through the shoulders and body for casual layering.",
      },
    },
    {
      id: "product-hero-feature-fabric",
      x: 57,
      y: 52,
      content: {
        kind: "tooltip",
        title: "Printed poplin",
        description:
          "Lightweight cotton poplin with a washed finish and a soft handfeel.",
      },
    },
    {
      id: "product-hero-feature-link",
      x: 74,
      y: 72,
      content: {
        kind: "link",
        label: "See fabric details",
        href: "/fabrics/printed-poplin",
      },
    },
  ],
}

export const mockSceneMixedContent: MockScene = {
  id: "mixed-content",
  src: "/mock/product-3.jpg",
  alt: "Placeholder mixed-content scene using the local hoodie mock image",
  ...placeholderSceneSize,
  pins: [
    {
      id: "mixed-product",
      x: 24,
      y: 62,
      content: { kind: "product", product: mockProductWithVariants },
    },
    {
      id: "mixed-tooltip",
      x: 52,
      y: 32,
      content: {
        kind: "tooltip",
        title: "Brushed fleece interior",
        description:
          "Soft-loop lining keeps warmth high without adding bulk to the silhouette.",
      },
    },
    {
      id: "mixed-link",
      x: 78,
      y: 22,
      content: {
        kind: "link",
        label: "Open full lookbook",
        href: "/lookbook/cold-weather",
      },
    },
  ],
}
