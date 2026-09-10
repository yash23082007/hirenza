import type { Metadata } from "next";
import { SimulatorClient } from "./SimulatorClient";

export const metadata: Metadata = {
  title: "Top Company Technical Round Simulator for FAANG & Unicorn Interviews (2026)",
  description: "Experience realistic timed interview rounds formatted to specific company hiring bars with live countdown timers and round-by-round evaluations.",
};

export default function SimulatorPage() {
  return <SimulatorClient />;
}
