import { EventListener, EventListenerConfig } from "./eventListener";
import { TxDecoder } from "./txDecoder";
import { ethers } from "ethers";

// Example ABI (replace with your contract's ABI)
const exampleABI = [
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "function transfer(address to, uint256 amount) returns (bool)",
];

const config: EventListenerConfig = {
  rpcUrl: "https://mainnet.infura.io/v3/YOUR-PROJECT-ID",
  contractAddress: "0x123456789...", // Replace with your contract address
  intervalMs: 5000, // Check every 5 seconds
  abi: exampleABI,
};

const listener = new EventListener(config);

listener.start((events) => {
  events.forEach((event) => {
    console.log("New event:", event);
  });
});

// To stop the listener after 1 minute:
setTimeout(() => {
  listener.stop();
  console.log("Listener stopped");
}, 60000);

// Example of using TxDecoder
const txDecoder = new TxDecoder(exampleABI);

// Example transaction input data (this is a 'transfer' function call)
const txInput =
  "0xa9059cbb000000000000000000000000b5e5d0f8c0cba267cd3d7035d6adc8eba7df7cfd0000000000000000000000000000000000000000000000008ac7230489e80000";

try {
  const decodedTx = txDecoder.decodeTxInput(txInput);
  console.log("Decoded transaction:");
  console.log("Function:", decodedTx.name);
  console.log("Arguments:", decodedTx.args);
} catch (error) {
  console.error("Failed to decode transaction:", error);
}

// Example of decoding logs
const exampleLogs: ethers.providers.Log[] = [
  {
    address: "0x123456789...",
    topics: [
      "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
      "0x000000000000000000000000b5e5d0f8c0cba267cd3d7035d6adc8eba7df7cfd",
      "0x000000000000000000000000d5e5d0f8c0cba267cd3d7035d6adc8eba7df7cfe",
    ],
    data: "0x0000000000000000000000000000000000000000000000008ac7230489e80000",
    blockNumber: 12345678,
    transactionHash: "0xabcdef...",
    transactionIndex: 1,
    blockHash: "0x123abc...",
    logIndex: 0,
    removed: false,
  },
];

const decodedLogs = txDecoder.decodeLogs(exampleLogs);
console.log("Decoded logs:", decodedLogs);
