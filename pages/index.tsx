import React from "react";
import dynamic from "next/dynamic";
import { EuiPageTemplate, EuiTitle, EuiLoadingSpinner } from "@elastic/eui";
import { Mail, MailTable, MailTableProps } from "./components/MailsTable";
import { MailView } from "./components/MailView";

const DynamicComponentWithNoSSR = dynamic(
  () => {
    return new Promise<React.ComponentType<MailTableProps>>((resolve) => {
      setTimeout(() => {
        resolve(MailTable);
      }, 0);
    });
  },
  {
    ssr: false,
  }
);

export default function Home() {
  const [selectedMail, setSelectedMail] = React.useState<Mail>();

  return (
    <EuiPageTemplate
      style={{ flexDirection: "row-reverse", boxShadow: "none" }}
    >
      <EuiPageTemplate.Sidebar sticky={true} minWidth="45%">
        <MailView mail={selectedMail} />
      </EuiPageTemplate.Sidebar>
      <EuiPageTemplate.Header>
        <EuiTitle size="l">
          <strong>SendGrid API Server</strong>
        </EuiTitle>
      </EuiPageTemplate.Header>
      <EuiPageTemplate.Section style={{ paddingRight: 0 }}>
        <React.Suspense fallback={<EuiLoadingSpinner size="xxl" />}>
          <DynamicComponentWithNoSSR
            selectedMail={selectedMail}
            onSelectMail={setSelectedMail}
          />
        </React.Suspense>
      </EuiPageTemplate.Section>
    </EuiPageTemplate>
  );
}
