import React from 'react';
import { Row, Col, ListGroup, Card } from 'react-bootstrap';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const SinglePageLoader = () => {
  return (
    <Row>
      <Col md={6}>
        <SkeletonTheme color="lightGray">
          <Skeleton height={350} width={'100%'} />
        </SkeletonTheme>
      </Col>
      <Col md={3}>
        <ListGroup variant="flush">
          {Array(7)
            .fill()
            .map((data, index) => (
              <ListGroup.Item key={index}>
                <SkeletonTheme color="lightGray">
                  <Skeleton />
                </SkeletonTheme>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Col>
      <Col md={3}>
        <Card>
          <ListGroup variant="flush">
            {Array(4)
              .fill()
              .map((data, index) => (
                <ListGroup.Item key={index}>
                  <SkeletonTheme color="lightGray">
                    <Skeleton />
                  </SkeletonTheme>
                </ListGroup.Item>
              ))}
            <ListGroup.Item>
              <SkeletonTheme color="lightGray">
                <Skeleton height={30} />
              </SkeletonTheme>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default SinglePageLoader;
