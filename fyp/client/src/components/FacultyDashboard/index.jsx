import React, { useState } from "react";
import { Nav, Container, Tab, Row, Col } from "react-bootstrap";
import FypPane from "./FypPane";
import GroupsPane from "./GroupsPane";
import RequestsPane from "./RequestsPane";

export default function FacultyDashboard() {
  // only load when needed
  const [tab, setTab] = useState(window.location.hash.substring(1) || "home");

  return (
    <Container fluid className="mt-4">
      <Tab.Container id="left-tabs-example" defaultActiveKey={tab}>
        <Row>
          <Col sm={2}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item onClick={(e) => setTab("home")}>
                <Nav.Link href="#home" eventKey="home">
                  Home
                </Nav.Link>
              </Nav.Item>
              <Nav.Item onClick={(e) => setTab("fyp")}>
                <Nav.Link href="#fyp" eventKey="fyp">
                  FYP
                </Nav.Link>
              </Nav.Item>
              <Nav.Item onClick={(e) => setTab("groups")}>
                <Nav.Link href="#groups" eventKey="groups">
                  Groups
                </Nav.Link>
              </Nav.Item>
              <Nav.Item onClick={(e) => setTab("requests")}>
                <Nav.Link href="#requests" eventKey="requests">
                  Requests
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="sixth" disabled>
                  Chat
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="seventh">Profile</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={10}>
            <Tab.Content>
              <Tab.Pane eventKey="home">This is a thing</Tab.Pane>
              <Tab.Pane eventKey="fyp">{tab === "fyp" && <FypPane />}</Tab.Pane>
              <Tab.Pane eventKey="requests">
                {tab === "requests" && <RequestsPane />}
              </Tab.Pane>
              <Tab.Pane eventKey="groups">
                {tab === "groups" && <GroupsPane />}
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
}
