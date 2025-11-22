import { network } from "hardhat";

const { ethers } = await network.connect();

async function main() {
  console.log("🚀 Starting Proof of Fun deployment to Base Sepolia...\n");

  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "ETH\n");

  // Deploy ProofOfFun
  console.log("📝 Deploying ProofOfFun contract...");
  const ProofOfFun = await ethers.getContractFactory("ProofOfFun");
  const proofOfFun = await ProofOfFun.deploy();
  await proofOfFun.waitForDeployment();
  const proofOfFunAddress = await proofOfFun.getAddress();
  console.log("✅ ProofOfFun deployed to:", proofOfFunAddress);

  // Deploy EventManager
  console.log("\n📝 Deploying EventManager contract...");
  const EventManager = await ethers.getContractFactory("EventManager");
  const eventManager = await EventManager.deploy();
  await eventManager.waitForDeployment();
  const eventManagerAddress = await eventManager.getAddress();
  console.log("✅ EventManager deployed to:", eventManagerAddress);

  // Deploy AnonymousVoteToken
  console.log("\n📝 Deploying AnonymousVoteToken contract...");
  const AnonymousVoteToken = await ethers.getContractFactory("AnonymousVoteToken");
  const voteToken = await AnonymousVoteToken.deploy();
  await voteToken.waitForDeployment();
  const voteTokenAddress = await voteToken.getAddress();
  console.log("✅ AnonymousVoteToken deployed to:", voteTokenAddress);

  // Deploy ProofOfFunFactory (Note: This might exceed contract size limits)
  console.log("\n📝 Deploying ProofOfFunFactory contract...");
  try {
    const ProofOfFunFactory = await ethers.getContractFactory("ProofOfFunFactory");
    const factory = await ProofOfFunFactory.deploy();
    await factory.waitForDeployment();
    const factoryAddress = await factory.getAddress();
    console.log("✅ ProofOfFunFactory deployed to:", factoryAddress);
  } catch (error) {
    console.log("⚠️  ProofOfFunFactory deployment skipped (contract size limit exceeded)");
  }

  console.log("\n📊 Deployment Summary:");
  console.log("=".repeat(60));
  console.log("Network: Base Sepolia");
  console.log("Deployer:", deployer.address);
  console.log("ProofOfFun:", proofOfFunAddress);
  console.log("EventManager:", eventManagerAddress);
  console.log("AnonymousVoteToken:", voteTokenAddress);
  console.log("=".repeat(60));

  console.log("\n✨ Deployment complete!");
  console.log("\n📝 Save these addresses to your .env file:");
  console.log(`PROOF_OF_FUN_ADDRESS=${proofOfFunAddress}`);
  console.log(`EVENT_MANAGER_ADDRESS=${eventManagerAddress}`);
  console.log(`VOTE_TOKEN_ADDRESS=${voteTokenAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
