import type { Metadata } from "next";
import { SimulatorClient } from "./SimulatorClient";

export const metadata: Metadata = {
  title: "Company Round Simulator — Timed Multi-Round Interviews",
  description: "Experience realistic timed interview rounds formatted to specific company hiring bars with live countdown timers and round-by-round evaluations.",
};

export default function SimulatorPage() {
  return <SimulatorClient />;
}
