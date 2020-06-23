import React from "react";
import { Redirect } from "react-router-dom";
import AuthContext from "../../lib/auth-context";
import Loading from "../Loading";

export default class AuthCheck extends React.Component {
  static contextType = AuthContext;

  state = { retComponent: <Loading /> };

  async componentDidMount() {
    try {
      const data = await (
        await fetch("/api/auth/me", {
          method: "POST",
        })
      ).json();

      this.context.setAuthenticated(data.authenticated);
      this.context.setUser(data.user);

      if (
        data.authenticated === this.props.allowAuthenticated ||
        this.props.allowAll
      ) {
        this.setState({ retComponent: <>{this.props.children}</> });
      } else {
        this.setState({ retComponent: <Redirect to={this.props.fallback} /> });
      }

      if (
        data.authenticated &&
        !data.user?.emailVerified &&
        !!!window.location.href.match(/verify\/email/)
      ) {
        this.setState({
          retComponent: <Loading error="Please verify your email" />,
        });
      }

      // TODO: check for dq and bountyBanned
    } catch (e) {
      this.setState({
        retComponent: <Loading error={e.message} />,
      });
    }
  }

  render() {
    return this.state.retComponent;
  }
}
