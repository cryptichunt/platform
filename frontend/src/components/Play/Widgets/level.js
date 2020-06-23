import React from "react";
import styled from "styled-components";
import { withToastManager } from "react-toast-notifications";
// TODO: setup confirmation
import Swal from "sweetalert2-react";

import { Button } from "../../forms";

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
  width: 95%;
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
`;

const Container = styled.div`
  min-width: 320px;
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

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

class Level extends React.Component {
  constructor() {
    super();
    this.state = {
      lvl: {},
      loading: true,
      answer: "",
      submitting: false,
      confirmingSkip: false,
      confirmSkip: false,
    };
  }

  async componentDidMount() {
    try {
      this.setState({ submitting: true });
      const r = await (await fetch("/api/levels/")).json();

      console.log({ lvl: r }, r.lvl);

      if (r.lvl) {
        this.setState({ loading: false, lvl: r.lvl });
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
        await fetch("/api/levels/answer", {
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

      if (r.success) {
        this.props.toastManager.add("Level completed", {
          appearance: "success",
        });
      } else {
        this.props.toastManager.add(r.message, {
          appearance: "error",
        });
      }

      console.log({ r });
      this.props.setReload(!this.props.reload);
      this.setState({ submitting: false });
    } catch (e) {
      console.error(e);
    }
  }

  async handleSkip() {
    try {
      this.setState({ submitting: true });
      const r = await (
        await fetch("/api/levels/skip", { method: "POST" })
      ).json();

      if (r.user) {
        this.props.setUser(r.user);
        this.props.setSelectedTile(r.user.currentTileId - 1);
      }

      if (r.success) {
        this.props.toastManager.add(r.message, {
          appearance: "success",
        });
      } else {
        this.props.toastManager.add(r.message, {
          appearance: "error",
        });
      }

      this.props.setReload(!this.props.reload);
      console.log({ lvla: r });
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
            <Title>Level</Title>
            <Number>#{!this.state.loading && this.state.lvl.levelId}</Number>
          </div>
          <Text
            dangerouslySetInnerHTML={{
              __html: this.state.loading
                ? "Loading..."
                : this.state.lvl.level?.level,
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
          <ButtonContainer style={{ marginTop: "30px" }}>
            <Button
              onClick={this.handleSubmit.bind(this)}
              disabled={this.state.submitting}
            >
              Submit
            </Button>
            {/* TODO: add confirmation */}
            <Button
              onClick={this.handleSkip.bind(this)}
              disabled={this.state.submitting || this.props.user?.points < 351}
            >
              Skip
            </Button>
          </ButtonContainer>
        </Container>
      </Big>
    );
  }
}

export default withToastManager(Level);
