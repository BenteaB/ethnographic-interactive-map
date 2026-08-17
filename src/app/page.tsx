import { HomePageClient } from "./HomePageClient";
import { buildSubzoneLookup, loadPublishedSubzones } from "@/lib/subzones.server";

export default function HomePage() {
  const subzones = loadPublishedSubzones();
  const subzoneLookup = buildSubzoneLookup(subzones);

  return <HomePageClient subzoneLookup={subzoneLookup} />;
}
