"use client";

import * as Dialog from "@radix-ui/react-dialog";
import * as Tabs from "@radix-ui/react-tabs";
import Image from "next/image";
import type { RegionContent } from "@/types/region";
import styles from "./RegionPanel.module.css";

type RegionPanelProps = {
  region: RegionContent | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
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

function PanelContent({ region }: { region: RegionContent | null }) {
  if (!region) {
    return (
      <div className={styles.placeholder}>
        <h3>Select a region</h3>
        <p>Choose one highlighted region from the map to view traditional games, costumes, and customs.</p>
      </div>
    );
  }

  return (
    <>
      <header className={styles.header}>
        <p className={styles.code}>{region.code}</p>
        <h2>{region.name}</h2>
        <p>{region.summary}</p>
      </header>

      <Tabs.Root defaultValue="games" className={styles.tabs}>
        <Tabs.List className={styles.tabsList} aria-label="Region content tabs">
          <Tabs.Trigger value="games" className={styles.tabTrigger}>
            Games
          </Tabs.Trigger>
          <Tabs.Trigger value="costumes" className={styles.tabTrigger}>
            Costumes
          </Tabs.Trigger>
          <Tabs.Trigger value="traditions" className={styles.tabTrigger}>
            Traditions
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="games">
          <ItemList items={region.games} />
        </Tabs.Content>
        <Tabs.Content value="costumes">
          <ItemList items={region.costumes} />
        </Tabs.Content>
        <Tabs.Content value="traditions">
          <ItemList items={region.traditions} />
        </Tabs.Content>
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

export function RegionPanel({ region, isOpen, onOpenChange }: RegionPanelProps) {
  return (
    <>
      <aside className={styles.desktopPanel} aria-label="Region details panel">
        <PanelContent region={region} />
      </aside>

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
            <PanelContent region={region} />
            <Dialog.Close className={styles.closeButton} aria-label="Close panel">
              Close
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
