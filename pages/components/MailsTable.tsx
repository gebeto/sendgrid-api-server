import React from "react";
import dynamic from "next/dynamic";

import {
  EuiBasicTable,
  EuiPageTemplate,
  EuiText,
  EuiTitle,
  formatDate,
} from "@elastic/eui";

export type Mail = {
  id: string;
  subject: string;
  datetime: string;
  receiver: string;
  sender: string;
  data: any;
};

const mockData = {
  from: {
    planning: -782978870,
    discussion: {
      wood: "crack",
      flow: 655207490.5183449,
      southern: 1399945639.4572515,
      dirty: 1339074916,
      sang: 438558442,
      swim: "shake",
    },
    sudden: "bowl",
    soft: 629552217.8989129,
    reach: "office",
    mental: false,
  },
  progress: true,
  per: 317933302,
  describe: "oldest",
  soil: "chosen",
  carefully: false,
};

export const mails: Mail[] = [
  {
    id: "1",
    subject: "Subject 1",
    datetime: "2022-09-12T14:12:00+00:00",
    receiver: "receiver@test.com",
    sender: "sender@test.com",
    data: mockData,
  },
  {
    id: "2",
    subject: "Subject 2",
    datetime: "2022-09-12T13:00:00+00:00",
    receiver: "receiver@test.com",
    sender: "sender@test.com",
    data: mockData,
  },
  {
    id: "3",
    subject: "Subject 3",
    datetime: "2022-09-12T12:00:00+00:00",
    receiver: "receiver@test.com",
    sender: "sender@test.com",
    data: mockData,
  },
];

export const Table: React.FC<any> = ({ onSelectMail }) => {
  const [pageIndex, setPageIndex] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(5);
  const [sortField, setSortField] = React.useState<keyof Mail>("datetime");
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">(
    "desc"
  );
  const [selectedItems, setSelectedItems] = React.useState<Mail[]>([]);

  const getRowProps = (item: Mail) => {
    const { id } = item;
    return {
      "data-test-subj": `row-${id}`,
      className: "customRowClass",
      onClick: () => {
        onSelectMail?.(item);
      },
    };
  };

  return (
    <EuiBasicTable
      tableCaption="Mails"
      items={mails}
      rowHeader="firstName"
      sorting={{
        sort: {
          field: sortField,
          direction: sortDirection,
        },
      }}
      pagination={{
        totalItemCount: mails.length ?? 0,
        pageIndex: pageIndex,
        pageSize: pageSize,
      }}
      columns={[
        {
          field: "datetime",
          name: "Date Time",
          dataType: "date",
          sortable: true,
          render: (date: string) => formatDate(date, "dateTime"),
        },
        {
          field: "sender",
          name: "From",
          render: (sender: string) => <EuiText>{sender}</EuiText>,
        },
        {
          field: "subject",
          name: "Subject",
          render: (receiver: string) => <EuiText>{receiver}</EuiText>,
        },
        {
          field: "receiver",
          name: "Receiver",
          render: (receiver: string) => <EuiText>{receiver}</EuiText>,
        },
        {
          render: () => {
            return <EuiText>Actions</EuiText>;
          },
        },
      ]}
      rowProps={getRowProps}
      isSelectable
      selection={{
        selectable: () => true,
        onSelectionChange: setSelectedItems,
      }}
      onChange={(data: any) => {
        setPageIndex(data.page?.index ?? 0);
        setPageSize(data.page?.size ?? 5);
        setSortField(data.sort?.field ?? "datetime");
        setSortDirection(data.sort?.direction ?? "desc");
      }}
    />
  );
};
