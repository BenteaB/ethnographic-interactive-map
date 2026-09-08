import { HomePageClient } from "./HomePageClient";
import { buildSubzoneLookup, loadPublishedSubzones } from "@/lib/subzones.server";

export default function HomePage() {
  const subzonesRo = loadPublishedSubzones("ro");
  const subzonesEn = loadPublishedSubzones("en");
  
  const subzoneLookupRo = buildSubzoneLookup(subzonesRo);
  const subzoneLookupEn = buildSubzoneLookup(subzonesEn);

  return <HomePageClient subzoneLookupRo={subzoneLookupRo} subzoneLookupEn={subzoneLookupEn} />;
}
