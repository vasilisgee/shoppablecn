"use client"

import type { ReactNode } from "react"

import { Separator } from "@/components/ui/separator"
import {
  mockProductBrokenImage,
  mockProductDetailed,
  mockProductLongTitle,
  mockProductLowRating,
  mockProductNew,
  mockProductNoCategory,
  mockProducts,
  mockProductSimple,
  mockProductWithSale,
} from "@/lib/mock-products"
import { ProductCard } from "@/registry/ui/product-card"
import type { Product, ProductCardProps } from "@/registry/ui/types"

type PreviewExampleProps = {
  title: string
  description: string
  children: ReactNode
}

function PreviewExample({ title, description, children }: PreviewExampleProps) {
  return (
    <section className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        <pre className="overflow-x-auto rounded-lg border bg-card px-4 py-3 text-sm text-card-foreground">
          <code>{description}</code>
        </pre>
      </div>
      {children}
    </section>
  )
}

function PreviewSeparator() {
  return <Separator className="my-8" />
}

export function ProductCardPreviewContent() {
  const handleAddToCart: NonNullable<ProductCardProps["onAddToCart"]> = (
    args
  ) => {
    console.log("preview onAddToCart", args) // preview-only
  }

  const handleWishlistToggle: NonNullable<ProductCardProps["onWishlistToggle"]> =
    (productId) => {
      console.log("preview onWishlistToggle", productId) // preview-only
    }

  const linkedProduct: Product = {
    ...mockProductDetailed,
    href: "/products/studio-colorblock-hoodie",
  }

  const plainProduct: Product = {
    ...mockProductDetailed,
    href: undefined,
  }

  return (
    <div className="space-y-8">
      <PreviewExample
        description={'layout="vertical" variants="none"'}
        title={'Vertical / variants=none / minimal'}
      >
        <div className="max-w-sm">
          <ProductCard
            layout="vertical"
            product={mockProductSimple}
            variants="none"
          />
        </div>
      </PreviewExample>

      <PreviewSeparator />

      <PreviewExample
        description={'layout="vertical" variants="none" badge="new"'}
        title={'Vertical / variants=none / badge=new'}
      >
        <div className="max-w-sm">
          <ProductCard layout="vertical" product={mockProductNew} variants="none" />
        </div>
      </PreviewExample>

      <PreviewSeparator />

      <PreviewExample
        description={'layout="vertical" variants="none" badge="sale" compareAt=true'}
        title={'Vertical / variants=none / badge=sale / compareAt=true'}
      >
        <div className="max-w-sm">
          <ProductCard
            layout="vertical"
            product={mockProductWithSale}
            variants="none"
          />
        </div>
      </PreviewExample>

      <PreviewSeparator />

      <PreviewExample
        description={'layout="vertical" variants="none" showRating=true'}
        title={'Vertical / variants=none / rating=true'}
      >
        <div className="max-w-sm">
          <ProductCard
            layout="vertical"
            product={mockProductLowRating}
            variants="none"
          />
        </div>
      </PreviewExample>

      <PreviewSeparator />

      <PreviewExample
        description={'layout="vertical" variants="none" showWishlist=true'}
        title={'Vertical / variants=none / wishlist=true'}
      >
        <div className="max-w-sm">
          <ProductCard
            layout="vertical"
            product={mockProductSimple}
            showWishlist
            variants="none"
          />
        </div>
      </PreviewExample>

      <PreviewSeparator />

      <PreviewExample
        description={'layout="vertical" variants="none" showQuickView=true'}
        title={'Vertical / variants=none / quickView=true'}
      >
        <div className="max-w-sm">
          <ProductCard
            layout="vertical"
            product={mockProductSimple}
            showQuickView
            variants="none"
          />
        </div>
      </PreviewExample>

      <PreviewSeparator />

      <PreviewExample
        description={'layout="vertical" variants="none" compareAt=true'}
        title={'Vertical / variants=none / compareAt=true'}
      >
        <div className="max-w-sm">
          <ProductCard
            layout="vertical"
            product={mockProductWithSale}
            variants="none"
          />
        </div>
      </PreviewExample>

      <PreviewSeparator />

      <PreviewExample
        description={
          'layout="vertical" variants="none" showWishlist showQuickView showRating'
        }
        title={
          'Vertical / variants=none / showWishlist=true / showQuickView=true / showRating=true'
        }
      >
        <div className="max-w-sm">
          <ProductCard
            layout="vertical"
            product={mockProductDetailed}
            showQuickView
            showWishlist
            variants="none"
          />
        </div>
      </PreviewExample>

      <PreviewSeparator />

      <PreviewExample
        description={'layout="vertical" variants="none" title="long"'}
        title={'Vertical / variants=none / longTitle=true'}
      >
        <div className="max-w-sm">
          <ProductCard
            layout="vertical"
            product={mockProductLongTitle}
            variants="none"
          />
        </div>
      </PreviewExample>

      <PreviewSeparator />

      <PreviewExample
        description={'layout="vertical" variants="none" category=undefined'}
        title={'Vertical / variants=none / category=false'}
      >
        <div className="max-w-sm">
          <ProductCard
            layout="vertical"
            product={mockProductNoCategory}
            variants="none"
          />
        </div>
      </PreviewExample>

      <PreviewSeparator />

      <PreviewExample
        description={'layout="vertical" variants="none" image="broken"'}
        title={'Vertical / variants=none / brokenImage=true'}
      >
        <div className="max-w-sm">
          <ProductCard
            layout="vertical"
            product={mockProductBrokenImage}
            variants="none"
          />
        </div>
      </PreviewExample>

      <PreviewSeparator />

      <PreviewExample
        description={'layout="horizontal" variants="none"'}
        title={'Horizontal / variants=none / minimal'}
      >
        <ProductCard
          layout="horizontal"
          product={mockProductSimple}
          variants="none"
        />
      </PreviewExample>

      <PreviewSeparator />

      <PreviewExample
        description={'layout="horizontal" variants="none" badge+rating=true'}
        title={'Horizontal / variants=none / badge=true / rating=true'}
      >
        <ProductCard layout="horizontal" product={mockProductNew} variants="none" />
      </PreviewExample>

      <PreviewSeparator />

      <PreviewExample
        description={
          'layout="horizontal" variants="none" showWishlist showQuickView showRating'
        }
        title={
          'Horizontal / variants=none / showWishlist=true / showQuickView=true / showRating=true'
        }
      >
        <ProductCard
          layout="horizontal"
          product={mockProductDetailed}
          showQuickView
          showWishlist
          variants="none"
        />
      </PreviewExample>

      <PreviewSeparator />

      <PreviewExample
        description={'layout="horizontal" variants="none" title="long"'}
        title={'Horizontal / variants=none / longTitle=true'}
      >
        <ProductCard
          layout="horizontal"
          product={mockProductLongTitle}
          variants="none"
        />
      </PreviewExample>

      <PreviewSeparator />

      <PreviewExample
        description={'layout="horizontal" variants="none" rating=false'}
        title={'Horizontal / variants=none / rating=false'}
      >
        <ProductCard
          layout="horizontal"
          product={mockProductSimple}
          variants="none"
        />
      </PreviewExample>

      <PreviewSeparator />

      <PreviewExample
        description={'layout="horizontal-detailed" variants="none" description=true'}
        title={'Horizontal-detailed / variants=none / description=true'}
      >
        <ProductCard
          layout="horizontal-detailed"
          product={mockProductWithSale}
          variants="none"
        />
      </PreviewExample>

      <PreviewSeparator />

      <PreviewExample
        description={
          'layout="horizontal-detailed" variants="none" badge=true rating=true description=true compareAt=true showWishlist=true showQuickView=true'
        }
        title={
          'Horizontal-detailed / variants=none / badge=true / rating=true / description=true / compareAt=true / showWishlist=true / showQuickView=true'
        }
      >
        <ProductCard
          layout="horizontal-detailed"
          product={mockProductDetailed}
          showQuickView
          showWishlist
          variants="none"
        />
      </PreviewExample>

      <PreviewSeparator />

      <PreviewExample
        description={'layout="horizontal-detailed" variants="none" description=false'}
        title={'Horizontal-detailed / variants=none / description=false'}
      >
        <ProductCard
          layout="horizontal-detailed"
          product={mockProductNew}
          variants="none"
        />
      </PreviewExample>

      <PreviewSeparator />

      <PreviewExample
        description={'grid columns=4 layout="vertical" variants="none" products=mockProducts'}
        title={'Grid layouts / verticalGrid=true / products=all'}
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {mockProducts.map((product) => (
            <ProductCard
              key={product.id}
              layout="vertical"
              product={product}
              variants="none"
            />
          ))}
        </div>
      </PreviewExample>

      <PreviewSeparator />

      <PreviewExample
        description={'stack layout="horizontal" variants="none" products=mockProducts'}
        title={'Grid layouts / horizontalStack=true / products=all'}
      >
        <div className="space-y-6">
          {mockProducts.map((product) => (
            <ProductCard
              key={product.id}
              layout="horizontal"
              product={product}
              variants="none"
            />
          ))}
        </div>
      </PreviewExample>

      <PreviewSeparator />

      <PreviewExample
        description={
          'single layout="horizontal-detailed" variants="none" featured=true'
        }
        title={'Grid layouts / featuredHorizontalDetailed=true'}
      >
        <ProductCard
          layout="horizontal-detailed"
          product={mockProductDetailed}
          showQuickView
          showWishlist
          variants="none"
        />
      </PreviewExample>

      <PreviewSeparator />

      <PreviewExample
        description={
          'layout="vertical" variants="none" onAddToCart=(args)=>console.log(args)'
        }
        title={'Edge cases / onAddToCart=console.log'}
      >
        <div className="max-w-sm">
          <ProductCard
            layout="vertical"
            onAddToCart={handleAddToCart}
            product={mockProductWithSale}
            variants="none"
          />
        </div>
      </PreviewExample>

      <PreviewSeparator />

      <PreviewExample
        description={
          'layout="vertical" variants="none" showWishlist onWishlistToggle=(id)=>console.log(id)'
        }
        title={'Edge cases / onWishlistToggle=console.log'}
      >
        <div className="max-w-sm">
          <ProductCard
            layout="vertical"
            onWishlistToggle={handleWishlistToggle}
            product={mockProductNew}
            showWishlist
            variants="none"
          />
        </div>
      </PreviewExample>

      <PreviewSeparator />

      <PreviewExample
        description={'layout="vertical" variants="none" href=true'}
        title={'Edge cases / href=true'}
      >
        <div className="max-w-sm">
          <ProductCard layout="vertical" product={linkedProduct} variants="none" />
        </div>
      </PreviewExample>

      <PreviewSeparator />

      <PreviewExample
        description={'layout="vertical" variants="none" href=false'}
        title={'Edge cases / href=false'}
      >
        <div className="max-w-sm">
          <ProductCard layout="vertical" product={plainProduct} variants="none" />
        </div>
      </PreviewExample>
    </div>
  )
}
