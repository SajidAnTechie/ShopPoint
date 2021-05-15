import React from 'react';
import { Table } from 'react-bootstrap';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const TableLoader = () => {
  return (
    <Table striped bordered hover responsive className="table-sm">
      <thead>
        <tr>
          {Array(7)
            .fill()
            .map((data, index) => (
              <th key={index}>
                <SkeletonTheme color="lightGray">
                  <Skeleton height={25} />
                </SkeletonTheme>
              </th>
            ))}
        </tr>
      </thead>
      <tbody>
        {Array(7)
          .fill()
          .map((data, index) => (
            <tr key={index}>
              <td>
                <SkeletonTheme color="lightGray">
                  <Skeleton />
                </SkeletonTheme>
              </td>
              <td>
                <SkeletonTheme color="lightGray">
                  <Skeleton />
                </SkeletonTheme>
              </td>
              <td>
                <SkeletonTheme color="lightGray">
                  <Skeleton />
                </SkeletonTheme>
              </td>
              <td>
                <SkeletonTheme color="lightGray">
                  <Skeleton />
                </SkeletonTheme>
              </td>
              <td>
                <SkeletonTheme color="lightGray">
                  <Skeleton />
                </SkeletonTheme>
              </td>
              <td>
                <SkeletonTheme color="lightGray">
                  <Skeleton />
                </SkeletonTheme>
              </td>
              <td>
                <SkeletonTheme color="lightGray">
                  <Skeleton />
                </SkeletonTheme>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};
export default TableLoader;
