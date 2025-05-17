const contractAddress = "0xfae528d5844df7c00528b15cbad3e9486069ff5a"; // Replace this
const abi = [ 
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "player",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "LotteryEntered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "winner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "prize",
				"type": "uint256"
			}
		],
		"name": "WinnerPicked",
		"type": "event"
	},
	{
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"inputs": [],
		"name": "enter",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "entranceFee",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getEntranceFee",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPlayersCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "addr",
				"type": "address"
			}
		],
		"name": "isOwner",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "pickWinner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "recentWinner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
] ;

let provider;
let signer;
let contract;

// Wait until the window and scripts are fully loaded
window.onload = async () => {
  if (typeof window.ethereum === "undefined") {
    document.getElementById("status").innerText = "⚠️ MetaMask is not installed!";
    return;
  }

  await window.ethereum.request({ method: "eth_requestAccounts" });

  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();
  contract = new ethers.Contract(contractAddress, abi, signer);

  updateUI(); // initialize the display
};

async function enterLottery() {
  try {
    const tx = await contract.enter({ value: ethers.utils.parseEther("0.01") });
    await tx.wait();
    document.getElementById("status").innerText = "🎉 You have entered the lottery!";
    updateUI();
  } catch (err) {
    document.getElementById("status").innerText = "⚠️ Error: " + err.message;
  }
}

async function pickWinner() {
  try {
    const tx = await contract.pickWinner();
    await tx.wait();
    document.getElementById("status").innerText = "✅ Winner picked!";
    updateUI();
  } catch (err) {
    document.getElementById("status").innerText = "⚠️ Error: " + err.message;
  }
}

async function updateUI() {
  try {
    const count = await contract.getPlayersCount();
    const winner = await contract.recentWinner();

    document.getElementById("players").innerText = `${count} player(s)`;
    document.getElementById("winner").innerText = winner;
  } catch (err) {
    document.getElementById("status").innerText = "⚠️ Error fetching data.";
  }
}