import { BranchMapPage } from "@/components/map/BranchMapPage";
import { branches } from "@/data/branches";
import { temples } from "@/data/temples";

export default function MapPage() {
  return <BranchMapPage branches={branches} temples={temples} />;
}
