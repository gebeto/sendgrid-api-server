import React from "react";
import dynamic from "next/dynamic";
import { EuiPageTemplate, EuiTitle, EuiLoadingSpinner } from "@elastic/eui";
import { Table } from "./components/MailsTable";

const DynamicComponentWithNoSSR = dynamic(
  () => {
    return new Promise<React.ComponentType>((resolve) => {
      setTimeout(() => {
        resolve(Table);
      }, 0);
    });
  },
  {
    ssr: false,
  }
);

export default function Home() {
  return (
    <EuiPageTemplate restrictWidth={false}>
      <EuiPageTemplate.Sidebar sticky={true}></EuiPageTemplate.Sidebar>
      <EuiPageTemplate.Header>
        <EuiTitle size="m">
          <strong>SendGrid API Server</strong>
        </EuiTitle>
      </EuiPageTemplate.Header>
      <EuiPageTemplate.Section>
        <React.Suspense fallback={<EuiLoadingSpinner size="xxl" />}>
          <DynamicComponentWithNoSSR />
        </React.Suspense>
      </EuiPageTemplate.Section>
    </EuiPageTemplate>
  );
}
