import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const TablePagination: React.FC<TablePaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Определяем, какие страницы показывать
  const getPageItems = () => {
    const items: (number | "ellipsis")[] = [];

    // Всегда показываем первую страницу
    items.push(1);

    // Если больше 7 страниц, используем эллипсис
    if (totalPages > 7) {
      // Текущая страница близка к началу
      if (currentPage <= 4) {
        items.push(2, 3, 4, 5, "ellipsis", totalPages);
      }
      // Текущая страница близка к концу
      else if (currentPage >= totalPages - 3) {
        items.push(
          "ellipsis",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
      }
      // Текущая страница где-то в середине
      else {
        items.push(
          "ellipsis",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "ellipsis",
          totalPages,
        );
      }
    } else {
      // Если меньше 8 страниц, показываем все
      for (let i = 2; i <= totalPages; i++) {
        items.push(i);
      }
    }

    return items;
  };

  // Простая проверка для предотвращения рендеринга пагинации с 1 страницей
  if (totalPages <= 1) return null;

  const pageItems = getPageItems();

  return (
    <div className="py-4 px-2 border-t border-gray-200 bg-gray-50">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-1 text-primary-700 hover:text-primary-900 hover:bg-primary-50"
            >
              <PaginationPrevious />
            </Button>
          </PaginationItem>

          {pageItems.map((item, index) => (
            <PaginationItem key={index}>
              {item === "ellipsis" ? (
                <span className="px-4 text-gray-500">...</span>
              ) : (
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(item as number);
                  }}
                  isActive={currentPage === item}
                  className={
                    currentPage === item
                      ? "bg-primary text-white hover:bg-primary-600"
                      : "text-gray-700 hover:bg-primary-50"
                  }
                >
                  {item}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 text-primary-700 hover:text-primary-900 hover:bg-primary-50"
            >
              <PaginationNext />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default TablePagination;
