"use client";

import { LoadScript } from "@react-google-maps/api";

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY!;

export default function GoogleMapsProvider({ children }: { children: React.ReactNode }) {
  return (
    <LoadScript googleMapsApiKey={GOOGLE_API_KEY}>
      {children}
    </LoadScript>
  );
}
