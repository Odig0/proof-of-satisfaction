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

  // Deploy ProofOfFunFactory
  console.log("\n📝 Deploying ProofOfFunFactory contract...");
  const ProofOfFunFactory = await ethers.getContractFactory("ProofOfFunFactory");
  const factory = await ProofOfFunFactory.deploy();
  await factory.waitForDeployment();
  const factoryAddress = await factory.getAddress();
  console.log("✅ ProofOfFunFactory deployed to:", factoryAddress);

  // Configure contracts
  console.log("\n⚙️  Configuring contracts...");
  
  // Grant minter role to ProofOfFun contract
  console.log("Granting minter role to ProofOfFun...");
  const MINTER_ROLE = await voteToken.MINTER_ROLE();
  const grantTx = await voteToken.grantMinterRole(proofOfFunAddress);
  await grantTx.wait();
  console.log("✅ Minter role granted");

  // Grant organizer role to deployer
  console.log("Granting organizer role to deployer...");
  const ORGANIZER_ROLE = await eventManager.ORGANIZER_ROLE();
  const grantOrgTx = await eventManager.grantOrganizerRole(deployer.address);
  await grantOrgTx.wait();
  console.log("✅ Organizer role granted");

  console.log("\n📊 Deployment Summary:");
  console.log("=".repeat(60));
  console.log("Network: Base Sepolia");
  console.log("Deployer:", deployer.address);
  console.log("ProofOfFun:", proofOfFunAddress);
  console.log("EventManager:", eventManagerAddress);
  console.log("AnonymousVoteToken:", voteTokenAddress);
  console.log("ProofOfFunFactory:", factoryAddress);
  console.log("=".repeat(60));

  // Get default categories
  console.log("\n📋 Default Categories:");
  const categoryCount = await proofOfFun.getCategoryCount();
  for (let i = 0; i < categoryCount; i++) {
    const category = await proofOfFun.getCategory(i);
    console.log(`  ${i}: ${category.name} (Active: ${category.isActive})`);
  }

  console.log("\n✨ Deployment complete!");
  console.log("\n📝 Save these addresses to your .env file:");
  console.log(`PROOF_OF_FUN_ADDRESS=${proofOfFunAddress}`);
  console.log(`EVENT_MANAGER_ADDRESS=${eventManagerAddress}`);
  console.log(`VOTE_TOKEN_ADDRESS=${voteTokenAddress}`);
  console.log(`FACTORY_ADDRESS=${factoryAddress}`);
  
  console.log("\n🔍 Verify contracts on BaseScan:");
  console.log(`npx hardhat verify --network baseSepolia ${proofOfFunAddress}`);
  console.log(`npx hardhat verify --network baseSepolia ${eventManagerAddress}`);
  console.log(`npx hardhat verify --network baseSepolia ${voteTokenAddress}`);
  console.log(`npx hardhat verify --network baseSepolia ${factoryAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
