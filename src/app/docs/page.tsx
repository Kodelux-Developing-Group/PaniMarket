// filepath: src/app/docs/page.tsx
"use client";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export default function ApiDocsPage() {
  return (
    <div style={{ height: "100%", backgroundColor: "#f4f4f4" }}>
      <SwaggerUI url="/api/docs" />
    </div>
  );
}