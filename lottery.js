const contractAddress = "0xYourLotteryContractAddress"; // Replace this
const abi = [ /* Paste your ABI here */ ];

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, abi, signer);

async function enterLottery() {
  await provider.send("eth_requestAccounts", []);
  const tx = await contract.enter({ value: ethers.utils.parseEther("0.01") });
  await tx.wait();
  document.getElementById("status").innerText = "🎉 You have entered the lottery!";
  updateUI();
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
    const players = await contract.getPlayers();
    const winner = await contract.recentWinner();
    document.getElementById("players").innerText = players.join(", ");
    document.getElementById("winner").innerText = winner;
  } catch (err) {
    document.getElementById("status").innerText = "Error fetching data.";
  }
}

window.onload = updateUI;
