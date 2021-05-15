import React from 'react';
import { Row, Col, ListGroup, Card } from 'react-bootstrap';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const Order = () => {
  return (
    <>
      <h1>
        {' '}
        <SkeletonTheme color="lightGray">
          <Skeleton />
        </SkeletonTheme>
      </h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                <SkeletonTheme color="lightGray">
                  <Skeleton />
                </SkeletonTheme>
              </h2>
              <p>
                <SkeletonTheme color="lightGray">
                  <Skeleton />
                </SkeletonTheme>
              </p>
              <p>
                <SkeletonTheme color="lightGray">
                  <Skeleton />
                </SkeletonTheme>
              </p>
              <p>
                <SkeletonTheme color="lightGray">
                  <Skeleton />
                </SkeletonTheme>
              </p>
              <SkeletonTheme color="lightGray">
                <Skeleton height={30} />
              </SkeletonTheme>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>
                <SkeletonTheme color="lightGray">
                  <Skeleton />
                </SkeletonTheme>
              </h2>
              <p>
                <SkeletonTheme color="lightGray">
                  <Skeleton />
                </SkeletonTheme>
              </p>
              <SkeletonTheme color="lightGray">
                <Skeleton height={30} />
              </SkeletonTheme>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>
                {' '}
                <SkeletonTheme color="lightGray">
                  <Skeleton />
                </SkeletonTheme>
              </h2>

              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col md={1}>
                      <SkeletonTheme color="lightGray">
                        <Skeleton />
                      </SkeletonTheme>
                    </Col>
                    <Col>
                      <SkeletonTheme color="lightGray">
                        <Skeleton />
                      </SkeletonTheme>
                    </Col>
                    <Col md={4}>
                      <SkeletonTheme color="lightGray">
                        <Skeleton />
                      </SkeletonTheme>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>
                  <SkeletonTheme color="lightGray">
                    <Skeleton />
                  </SkeletonTheme>
                </h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <SkeletonTheme color="lightGray">
                      <Skeleton />
                    </SkeletonTheme>
                  </Col>
                  <Col>
                    <SkeletonTheme color="lightGray">
                      <Skeleton />
                    </SkeletonTheme>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <SkeletonTheme color="lightGray">
                      <Skeleton />
                    </SkeletonTheme>
                  </Col>
                  <Col>
                    <SkeletonTheme color="lightGray">
                      <Skeleton />
                    </SkeletonTheme>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <SkeletonTheme color="lightGray">
                      <Skeleton />
                    </SkeletonTheme>
                  </Col>
                  <Col>
                    <SkeletonTheme color="lightGray">
                      <Skeleton />
                    </SkeletonTheme>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <SkeletonTheme color="lightGray">
                      <Skeleton />
                    </SkeletonTheme>
                  </Col>
                  <Col>
                    <SkeletonTheme color="lightGray">
                      <Skeleton />
                    </SkeletonTheme>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <SkeletonTheme color="lightGray">
                  <Skeleton height={30} />
                </SkeletonTheme>
              </ListGroup.Item>

              <ListGroup.Item>
                <SkeletonTheme color="lightGray">
                  <Skeleton height={30} />
                </SkeletonTheme>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Order;
