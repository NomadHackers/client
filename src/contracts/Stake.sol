// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IStablecoin {
    function transfer(address to, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract StablecoinStaking {
    IStablecoin public stablecoin;

    struct Stake {
        uint256 amount;
        uint256 startTime;
    }

    mapping(address => Stake) public stakes;
    uint256 public rewardRate;  // rewards per second per token staked

    constructor(IStablecoin _stablecoin, uint256 _rewardRate) {
        stablecoin = _stablecoin;
        rewardRate = _rewardRate;
    }

    function stake(uint256 amount) external {
        require(stablecoin.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        stakes[msg.sender] = Stake(amount, block.timestamp);
    }

    function calculateReward(address user) public view returns (uint256) {
        Stake memory userStake = stakes[user];
        uint256 duration = block.timestamp - userStake.startTime;
        uint256 reward = duration * rewardRate * userStake.amount;
        return reward;
    }

    function withdraw() external {
        Stake memory userStake = stakes[msg.sender];
        uint256 reward = calculateReward(msg.sender);
        require(stablecoin.transfer(msg.sender, userStake.amount + reward), "Transfer failed");
        delete stakes[msg.sender];
    }
}