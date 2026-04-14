"use client"

import * as React from "react"
import Image from "next/image"

import { Separator } from "@/components/ui/separator"
import {
  mockSceneLivingRoom,
  mockSceneMixedContent,
  mockSceneProductHero,
  type MockScene,
} from "@/lib/mock-scenes"
import {
  mockProductSimple,
  mockProductWithImages,
  mockProductWithVariants,
} from "@/lib/mock-products"
import { HotspotImage } from "@/registry/ui/hotspot-image"
import { HotspotLink } from "@/registry/ui/hotspot-link"
import { HotspotPin } from "@/registry/ui/hotspot-pin"
import { HotspotTooltip } from "@/registry/ui/hotspot-tooltip"
import { ProductCard } from "@/registry/ui/product-card"
import type { HotspotPinProps, ProductCardProps } from "@/registry/ui/types"

type PreviewExampleProps = {
  title: string
  description: string
  children: React.ReactNode
}

type FramedSceneProps = {
  src: string
  alt: string
  width: number
  height: number
  children: React.ReactNode
  className?: string
}

type FixtureSceneProps = {
  scene: MockScene
  pinVariant?: HotspotPinProps["variant"]
  getVariant?: (pinId: string) => HotspotPinProps["variant"]
}

function PreviewExample({
  title,
  description,
  children,
}: PreviewExampleProps) {
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

function FramedScene({
  src,
  alt,
  width,
  height,
  children,
  className,
}: FramedSceneProps) {
  return (
    <div className={className}>
      <HotspotImage alt={alt} height={height} src={src} width={width}>
        {children}
      </HotspotImage>
    </div>
  )
}

function ProductCardPopoverContent({
  product,
  variants,
  onAddToCart,
}: {
  product: ProductCardProps["product"]
  variants: ProductCardProps["variants"]
  onAddToCart?: ProductCardProps["onAddToCart"]
}) {
  return (
    <div className="w-[320px]">
      <ProductCard
        layout="vertical"
        onAddToCart={onAddToCart}
        product={product}
        variants={variants}
      />
    </div>
  )
}

function renderFixtureContent(
  content: MockScene["pins"][number]["content"],
  onAddToCart?: ProductCardProps["onAddToCart"]
) {
  if (content.kind === "tooltip") {
    return (
      <HotspotTooltip
        description={content.description}
        title={content.title}
      />
    )
  }

  if (content.kind === "link") {
    return <HotspotLink href={content.href} label={content.label} />
  }

  return (
    <ProductCardPopoverContent
      onAddToCart={onAddToCart}
      product={content.product}
      variants={content.product.variants?.length ? "overlay" : "none"}
    />
  )
}

function FixtureScene({ scene, pinVariant = "plus", getVariant }: FixtureSceneProps) {
  return (
    <FramedScene
      alt={scene.alt}
      className="overflow-hidden rounded-xl border bg-card p-4"
      height={scene.height}
      src={scene.src}
      width={scene.width}
    >
      {scene.pins.map((pin) => (
        <HotspotPin
          key={pin.id}
          label={`${scene.id} hotspot ${pin.id}`}
          variant={getVariant?.(pin.id) ?? pinVariant}
          x={pin.x}
          y={pin.y}
        >
          {renderFixtureContent(pin.content)}
        </HotspotPin>
      ))}
    </FramedScene>
  )
}

export function HotspotImagePreviewContent() {
  const handlePreviewAddToCart: NonNullable<ProductCardProps["onAddToCart"]> =
    React.useCallback((args) => {
      console.log("hotspot-image preview onAddToCart", args) // preview-only
    }, [])

  const longTooltipDescription =
    "A deliberately long tooltip description to verify that the preset stays constrained at max-w-xs even when the copy keeps going with material notes, finish details, size references, and a bit of extra merchandising language for QA."

  return (
    <div className="space-y-8">
      <PreviewExample
        description={'scene=mockSceneProductHero pins=[{ x: 38, y: 28, variant: "plus" }]'}
        title={'Pin variants / variant="plus" / pins=1'}
      >
        <FramedScene
          alt={mockSceneProductHero.alt}
          className="overflow-hidden rounded-xl border bg-card p-4"
          height={mockSceneProductHero.height}
          src={mockSceneProductHero.src}
          width={mockSceneProductHero.width}
        >
          <HotspotPin
            label="Single plus hotspot"
            variant="plus"
            x={38}
            y={28}
          >
            <HotspotTooltip
              description="Single default plus pin on the placeholder shirt scene."
              title="Plus variant"
            />
          </HotspotPin>
        </FramedScene>
      </PreviewExample>

      <PreviewSeparator />

      <PreviewExample
        description={'scene=mockSceneProductHero pins=[{ x: 38, y: 28, variant: "dot" }]'}
        title={'Pin variants / variant="dot" / pins=1'}
      >
        <FramedScene
          alt={mockSceneProductHero.alt}
          className="overflow-hidden rounded-xl border bg-card p-4"
          height={mockSceneProductHero.height}
          src={mockSceneProductHero.src}
          width={mockSceneProductHero.width}
        >
          <HotspotPin label="Single dot hotspot" variant="dot" x={38} y={28}>
            <HotspotTooltip
              description="Single compact dot pin on the same scene."
              title="Dot variant"
            />
          </HotspotPin>
        </FramedScene>
      </PreviewExample>

      <PreviewSeparator />

      <PreviewExample
        description={'scene=mockSceneLivingRoom pinVariants=["plus","dot","plus"]'}
        title={'Pin variants / mixed variants / pins=3'}
      >
        <FixtureScene
          getVariant={(pinId) =>
            pinId === "living-room-product-bundle" ? "dot" : "plus"
          }
          scene={mockSceneLivingRoom}
        />
      </PreviewExample>

      <PreviewSeparator />

      <PreviewExample
        description={'content=<HotspotTooltip /> variant="plus"'}
        title={"Content types / HotspotTooltip"}
      >
        <FramedScene
          alt={mockSceneProductHero.alt}
          className="overflow-hidden rounded-xl border bg-card p-4"
          height={mockSceneProductHero.height}
          src={mockSceneProductHero.src}
          width={mockSceneProductHero.width}
        >
          <HotspotPin label="Tooltip content hotspot" x={57} y={52}>
            <HotspotTooltip
              description="Plain marketing copy inside the popover."
              title="Printed poplin"
            />
          </HotspotPin>
        </FramedScene>
      </PreviewExample>

      <PreviewSeparator />

      <PreviewExample
        description={'content=<HotspotLink label="See fabric details" href="/fabrics/printed-poplin" />'}
        title={"Content types / HotspotLink"}
      >
        <FramedScene
          alt={mockSceneProductHero.alt}
          className="overflow-hidden rounded-xl border bg-card p-4"
          height={mockSceneProductHero.height}
          src={mockSceneProductHero.src}
          width={mockSceneProductHero.width}
        >
          <HotspotPin label="Link content hotspot" x={74} y={72}>
            <HotspotLink
              href="/fabrics/printed-poplin"
              label="See fabric details"
            />
          </HotspotPin>
        </FramedScene>
      </PreviewExample>

      <PreviewSeparator />

      <PreviewExample
        description={'content=<ProductCard layout="vertical" variants="none" />'}
        title={'Content types / ProductCard / layout="vertical" / variants="none"'}
      >
        <FramedScene
          alt={mockSceneLivingRoom.alt}
          className="overflow-hidden rounded-xl border bg-card p-4"
          height={mockSceneLivingRoom.height}
          src={mockSceneLivingRoom.src}
          width={mockSceneLivingRoom.width}
        >
          <HotspotPin label="Product card content hotspot" x={28} y={45}>
            <ProductCardPopoverContent product={mockProductSimple} variants="none" />
          </HotspotPin>
        </FramedScene>
      </PreviewExample>

      <PreviewSeparator />

      <PreviewExample
        description={
          'content=<ProductCard layout="vertical" variants="overlay" onAddToCart={(args)=>console.log(args)} />'
        }
        title={
          'Content types / ProductCard / layout="vertical" / variants="overlay"'
        }
      >
        <FramedScene
          alt={mockSceneMixedContent.alt}
          className="overflow-hidden rounded-xl border bg-card p-4"
          height={mockSceneMixedContent.height}
          src={mockSceneMixedContent.src}
          width={mockSceneMixedContent.width}
        >
          <HotspotPin label="Overlay product card content hotspot" x={24} y={62}>
            <ProductCardPopoverContent
              onAddToCart={handlePreviewAddToCart}
              product={mockProductWithVariants}
              variants="overlay"
            />
          </HotspotPin>
        </FramedScene>
      </PreviewExample>

      <PreviewSeparator />

      <PreviewExample
        description={'content=<div><Image /><p /></div>'}
        title={"Content types / custom content"}
      >
        <FramedScene
          alt={mockSceneMixedContent.alt}
          className="overflow-hidden rounded-xl border bg-card p-4"
          height={mockSceneMixedContent.height}
          src={mockSceneMixedContent.src}
          width={mockSceneMixedContent.width}
        >
          <HotspotPin label="Custom content hotspot" x={78} y={22}>
            <div className="w-[260px] space-y-3 p-4">
              <Image
                alt="Custom editorial inset using the local shirt mock image"
                className="h-auto w-full rounded-md"
                height={180}
                src="/mock/product-2.jpg"
                width={240}
              />
              <p className="text-sm text-muted-foreground">
                Custom JSX content works too, so the popover can hold editorial
                modules and not just presets.
              </p>
            </div>
          </HotspotPin>
        </FramedScene>
      </PreviewExample>

      <PreviewSeparator />

      <PreviewExample
        description={'scene=mockSceneProductHero pins=1 spread="single"'}
        title={"Pin density / single pin"}
      >
        <FramedScene
          alt={mockSceneProductHero.alt}
          className="overflow-hidden rounded-xl border bg-card p-4"
          height={mockSceneProductHero.height}
          src={mockSceneProductHero.src}
          width={mockSceneProductHero.width}
        >
          <HotspotPin label="Single density hotspot" x={57} y={52}>
            <HotspotTooltip
              description="Single pin on a scene to verify the quiet state."
              title="Single pin"
            />
          </HotspotPin>
        </FramedScene>
      </PreviewExample>

      <PreviewSeparator />

      <PreviewExample
        description={'scene=mockSceneLivingRoom pins=3 spread="wide"'}
        title={"Pin density / spread pins / pins=3"}
      >
        <FixtureScene scene={mockSceneLivingRoom} />
      </PreviewExample>

      <PreviewSeparator />

      <PreviewExample
        description={'scene=mockSceneMixedContent pins=6 spread="clustered"'}
        title={"Pin density / clustered pins / pins=6"}
      >
        <FramedScene
          alt={mockSceneMixedContent.alt}
          className="overflow-hidden rounded-xl border bg-card p-4"
          height={mockSceneMixedContent.height}
          src={mockSceneMixedContent.src}
          width={mockSceneMixedContent.width}
        >
          <HotspotPin label="Cluster hotspot 1" x={48} y={46}>
            <HotspotTooltip
              description="Clustered hotspot one."
              title="Cluster 1"
            />
          </HotspotPin>
          <HotspotPin label="Cluster hotspot 2" variant="dot" x={53} y={43}>
            <HotspotTooltip
              description="Clustered hotspot two."
              title="Cluster 2"
            />
          </HotspotPin>
          <HotspotPin label="Cluster hotspot 3" x={56} y={49}>
            <HotspotTooltip
              description="Clustered hotspot three."
              title="Cluster 3"
            />
          </HotspotPin>
          <HotspotPin label="Cluster hotspot 4" variant="dot" x={50} y={54}>
            <HotspotTooltip
              description="Clustered hotspot four."
              title="Cluster 4"
            />
          </HotspotPin>
          <HotspotPin label="Cluster hotspot 5" x={60} y={46}>
            <HotspotTooltip
              description="Clustered hotspot five."
              title="Cluster 5"
            />
          </HotspotPin>
          <HotspotPin label="Cluster hotspot 6" variant="dot" x={58} y={55}>
            <HotspotTooltip
              description="Clustered hotspot six."
              title="Cluster 6"
            />
          </HotspotPin>
        </FramedScene>
      </PreviewExample>

      <PreviewSeparator />

      <PreviewExample
        description={'scene=mockSceneProductHero pins=[{x:2,y:2},{x:98,y:2},{x:2,y:98},{x:98,y:98}]'}
        title={"Pin density / edge positions / collision detection"}
      >
        <FramedScene
          alt={mockSceneProductHero.alt}
          className="overflow-hidden rounded-xl border bg-card p-4"
          height={mockSceneProductHero.height}
          src={mockSceneProductHero.src}
          width={mockSceneProductHero.width}
        >
          <HotspotPin label="Top left hotspot" x={2} y={2}>
            <HotspotTooltip
              description="Near the top-left edge."
              title="Top left"
            />
          </HotspotPin>
          <HotspotPin label="Top right hotspot" variant="dot" x={98} y={2}>
            <HotspotTooltip
              description="Near the top-right edge."
              title="Top right"
            />
          </HotspotPin>
          <HotspotPin label="Bottom left hotspot" x={2} y={98}>
            <HotspotTooltip
              description="Near the bottom-left edge."
              title="Bottom left"
            />
          </HotspotPin>
          <HotspotPin label="Bottom right hotspot" variant="dot" x={98} y={98}>
            <HotspotTooltip
              description="Near the bottom-right edge."
              title="Bottom right"
            />
          </HotspotPin>
        </FramedScene>
      </PreviewExample>

      <PreviewSeparator />

      <PreviewExample
        description={'wrapper=<div className="w-[375px] border border-dashed">...</div>'}
        title={"Responsive behavior / simulated at 375px width"}
      >
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Simulated at 375px width
          </p>
          <div className="w-[375px] rounded-xl border border-dashed p-3">
            <FramedScene
              alt={mockSceneLivingRoom.alt}
              className="overflow-hidden rounded-xl border bg-card p-4"
              height={mockSceneLivingRoom.height}
              src={mockSceneLivingRoom.src}
              width={mockSceneLivingRoom.width}
            >
              {mockSceneLivingRoom.pins.map((pin) => (
                <HotspotPin key={pin.id} label={`375 hotspot ${pin.id}`} x={pin.x} y={pin.y}>
                  {renderFixtureContent(pin.content)}
                </HotspotPin>
              ))}
            </FramedScene>
          </div>
        </div>
      </PreviewExample>

      <PreviewSeparator />

      <PreviewExample
        description={'wrapper=<div className="w-[768px] border border-dashed">...</div>'}
        title={"Responsive behavior / simulated at 768px width"}
      >
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Simulated at 768px width
          </p>
          <div className="w-[768px] rounded-xl border border-dashed p-3">
            <FramedScene
              alt={mockSceneMixedContent.alt}
              className="overflow-hidden rounded-xl border bg-card p-4"
              height={mockSceneMixedContent.height}
              src={mockSceneMixedContent.src}
              width={mockSceneMixedContent.width}
            >
              {mockSceneMixedContent.pins.map((pin) => (
                <HotspotPin
                  key={pin.id}
                  label={`768 hotspot ${pin.id}`}
                  variant={pin.id === "mixed-link" ? "dot" : "plus"}
                  x={pin.x}
                  y={pin.y}
                >
                  {renderFixtureContent(pin.content, handlePreviewAddToCart)}
                </HotspotPin>
              ))}
            </FramedScene>
          </div>
        </div>
      </PreviewExample>

      <PreviewSeparator />

      <PreviewExample
        description={"wrapper=full-width desktop scene=mockSceneProductHero"}
        title={"Responsive behavior / full width (desktop)"}
      >
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Full width (desktop)</p>
          <FixtureScene scene={mockSceneProductHero} />
        </div>
      </PreviewExample>

      <PreviewSeparator />

      <PreviewExample
        description={"pins=[]"}
        title={"Edge cases / zero pins"}
      >
        <FramedScene
          alt={mockSceneLivingRoom.alt}
          className="overflow-hidden rounded-xl border bg-card p-4"
          height={mockSceneLivingRoom.height}
          src={mockSceneLivingRoom.src}
          width={mockSceneLivingRoom.width}
        >
          {null}
        </FramedScene>
      </PreviewExample>

      <PreviewSeparator />

      <PreviewExample
        description={'content=<HotspotTooltip description="long" />'}
        title={"Edge cases / long tooltip description"}
      >
        <FramedScene
          alt={mockSceneProductHero.alt}
          className="overflow-hidden rounded-xl border bg-card p-4"
          height={mockSceneProductHero.height}
          src={mockSceneProductHero.src}
          width={mockSceneProductHero.width}
        >
          <HotspotPin label="Long tooltip hotspot" x={57} y={52}>
            <HotspotTooltip
              description={longTooltipDescription}
              title="Long-form merchandising copy"
            />
          </HotspotPin>
        </FramedScene>
      </PreviewExample>

      <PreviewSeparator />

      <PreviewExample
        description={
          'content=<ProductCard layout="vertical" variants="none" onAddToCart={(args)=>console.log(args)} />'
        }
        title={'Edge cases / ProductCard / onAddToCart=console.log'}
      >
        <FramedScene
          alt={mockSceneLivingRoom.alt}
          className="overflow-hidden rounded-xl border bg-card p-4"
          height={mockSceneLivingRoom.height}
          src={mockSceneLivingRoom.src}
          width={mockSceneLivingRoom.width}
        >
          <HotspotPin label="Preview log hotspot" x={62} y={60}>
            <ProductCardPopoverContent
              onAddToCart={handlePreviewAddToCart}
              product={mockProductWithImages}
              variants="none"
            />
          </HotspotPin>
        </FramedScene>
      </PreviewExample>

      <PreviewSeparator />

      <PreviewExample
        description={'width=320 height=320 pins=1 containerWidth="full"'}
        title={"Edge cases / image smaller than container"}
      >
        <FramedScene
          alt="Small placeholder scene using the local cap mock image"
          className="overflow-hidden rounded-xl border bg-card p-4"
          height={320}
          src="/mock/product-1.jpg"
          width={320}
        >
          <HotspotPin label="Small image hotspot" x={52} y={48}>
            <HotspotTooltip
              description="The image is smaller than the container, so no horizontal scroll should appear."
              title="No scroll expected"
            />
          </HotspotPin>
        </FramedScene>
      </PreviewExample>
    </div>
  )
}
