import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { io } from "socket.io-client";
import useToken from "../../../useToken.js";
import jwtDecode from "jwt-decode";

export default function ChatPane() {
  const [msg, setMsg] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [groupId, setGroupId] = useState();
  const { token } = useToken();
  const readToken = jwtDecode(token);
  const socketRef = useRef();

  function setupSocketStuff() {
    /* because socket io server is running on the same domain */
    const socket = io("/", { auth: { token: token } });
    socketRef.current = socket;

    socket.on("first", (data) => {
      // TODO: don't SHOW ANY UI UNTIL
      // we get this!!!!!!!!!!!!!!!!!!
      setGroupId(data.groupId);
      console.log(data);
    });

    socket.on("roomMessage", (data) => {
      // update message list state
      const newMsg = {
        sender: data.firstname,
        msg: data.msg,
        mine: data._id == readToken._id,
      };
      setMsgs((msgs) => [...msgs, newMsg]);
    });

    socket.on("connect", () => {
      console.log("connection established");
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (msg?.trim()) {
      // send the message to the room
      socketRef.current.emit("roomMessage", {
        token,
        msg: msg.trim(),
        groupId,
      });
    }
    // empty the text field
    setMsg("");
  }

  function teardownSocketStuff() {
    const socket = socketRef.current;
    socket.off("roomMessage");
    socket.off("first");
    socket.disconnect();
  }

  useEffect(() => {
    setupSocketStuff();
    return teardownSocketStuff;
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <h3 className="font-weight-bold">Chat</h3>
          <hr />
        </Col>
      </Row>
      <div
        id="chat-wrapper"
        className="d-flex flex-column border shadow-sm p-4"
      >
        <div id="message-list" style={{ height: "400px", overflow: "scroll" }}>
          {msgs.length > 0 &&
            msgs.map((e, i) => (
              <p className={e.mine ? "text-right" : undefined} key={i}>
                <b>{e.sender}: </b> {e.msg}
              </p>
            ))}
        </div>
        <div className="mt-auto">
          <Form onSubmit={handleSubmit}>
            <Form.Control
              block
              type="text"
              placeholder="enter your message"
              value={msg}
              required
              onChange={(e) => setMsg(e.target.value)}
            />
          </Form>
        </div>
      </div>
    </Container>
  );
}
