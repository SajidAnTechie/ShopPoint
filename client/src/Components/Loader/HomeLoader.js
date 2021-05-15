import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const HomeLoader = () => {
  return (
    <Row>
      {Array(8)
        .fill()
        .map((item, index) => {
          return (
            <Col key={index} sm={12} md={6} lg={4} xl={3}>
              <Card className="my-3 p-3 rounded">
                <Card.Body>
                  <SkeletonTheme color="lightGray">
                    <Skeleton height={180} width={'100%'} />
                    <br />

                    <Skeleton width={`60%`} />
                    <br />

                    <Skeleton width={`90%`} />
                  </SkeletonTheme>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
    </Row>
  );
};

export default HomeLoader;
