import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import Container from "./Container";
import { SPACING, FONT_SIZE } from "../styles/styles";
import { COLORS } from "../styles";

export interface Props {
  isConnected: boolean;
}
class AppWrapper extends React.Component<Props> {
  render() {
    return (
      <Container style={appWrapperStyles.mainContainer}>
        <View style={appWrapperStyles.viewContainer}>
          {this.props.children}
        </View>
        {!this.props.isConnected && (
          <View style={appWrapperStyles.errorView}>
            <Text style={appWrapperStyles.errorText}>
              Please check your internet connection
            </Text>
          </View>
        )}
      </Container>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {};
}

function mapStateToProps(state) {
  return {
    isConnected: state.appReducer.isConnected
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppWrapper);

const appWrapperStyles = StyleSheet.create({
  mainContainer: {
    padding: 0
  },
  viewContainer: {
    flex: 1
  },
  errorView: {
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: COLORS.ERROR,
    minHeight: SPACING.large * 2
  },
  errorText: {
    textAlign: "center",
    height: SPACING.medium,
    fontSize: FONT_SIZE.normal,
    color: COLORS.TINT
  }
});
