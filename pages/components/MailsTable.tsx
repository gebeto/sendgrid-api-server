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
  datetime: string;
  receiver: string;
  sender: string;
};

export const mails: Mail[] = [
  {
    id: "1",
    datetime: "2022-09-12T12:00:00+00:00",
    receiver: "receiver@test.com",
    sender: "sender@test.com",
  },
  {
    id: "2",
    datetime: "2022-09-12T12:00:00+00:00",
    receiver: "receiver@test.com",
    sender: "sender@test.com",
  },
  {
    id: "3",
    datetime: "2022-09-12T12:00:00+00:00",
    receiver: "receiver@test.com",
    sender: "sender@test.com",
  },
];

export const Table = () => {
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
      onClick: () => {},
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
      onChange={(data) => {
        setPageIndex(data.page?.index ?? 0);
        setPageSize(data.page?.size ?? 5);
        setSortField(data.sort?.field ?? "datetime");
        setSortDirection(data.sort?.direction ?? "desc");
      }}
    />
  );
};
