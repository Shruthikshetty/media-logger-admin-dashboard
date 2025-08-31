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

const MoviesTable = () => {
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
