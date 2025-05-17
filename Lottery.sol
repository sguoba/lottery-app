// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Lottery {
    address public owner;
    address[] private players;
    address public recentWinner;
    uint256 public entranceFee = 0.01 ether;
    bool private locked;

    event LotteryEntered(address indexed player, uint256 amount);
    event WinnerPicked(address indexed winner, uint256 prize);

    modifier onlyOwner() {
        require(msg.sender == owner, "!Only owner can call this function");
        _;
    }

    modifier noReentrancy() {
        require(!locked, "Reentrant call detected");
        locked = true;
        _;
        locked = false;
    }

    constructor() {
        owner = msg.sender;
    }

    function enter() public payable {
        require(msg.value >= entranceFee, "Minimum 0.01 ETH required");
        players.push(msg.sender);
        emit LotteryEntered(msg.sender, msg.value);
    }

    function pickWinner() public onlyOwner noReentrancy {
        require(players.length > 0, "No players in the lottery");

        // Unsafe randomness for demonstration only
        uint256 random = uint256(
            keccak256(abi.encodePacked(block.timestamp, block.prevrandao, players.length))
        );
        uint256 index = random % players.length;
        recentWinner = players[index];

        uint256 prize = address(this).balance;
        (bool sent, ) = payable(recentWinner).call{value: prize}("");
        require(sent, "Prize transfer failed");

        emit WinnerPicked(recentWinner, prize);

        delete players;
    }

    function getPlayersCount() public view returns (uint256) {
        return players.length;
    }

    function getEntranceFee() public view returns (uint256) {
        return entranceFee;
    }

    function isOwner(address addr) public view returns (bool) {
        return addr == owner;
    }

    receive() external payable {
        enter();
    }

    fallback() external payable {
        enter();
    }
}
