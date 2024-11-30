import { useState } from "react";

interface UseRowSelectionReturn<T> {
  selectedRows: T[];
  showMultiActions: boolean;
  handleSelectRows: ({ selectedRows }: { selectedRows: T[] }) => void;
}

export function useRowSelection<T>(): UseRowSelectionReturn<T> {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [showMultiActions, setShowMultiActions] = useState(false);

  const handleSelectRows = ({ selectedRows }: { selectedRows: T[] }) => {
    if (selectedRows.length === 0) {
      setSelectedRows([]);
      setShowMultiActions(false);
      return;
    }
    setSelectedRows(selectedRows);
    setShowMultiActions(true);
  };

  return {
    selectedRows,
    showMultiActions,
    handleSelectRows,
  };
}
