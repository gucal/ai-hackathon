"use client";

import { TkInput } from "@takeoff-ui/react";
import dynamic from "next/dynamic";
import { useState } from "react";

const TkButton = dynamic(
  () => import("@takeoff-ui/react").then((mod) => mod.TkButton),
  { ssr: false }
);

export default function Page() {
  const [value, setValue] = useState("");
  return (
    <main className="flex min-h-screen flex-col items-center p-8 ">
      <h1 className="text-4xl font-bold mb-24">Takeoff UI Refactor Example</h1>
      <div className="flex flex-col gap-24">
        <div className="flex flex-col gap-2 items-center">
          <TkInput
            mode="text"
            placeholder="TKInput"
            value={value}
            onTkChange={(e) => setValue(e.detail)}
          />
          <span>{value}</span>
        </div>
        <div className="flex gap-2 items-center">
          <TkButton
            label="Click me"
            variant="primary"
            onClick={() => alert("Hello")}
          />
          <tk-button label="kebab-case" />
        </div>
      </div>
    </main>
  );
}
