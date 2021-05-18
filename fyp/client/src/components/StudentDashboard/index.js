import React, { useState } from "react";
import { Nav, Container, Tab, Row, Col } from "react-bootstrap";
import ChatPane from "./ChatPane";
import FypPane from "./FypPane";
import GroupPane from "./GroupPane";
import RequestsPane from "./RequestsPane";
import SubmissionsPane from "./SubmissionsPane";

export default function Dashboard() {
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
              <Nav.Item onClick={(e) => setTab("group")}>
                <Nav.Link href="#group" eventKey="group">
                  Group
                </Nav.Link>
              </Nav.Item>
              <Nav.Item onClick={(e) => setTab("submissions")}>
                <Nav.Link eventKey="submissions" href="#submissions">
                  Submissions
                </Nav.Link>
              </Nav.Item>
              <Nav.Item onClick={(e) => setTab("requests")}>
                <Nav.Link href="#requests" eventKey="requests">
                  Requests
                </Nav.Link>
              </Nav.Item>
              <Nav.Item onClick={(e) => setTab("chat")}>
                <Nav.Link href="#chat" eventKey="chat">
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
              <Tab.Pane eventKey="submissions">
                {tab === "submissions" && <SubmissionsPane />}
              </Tab.Pane>
              <Tab.Pane eventKey="group">
                {tab === "group" && <GroupPane />}
              </Tab.Pane>
              <Tab.Pane eventKey="requests">
                {tab === "requests" && <RequestsPane />}
              </Tab.Pane>
              <Tab.Pane eventKey="chat">
                {tab === "chat" && <ChatPane />}
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
}
