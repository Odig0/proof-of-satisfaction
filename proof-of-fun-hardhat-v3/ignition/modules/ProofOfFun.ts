import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("ProofOfFunModule", (m) => {
  // Deploy ProofOfFun
  const proofOfFun = m.contract("ProofOfFun", []);

  // Deploy EventManager
  const eventManager = m.contract("EventManager", []);

  // Deploy AnonymousVoteToken
  const voteToken = m.contract("AnonymousVoteToken", []);

  // Note: ProofOfFunFactory excluded due to contract size limits
  // You can deploy it separately if needed

  return { proofOfFun, eventManager, voteToken };
});
