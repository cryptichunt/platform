import React from "react";
import styled from "styled-components";
import { withToastManager } from "react-toast-notifications";

import { Button } from "../../forms";
import api from "../../../lib/api";

const Big = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`;

const StyledField = styled.input`
  border: 2px solid #545454;
  /* border-radius: 3px; */
  padding: 15px 0;
  text-indent: 20px;
  font-size: 1.1rem;
  background: #23272a;
  width: 450px;
  transition: border-color 0.3s ease;
  color: #fff;

  &:focus,
  &:active {
    border-color: #2977f5;
    outline: none;
  }

  &::placeholder {
    color: #686d71;
  }

  @media screen and (max-width: 450px) {
    width: 300px;
  }
`;

const Container = styled.div`
  min-width: 500px;
  width: 20vw;
  padding: 30px;
  border-radius: 5px;
  background: #484f54;

  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);

  @media screen and (max-width: 768px) {
    width: 90vw;
  }
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 30px;
`;

const Number = styled.div`
  font-size: 25px;
  opacity: 0.5;
`;

const Text = styled.div`
  font-size: 18px;
`;

class Riddle extends React.Component {
  constructor() {
    super();
    this.state = {
      riddle: {},
      loading: true,
      answer: "",
      submitting: false,
    };
  }

  async componentDidMount() {
    try {
      this.setState({ submitting: true });
      const r = await (await fetch(api("/api/play/riddle"))).json();

      console.log({ lvl: r }, r.lvl);

      if (r.riddle) {
        this.setState({ loading: false, riddle: r.riddle });
      }
      this.setState({ submitting: false });
    } catch (e) {
      console.error(e);
    }
  }

  async handleSubmit() {
    try {
      this.setState({ submitting: true });
      const r = await (
        await fetch(api("/api/play/riddle/answer"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answer: this.state.answer }),
        })
      ).json();

      if (r.user) {
        this.props.setUser(r.user);
        this.props.setSelectedTile(r.user.currentTileId - 1);
      }

      this.setState({ answer: "" });
      this.props.setReload(!this.props.reload);

      if (r.success) {
        this.props.toastManager.add("Riddle solved", {
          appearance: "success",
        });
      } else {
        this.props.toastManager.add(r.message, {
          appearance: "error",
        });
      }

      console.log({ r });
      this.setState({ submitting: false });
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <Big>
        <Container>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <Title>Riddle</Title>
          </div>
          <Text
            dangerouslySetInnerHTML={{
              __html: this.state.loading
                ? "Loading..."
                : this.state.riddle?.riddle?.riddle || "",
            }}
          />
          <div style={{ marginTop: "30px" }}>
            <StyledField
              name="answer"
              type="text"
              placeholder="Answer"
              value={this.state.answer}
              onChange={(e) => this.setState({ answer: e.target.value })}
            />
          </div>
          <Button
            onClick={this.handleSubmit.bind(this)}
            disabled={this.state.submitting}
            style={{ marginTop: "30px" }}
          >
            Submit
          </Button>
        </Container>
      </Big>
    );
  }
}

export default withToastManager(Riddle);
