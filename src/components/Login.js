import React from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';

function Login(props) {
  return (
    <Container fluid>
      <Row>
        <Col>
          <h1 style={{ marginBottom: "30px", marginTop: "120px", fontWeight: "bold", marginRight: "20px" }}>Trello</h1>
          <Form>
            <FormGroup>
              <Label for="exampleEmail"> </Label>
              <br />
              <Input
                className="form-control"
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="이메일을 입력하세요"
                style ={{marginBottom: "10px", marginRight: "30px"}}
              />
              <Label for="examplePassword"></Label>
              <br />
              <Input
                className="form-control-pw"
                type="password"
                name="password"
                id="examplePassword"
                placeholder="비밀번호를 입력하세요"
                style ={{marginRight: "30px"}}
              />
            </FormGroup>
            <Button
              className="mainButtons"
              color="success"
              style ={{backgroundColor: "#9B5AF5", border : "none"}}
            >
              Sign In
            </Button>

            <Button
              className="mainButtons"
              color="success"
              style ={{backgroundColor: "#9B5AF5", border : "none"}}
            >
              Sign Up
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;