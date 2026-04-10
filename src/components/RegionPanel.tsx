"use client";

import * as Dialog from "@radix-ui/react-dialog";
import * as Tabs from "@radix-ui/react-tabs";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { RegionContent, RegionSelectionContext } from "@/types/region";
import styles from "./RegionPanel.module.css";

type RegionPanelProps = {
  region: RegionContent | null;
  selectedContext: RegionSelectionContext | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onClearSelection: () => void;
};

type Item = { id: string; name: string; description: string };

function ItemList({ items }: { items: Item[] }) {
  if (items.length === 0) {
    return <p className={styles.empty}>No items available yet for this category.</p>;
  }

  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item.id} className={styles.listItem}>
          <h4>{item.name}</h4>
          <p>{item.description}</p>
        </li>
      ))}
    </ul>
  );
}

interface Category {
  id: keyof Pick<RegionContent, "games" | "costumes" | "traditions">;
  label: string;
}

const categories: Category[] = [
  { id: "games", label: "Games" },
  { id: "costumes", label: "Costumes" },
  { id: "traditions", label: "Traditions" }
];

function PanelContent({
  region,
  selectedContext,
  onClear
}: {
  region: RegionContent | null;
  selectedContext: RegionSelectionContext | null;
  onClear: () => void;
}) {
  if (!region) {
    return (
      <div className={styles.placeholder}>
        <h3>Select a region</h3>
        <p>
          Choose one highlighted region from the map to view traditional games, costumes, and
          customs.
        </p>
      </div>
    );
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <p className={styles.code}>{region.code}</p>
          <button className={styles.clearButton} onClick={onClear} aria-label="Clear selection">
            &times; Back to map
          </button>
        </div>
        <h2>{region.name}</h2>
        <p>{region.summary}</p>
        {selectedContext ? (
          <p className={styles.subzoneMeta}>
            Subzone: <strong>{selectedContext.subzone}</strong> · County:{" "}
            <strong>{selectedContext.county}</strong>
          </p>
        ) : null}
      </header>

      <Tabs.Root defaultValue={categories[0].id} className={styles.tabs}>
        <Tabs.List className={styles.tabsList} aria-label="Region content tabs">
          {categories.map((category) => (
            <Tabs.Trigger key={category.id} value={category.id} className={styles.tabTrigger}>
              {category.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {categories.map((category) => (
          <Tabs.Content key={category.id} value={category.id}>
            <ItemList items={region[category.id]} />
          </Tabs.Content>
        ))}
      </Tabs.Root>

      <section className={styles.gallery}>
        <h3>Images</h3>
        <div className={styles.images}>
          {region.images.length === 0 ? (
            <p className={styles.empty}>No images available yet.</p>
          ) : (
            region.images.map((image) => (
              <figure key={image.id} className={styles.figure}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={560}
                  height={340}
                  className={styles.image}
                  unoptimized // Since we use SVG placeholders
                />
                {image.credit ? <figcaption>{image.credit}</figcaption> : null}
              </figure>
            ))
          )}
        </div>
      </section>
    </>
  );
}

export function RegionPanel({
  region,
  selectedContext,
  isOpen,
  onOpenChange,
  onClearSelection
}: RegionPanelProps) {
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 899px)");
    const updateViewport = () => setIsMobileViewport(mediaQuery.matches);

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);
    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  return (
    <>
      <aside className={styles.desktopPanel} aria-label="Region details panel">
        <PanelContent
          region={region}
          selectedContext={selectedContext}
          onClear={onClearSelection}
        />
      </aside>

      {isMobileViewport ? (
        <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
          <Dialog.Portal>
            <Dialog.Overlay className={styles.overlay} />
            <Dialog.Content className={styles.mobilePanel}>
              <Dialog.Title className={styles.mobileTitle}>
                {region?.name ?? "Region details"}
              </Dialog.Title>
              <Dialog.Description className={styles.srOnly}>
                Details about selected ethnographic region.
              </Dialog.Description>
              <PanelContent
                region={region}
                selectedContext={selectedContext}
                onClear={onClearSelection}
              />
              <Dialog.Close className={styles.closeButton} aria-label="Close panel">
                Close
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      ) : null}
    </>
  );
}
