import React, { Component } from "react";
import anyBase from "any-base";
import { Button, InputGroup } from "@blueprintjs/core";
import "../App.css";
import "normalize.css/normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";

const dec2hex = anyBase(anyBase.DEC, anyBase.HEX);
const dec2bin = anyBase(anyBase.DEC, anyBase.BIN);
const dec2oct = anyBase(anyBase.DEC, anyBase.OCT);
const hex2dec = anyBase(anyBase.HEX, anyBase.DEC);
const hex2bin = anyBase(anyBase.HEX, anyBase.BIN);
const hex2oct = anyBase(anyBase.HEX, anyBase.OCT);
const bin2dec = anyBase(anyBase.BIN, anyBase.DEC);
const bin2hex = anyBase(anyBase.BIN, anyBase.HEX);
const bin2oct = anyBase(anyBase.BIN, anyBase.OCT);
const oct2dec = anyBase(anyBase.OCT, anyBase.DEC);
const oct2bin = anyBase(anyBase.OCT, anyBase.BIN);
const oct2hex = anyBase(anyBase.OCT, anyBase.HEX);

class ConvForm extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            currConv: [],
        };
    }

    handleDecChange = (e) => {
        if (this.decInputCheck(e.target.value)) {
            this.setState({
                decdata: e.target.value,
                hexdata: this.state.currConv[0](e.target.value), //dec2hex(e.target.value),
                bindata: this.state.currConv[1](e.target.value), //dec2bin(e.target.value)
                octdata: this.state.currConv[2](e.target.value), //dec2hex(e.target.value),
            });
        }
    };

    handleHexChange = (e) => {
        if (this.hexInputCheck(e.target.value)) {
            this.setState({
                decdata: this.state.currConv[0](e.target.value), //dec2hex(e.target.value),
                hexdata: e.target.value,
                bindata: this.state.currConv[1](e.target.value), //dec2bin(e.target.value)
                octdata: this.state.currConv[2](e.target.value), //dec2hex(e.target.value),
            });
        } else {
            console.log("nope");
        }
    };

    handleBinChange = (e) => {
        if (this.binaryInputCheck(e.target.value)) {
            this.setState({
                decdata: this.state.currConv[0](e.target.value), //dec2bin(e.target.value)
                hexdata: this.state.currConv[1](e.target.value), //dec2hex(e.target.value),
                octdata: this.state.currConv[2](e.target.value), //dec2hex(e.target.value),
                bindata: e.target.value,
            });
        } else {
            console.log("binary decimal only!");
        }
    };

    handleOctalChange = (e) => {
        if (this.octalInputCheck(e.target.value)) {
            this.setState({
                decdata: this.state.currConv[0](e.target.value), //dec2bin(e.target.value)
                hexdata: this.state.currConv[1](e.target.value), //dec2hex(e.target.value),
                bindata: this.state.currConv[2](e.target.value),
                octdata: e.target.value,
            });
        } else {
            console.log("octal decimal only!");
        }
    };

    handleDecClick = (e) => {
        if (this.state.decdata === "decimal") {
            this.setState({ decdata: "", currConv: [dec2hex, dec2bin, dec2oct] });
        } else {
            this.setState({ currConv: [dec2hex, dec2bin, dec2oct] });
        }
    };

    handleHexClick = (e) => {
        if (this.state.hexdata === "hexadecimal") {
            this.setState({ hexdata: "", currConv: [hex2dec, hex2bin, hex2oct] });
        } else {
            this.setState({ currConv: [hex2dec, hex2bin, hex2oct] });
        }
    };

    handleBinClick = (e) => {
        this.setState({ currConv: [bin2dec, bin2hex, bin2oct] });
    };

    handleOctClick = (e) => {
        if (this.state.octdata === "octal") {
            this.setState({ octdata: "", currConv: [oct2dec, oct2hex, oct2bin] });
        } else {
            this.setState({ currConv: [oct2dec, oct2hex, oct2bin] });
        }
    };

    decInputCheck = (str) => {
        return /^(\d*)?\d+$/.test(str) || str === "";
    };

    hexInputCheck = (str) => {
        return /^[0-9a-f]+$/.test(str) || str === "";
    };

    binaryInputCheck = (str) => {
        return /^[0-1]{1,}$/.test(str) || str === "";
    };

    octalInputCheck = (str) => {
        return /^([0-7]*\.)?[0-7]+$/.test(str) || str === "";
    };
    copyToClipboard = (value) => {
        const el = document.createElement("textarea");
        el.value = value;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
    };

    render() {
        return (
            <React.Fragment>
                <form className="form">
                    <div class="input-container">
                        <p>decimal</p>

                        <InputGroup
                            large
                            onChange={this.handleDecChange}
                            onFocus={this.handleDecClick}
                            value={this.state.decdata}
                            intent="success"
                            rightElement={
                                <Button
                                    onClick={() =>
                                        this.copyToClipboard(this.state.decdata)
                                    }
                                    icon="clipboard"
                                />
                            }
                        />
                    </div>
                    <div class="input-container">
                        <p>hex</p>

                        <InputGroup
                            large
                            onChange={this.handleHexChange}
                            onFocus={this.handleHexClick}
                            value={this.state.hexdata}
                            intent="success"
                            rightElement={
                                <Button
                                    onClick={() =>
                                        this.copyToClipboard(this.state.hexdata)
                                    }
                                    icon="clipboard"
                                />
                            }
                        />
                    </div>
                    <div class="input-container">
                        <p>binary</p>
                        <InputGroup
                            large
                            onChange={this.handleBinChange}
                            onFocus={this.handleBinClick}
                            value={this.state.bindata}
                            intent="success"
                            rightElement={
                                <Button
                                    onClick={() =>
                                        this.copyToClipboard(this.state.bindata)
                                    }
                                    icon="clipboard"
                                />
                            }
                        />
                    </div>
                    <div className="input-container">
                        <p>octal</p>

                        <InputGroup
                            large
                            onChange={this.handleOctChange}
                            onFocus={this.handleOctClick}
                            value={this.state.octdata}
                            intent="success"
                            rightElement={
                                <Button
                                    onClick={() =>
                                        this.copyToClipboard(this.state.octdata)
                                    }
                                    icon="clipboard"
                                />
                            }
                        />
                    </div>
                </form>
            </React.Fragment>
        );
    }
}

export default ConvForm;
