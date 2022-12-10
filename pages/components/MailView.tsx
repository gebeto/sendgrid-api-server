import {
  EuiCode,
  EuiCodeBlock,
  EuiDescriptionList,
  EuiDescriptionListDescription,
  EuiDescriptionListTitle,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHorizontalRule,
  EuiText,
  formatDate,
} from "@elastic/eui";
import React from "react";
import { Mail } from "./MailsTable";

export type MailViewProps = {
  mail?: Mail;
};

export const MailView: React.FC<MailViewProps> = (props) => {
  const data = React.useMemo(
    () => JSON.stringify(props.mail, undefined, 4),
    [props.mail]
  );

  if (!props.mail) return null;

  return (
    <EuiFlexGroup direction="column">
      <EuiFlexItem>
        <EuiText>
          <h1>{props.mail.subject}</h1>
        </EuiText>
        <EuiText>
          <h6 title="Local Timezone">{formatDate(props.mail.datetime)}</h6>
        </EuiText>
      </EuiFlexItem>
      <EuiFlexItem style={{ maxWidth: "300px" }}>
        <EuiDescriptionList textStyle="reverse" type="column">
          <EuiDescriptionListTitle>Sender</EuiDescriptionListTitle>
          <EuiDescriptionListDescription>
            {props.mail.sender}
          </EuiDescriptionListDescription>
          <EuiDescriptionListTitle>Receiver</EuiDescriptionListTitle>
          <EuiDescriptionListDescription>
            {props.mail.receiver}
          </EuiDescriptionListDescription>
        </EuiDescriptionList>
      </EuiFlexItem>
      <EuiHorizontalRule margin="xs" />
      <EuiFlexItem>
        <EuiText>
          <h3>Data</h3>
          <EuiCodeBlock language="json">{data}</EuiCodeBlock>
        </EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};
