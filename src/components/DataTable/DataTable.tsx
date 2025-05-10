import React, { useState } from "react";
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TablePagination from "./TablePagination";

export interface Column<T> {
  header: string;
  accessorKey: keyof T;
  cell?: (item: T) => React.ReactNode;
  sortable?: boolean;
}

export type SortDirection = "asc" | "desc" | null;

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  title?: string;
  pageSize?: number;
  className?: string;
}

function DataTable<T>({
  data,
  columns,
  title,
  pageSize = 10,
  className,
}: DataTableProps<T>) {
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSort = (column: keyof T) => {
    if (sortColumn === column) {
      setSortDirection(
        sortDirection === "asc"
          ? "desc"
          : sortDirection === "desc"
            ? null
            : "asc",
      );
      if (sortDirection === "desc") {
        setSortColumn(null);
      }
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedData = React.useMemo(() => {
    if (!sortColumn || !sortDirection) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (aValue === bValue) return 0;

      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      const comparison = String(aValue).localeCompare(
        String(bValue),
        undefined,
        {
          numeric: true,
        },
      );
      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [data, sortColumn, sortDirection]);

  const totalPages = Math.ceil(sortedData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = sortedData.slice(startIndex, endIndex);

  const getSortIcon = (column: keyof T) => {
    if (sortColumn !== column)
      return <ChevronsUpDown className="ml-2 h-4 w-4" />;
    if (sortDirection === "asc") return <ChevronUp className="ml-2 h-4 w-4" />;
    if (sortDirection === "desc")
      return <ChevronDown className="ml-2 h-4 w-4" />;
    return <ChevronsUpDown className="ml-2 h-4 w-4" />;
  };

  return (
    <Card
      className={`${className} w-full border border-gray-200 shadow-sm overflow-hidden rounded-md`}
    >
      {title && (
        <div className="px-6 py-4 bg-primary/10 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-primary-900">{title}</h3>
        </div>
      )}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column, index) => (
                <TableHead
                  key={index}
                  className="bg-gray-50 text-primary-800 font-medium"
                >
                  {column.sortable !== false ? (
                    <Button
                      variant="ghost"
                      onClick={() => handleSort(column.accessorKey)}
                      className="h-auto p-0 font-semibold hover:bg-transparent hover:text-primary-600 flex items-center"
                    >
                      {column.header}
                      {getSortIcon(column.accessorKey)}
                    </Button>
                  ) : (
                    <span className="font-semibold">{column.header}</span>
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center text-muted-foreground"
                >
                  Нет данных для отображения
                </TableCell>
              </TableRow>
            ) : (
              currentData.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  className="hover:bg-primary-50 transition-colors border-b border-gray-100"
                >
                  {columns.map((column, colIndex) => (
                    <TableCell key={colIndex} className="py-3">
                      {column.cell
                        ? column.cell(row)
                        : String(row[column.accessorKey] ?? "")}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {totalPages > 1 && (
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </Card>
  );
}

export default DataTable;
