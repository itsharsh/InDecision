import React from "react";

import AddOption from "./AddOption";
import Options from "./Options";
import Action from "./Action";
import Header from "./Header";
import OptionModal from "./OptionModal";

export default class IndecisionApp extends React.Component {
  state = {
    options: [],
    selectedOption: undefined,
  };

  handleReset = () => {
    this.setState(() => ({ options: [] }));
  };

  handlePick = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    this.setState(() => ({
      selectedOption: option,
    }));
  };

  handleAddOption = (option) => {
    if (!option) {
      return "Please enter valid option";
    } else if (this.state.options.indexOf(option) > -1) {
      return "Option already exists";
    }
    this.setState((prevState) => ({
      options: prevState.options.concat(option),
    }));
  };

  handleDeleteOption = (option) => {
    this.setState((prevState) => ({
      options: prevState.options.filter((o) => option !== o),
    }));
  };

  handleClearSelectedOption = () => {
    this.setState(() => ({
      selectedOption: undefined,
    }));
  };

  componentDidMount() {
    try {
      const json = localStorage.getItem("options");
      const options = JSON.parse(json);
      if (options) this.setState(() => ({ options }));
    } catch (e) {}
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      localStorage.setItem("options", JSON.stringify(this.state.options));
    }
  }

  render() {
    const subtitle = "Get help from a computer";
    return (
      <div>
        <Header subtitle={subtitle} />
        <div className="container">
          <Action
            handlePick={this.handlePick}
            hasOptions={this.state.options.length > 0}
          />
          <div className="widget">
            <Options
              options={this.state.options}
              handleReset={this.handleReset}
              handleDeleteOption={this.handleDeleteOption}
            />
            <AddOption handleAddOption={this.handleAddOption} />
          </div>
        </div>
        <OptionModal
          selectedOption={this.state.selectedOption}
          handleClearSelectedOption={this.handleClearSelectedOption}
        ></OptionModal>
      </div>
    );
  }
}
