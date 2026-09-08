"use client";

import * as Tabs from "@radix-ui/react-tabs";
import Image from "next/image";
import { useState } from "react";
import type {
  RegionContent,
  RegionItem,
  RegionSelectionContext,
  SourceCitation,
  SubzoneContent
} from "@/types/region";
import styles from "./RegionPanel.module.css";
import { useI18n } from "@/contexts/I18nContext";

type RegionPanelProps = {
  region: RegionContent | null;
  subzone: SubzoneContent | null;
  selectedContext: RegionSelectionContext | null;
  onClearSelection: () => void;
};

type DisplayContent = {
  title: string;
  code: string;
  summary: string;
  geography?: string;
  villages?: string[];
  games: RegionItem[];
  costumes: RegionItem[];
  traditions: RegionItem[];
  images: SubzoneContent["images"];
  sources: SourceCitation[];
};

function isValidImageSrc(src: string): boolean {
  return (
    src.length > 0 &&
    !src.includes("/images/logo.gif") &&
    !src.includes("placeholder_timbru")
  );
}

function RegionImage({
  src,
  alt,
  credit
}: {
  src: string;
  alt: string;
  credit?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    <figure className={styles.figure}>
      <Image
        src={src}
        alt={alt}
        width={560}
        height={340}
        className={styles.image}
        unoptimized
        onError={() => setFailed(true)}
      />
      {credit ? <figcaption>{credit}</figcaption> : null}
    </figure>
  );
}

function mergeContent(region: RegionContent, subzone: SubzoneContent | null): DisplayContent {
  if (!subzone) {
    return {
      title: region.name,
      code: region.code,
      summary: region.summary,
      games: region.games,
      costumes: region.costumes,
      traditions: region.traditions,
      images: region.images.filter((image) => isValidImageSrc(image.src)),
      sources: region.sources ?? []
    };
  }

  return {
    title: subzone.name,
    code: region.code,
    summary: subzone.summary || region.summary,
    geography: subzone.geography,
    villages: subzone.representativeVillages,
    games: subzone.games.length > 0 ? subzone.games : region.games,
    costumes: subzone.costumes.length > 0 ? subzone.costumes : region.costumes,
    traditions: subzone.traditions.length > 0 ? subzone.traditions : region.traditions,
    images: (subzone.images.length > 0 ? subzone.images : region.images).filter((image) =>
      isValidImageSrc(image.src)
    ),
    sources: [...subzone.sources, ...(region.sources ?? [])]
  };
}

function ItemList({ items, noItemsText }: { items: RegionItem[], noItemsText: string }) {
  if (items.length === 0) {
    return <p className={styles.empty}>{noItemsText}</p>;
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

function SourcesList({ sources, noSourcesText }: { sources: SourceCitation[], noSourcesText: string }) {
  if (sources.length === 0) {
    return <p className={styles.empty}>{noSourcesText}</p>;
  }

  const unique = sources.filter(
    (source, index, array) => array.findIndex((entry) => entry.url === source.url) === index
  );

  return (
    <ul className={styles.sourcesList}>
      {unique.map((source) => (
        <li key={source.url}>
          <a href={source.url} target="_blank" rel="noopener noreferrer">
            {source.title}
          </a>
          {source.license ? <span className={styles.sourceMeta}> · {source.license}</span> : null}
        </li>
      ))}
    </ul>
  );
}

function PanelContent({
  region,
  subzone,
  selectedContext,
  onClear
}: {
  region: RegionContent | null;
  subzone: SubzoneContent | null;
  selectedContext: RegionSelectionContext | null;
  onClear: () => void;
}) {
  const { t } = useI18n();

  const categories = [
    { id: "games", label: t("games") },
    { id: "costumes", label: t("costumes") },
    { id: "traditions", label: t("traditions") }
  ] as const;

  if (!region) {
    return (
      <div className={styles.placeholder}>
        <h3>{t("selectRegion")}</h3>
        <p>{t("chooseRegion")}</p>
      </div>
    );
  }

  const content = mergeContent(region, subzone);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <p className={styles.code}>{content.code}</p>
          <button className={styles.clearButton} onClick={onClear} aria-label={t("clearSelection")}>
            &times; {t("clearSelection")}
          </button>
        </div>
        <h2>{content.title}</h2>
        <p>{content.summary}</p>
        {content.geography ? <p className={styles.geography}>{content.geography}</p> : null}
        {content.villages && content.villages.length > 0 ? (
          <p className={styles.villages}>
            {t("representativeVillages")}: {content.villages.join(", ")}
          </p>
        ) : null}
        {selectedContext ? (
          <p className={styles.subzoneMeta}>
            {t("historicalRegion")}: <strong>{selectedContext.subzone}</strong> · {t("county")}:{" "}
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
            <ItemList items={content[category.id]} noItemsText={t("noItems")} />
          </Tabs.Content>
        ))}
      </Tabs.Root>

      <section className={styles.gallery}>
        <h3>{t("images")}</h3>
        <div className={styles.images}>
          {content.images.length === 0 ? (
            <p className={styles.empty}>{t("noImages")}</p>
          ) : (
            content.images.map((image) => (
              <RegionImage
                key={image.id}
                src={image.src}
                alt={image.alt}
                credit={image.credit}
              />
            ))
          )}
        </div>
      </section>

      <section className={styles.sources}>
        <h3>{t("sources")}</h3>
        <SourcesList sources={content.sources} noSourcesText={t("noSources")} />
      </section>
    </>
  );
}

export function RegionPanel({
  region,
  subzone,
  selectedContext,
  onClearSelection
}: RegionPanelProps) {
  const { language, setLanguage } = useI18n();

  return (
    <aside className={styles.panel} aria-label="Region details panel">
      <div className={styles.languageSwitcher}>
        <button
          className={styles.flagButton}
          onClick={() => setLanguage(language === "ro" ? "en" : "ro")}
          title={`Switch to ${language === "ro" ? "English" : "Romanian"}`}
        >
          {language === "ro" ? "🇷🇴" : "🇬🇧"}
        </button>
      </div>
      <PanelContent
        region={region}
        subzone={subzone}
        selectedContext={selectedContext}
        onClear={onClearSelection}
      />
    </aside>
  );
}
