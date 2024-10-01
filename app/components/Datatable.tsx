"use client";

import { useEffect, useState } from "react";
import { useResolvedTheme } from "@/app/hooks";
import DataTable from "react-data-table-component";
import type {
  TableStyles,
  ConditionalStyles,
  ExpanderComponentProps,
} from "react-data-table-component";

const customStyles = (theme: string): TableStyles => {
  return {
    headRow: {
      style: {
        backgroundColor: theme === "dark" ? "#1f2937" : "#f9fafb",
        color: theme === "dark" ? "#ffffff" : "#1f2937",
      },
    },
    expanderButton: {
      style: {
        color: theme === "dark" ? "#fff" : "#000",
      },
    },
    pagination: {
      style: {
        backgroundColor: theme === "dark" ? "#1f2937" : "#f9fafb",
        color: theme === "dark" ? "#ffffff" : "#1f2937",
      },
      pageButtonsStyle: {
        fill: theme === "dark" ? "rgb(209 213 219)" : "rgb(31 41 55)",
        "&:hover:not(:disabled)": {
          fill: theme === "dark" ? "rgb(255 255 255)" : "rgb(0 0 0)",
        },
      },
    },
  };
};

const Datatable = <T extends object>({
  data,
  columns,
  isExapandable = false,
  expandableRowsComponent,
  onSelectedRowsChange,
  conditionalRowStyles,
}: {
  data: T[];
  columns: object[];
  isExapandable?: boolean;
  expandableRowsComponent?: React.FC<ExpanderComponentProps<T>>;
  onSelectedRowsChange: (selected: { selectedRows: T[] }) => void;
  conditionalRowStyles?: (theme: string) => ConditionalStyles<T>[];
}) => {
  const [scrollHeight, setScrollHeight] = useState("75vh");
  const theme = useResolvedTheme();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerHeight < 768) {
        if (window.innerWidth > 600) {
          setScrollHeight("48vh");
        } else {
          setScrollHeight("70vh");
        }
      } else {
        setScrollHeight("75vh");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página:",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todo",
  };

  return (
    <DataTable
      columns={columns}
      data={data}
      pagination
      paginationComponentOptions={paginationComponentOptions}
      fixedHeader
      fixedHeaderScrollHeight={scrollHeight}
      selectableRows
      onSelectedRowsChange={onSelectedRowsChange}
      expandableRows={isExapandable}
      expandableRowsComponent={expandableRowsComponent}
      conditionalRowStyles={conditionalRowStyles && conditionalRowStyles(theme)}
      customStyles={customStyles(theme)}
    />
  );
};

export default Datatable;
