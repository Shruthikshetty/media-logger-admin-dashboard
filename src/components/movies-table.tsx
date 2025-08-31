import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination';
import { T } from 'vitest/dist/chunks/reporters.d.BFLkQcL6.js';
import { Skeleton } from './ui/skeleton';

type MoviesTableType = {
  loading: boolean;
};

/**
 * This returns all the movie details in table format
 */
const MoviesTable = ({ loading }: MoviesTableType) => {
  //if loading return a skeleton table
  if (loading)
    return (
      <Table>
        <TableBody>
          {[...Array(4)].map((_, i) => (
            <TableRow key={i}>
              {[...Array(4)].map((_, i) => (
                <TableCell key={i}>
                  <Skeleton className="h-8 w-full rounded-md" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  //if not loading return the table
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-base-white">Movie Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Star Wars</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Pagination className="text-base-white">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious>Previous</PaginationPrevious>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>3</PaginationLink>
          </PaginationItem>
          <PaginationNext>
            <PaginationNext>Next</PaginationNext>
          </PaginationNext>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default MoviesTable;
