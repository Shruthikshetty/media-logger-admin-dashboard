import React, { useMemo } from 'react';
import type { Pagination as PaginationType } from '~/types/global.types';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination';
import { arrayRange } from '~/lib/array-utils';

const TablePagination = ({
  pagination,
  page,
  setPage,
  siblingCount = 1, // Number of pages to show on each side of the current page
}: {
  pagination?: PaginationType;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  siblingCount?: number; // max number of pages to display at once
}) => {
  //calculate visible pages
  const visiblePages = useMemo(() => {
    if (!pagination) return [];

    const totalPages = pagination.totalPages;

    // calculate the total number of pages to display (2 is added for the dots at the start and end)
    const totalDisplayedPages = siblingCount * 2 + 2;

    // in case length of pages is less than totalPageNumbers display all pages
    if (totalDisplayedPages >= totalPages) {
      return arrayRange(1, totalPages);
    }

    //calculate left side  , right side index
    const leftSiblingIndex = Math.max(page - siblingCount, 1);
    const rightSiblingIndex = Math.min(page + siblingCount, totalPages);

    // check if the left or right side needs dots
    const shouldShowLeftDots = leftSiblingIndex > 2; // A left-side ellipsis is needed if the range doesn't start near the first page
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    //define first and last index
    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    // case 1: if left side has dots
    if (shouldShowLeftDots && !shouldShowRightDots) {
      return [
        firstPageIndex,
        'Dot',
        ...arrayRange(leftSiblingIndex, totalPages),
      ];
    }

    // case 2: if right side has dots
    if (!shouldShowLeftDots && shouldShowRightDots) {
      return [...arrayRange(1, rightSiblingIndex), 'Dot', lastPageIndex];
    }

    // case 3: if both sides have dots
    if (shouldShowLeftDots && shouldShowRightDots) {
      return [
        firstPageIndex,
        'Dot',
        ...arrayRange(leftSiblingIndex, rightSiblingIndex),
        'Dot',
        lastPageIndex,
      ];
    }

    //will never happen fail safe
    return [];
  }, [page, pagination, siblingCount]);

  return (
    <Pagination className="text-base-white mt-2">
      <PaginationContent>
        <PaginationPrevious
          className={
            pagination?.hasPrevious
              ? 'cursor-pointer'
              : 'hover:bg-ui-600 hover:text-base-white cursor-not-allowed'
          }
          onClick={() => {
            if (pagination?.hasPrevious) {
              setPage((s) => s - 1);
            }
          }}
        >
          Previous
        </PaginationPrevious>
        {visiblePages?.map((pageNumber, i) =>
          pageNumber === 'Dot' ? (
            <PaginationEllipsis key={`ellipsis-${i}`} />
          ) : (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                isActive={page === pageNumber}
                onClick={() => {
                  setPage(pageNumber as number);
                }}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          ),
        )}
        <PaginationNext
          className={
            pagination?.hasMore
              ? 'cursor-pointer'
              : 'hover:bg-ui-600 hover:text-base-white cursor-not-allowed'
          }
          onClick={() => {
            if (pagination?.hasMore) {
              setPage((s) => s + 1);
            }
          }}
        >
          Next
        </PaginationNext>
      </PaginationContent>
    </Pagination>
  );
};

export default TablePagination;
