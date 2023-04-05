const ethers = require("ethers");
const express = require("express");
const cors = require("cors");
const axios = require("axios");
// const { sendToBot, isChannelIdle, sendIdleMessage } = require("./telegram");

// The ArbiRush Smart Contract ABI
const arbirushABI = require("./abi/arbirushABI.json");
const camelotABI = require("./abi/camelotRouteABI.json");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/static"));

  let camelot_route = "0xeb034303A3C4380Aa78b14B86681bd0bE730De1C";

    // Arbi Rush contract address
  const arbiRushAddress = "0xb70c114B20d1EE068Dd4f5F36E301d0B604FEC18";
  // real jackpot address
  const jackpotAddress = process.env.JP;

  // configuring Listener WebSocket
  const provider = new ethers.providers.WebSocketProvider(
    `wss://arb-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_WEBSOCKET}`
  );

  console.log("Listener is running");
  // The Listener
  const contract = new ethers.Contract(camelot_route, camelotABI, provider);

    contract.on("Transfer", async (from, to, value, event) => {
    let listener_to = to;
    let no_tokens = ethers.utils.formatUnits(value, 18);
    let initial_token = no_tokens;
    no_tokens =  parseFloat(no_tokens) + (parseFloat(no_tokens) * 0.145);


    let info = {
      from: from,
      to: to,
      value: ethers.utils.formatUnits(value, 18),
      data: event,
    };
    
    console.log(info);
});