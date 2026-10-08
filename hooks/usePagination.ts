import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

/**
 * usePagination Hook
 * Manages pagination state with URL persistence
 */

export interface UsePaginationOptions {
  initialPageSize?: number;
  persistInUrl?: boolean;
}

export function usePagination<T>(
  items: T[],
  options: UsePaginationOptions = {}
) {
  const { initialPageSize = 10, persistInUrl = true } = options;
  
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get initial values from URL if persist is enabled
  const urlPage = persistInUrl ? parseInt(searchParams.get("page") || "1", 10) : 1;
  const urlPageSize = persistInUrl ? parseInt(searchParams.get("pageSize") || String(initialPageSize), 10) : initialPageSize;
  
  const [currentPage, setCurrentPage] = useState(urlPage);
  const [pageSize, setPageSize] = useState(urlPageSize);

  // Update URL when pagination changes
  useEffect(() => {
    if (!persistInUrl) return;
    
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(currentPage));
    params.set("pageSize", String(pageSize));
    
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [currentPage, pageSize, persistInUrl, router, searchParams]);

  // Calculate paginated items
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return items.slice(startIndex, endIndex);
  }, [items, currentPage, pageSize]);

  // Reset to first page when items change (e.g., after filtering)
  useEffect(() => {
    if (items.length > 0 && currentPage > Math.ceil(items.length / pageSize)) {
      setCurrentPage(1);
    }
  }, [items.length, currentPage, pageSize]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1); // Reset to first page
  };

  return {
    currentPage,
    pageSize,
    paginatedItems,
    totalItems: items.length,
    handlePageChange,
    handlePageSizeChange,
  };
}
