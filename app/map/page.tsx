import { BranchMapPage } from "@/components/map/BranchMapPage";
import { branches } from "@/data/branches";
import { normalizeLocale } from "@/lib/format";

type MapPageProps = {
  searchParams: Promise<{ lang?: string | string[] }>;
};

export default async function MapPage({ searchParams }: MapPageProps) {
  const params = await searchParams;
  return <BranchMapPage branches={branches} locale={normalizeLocale(params.lang)} />;
}
