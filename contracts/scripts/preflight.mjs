import {createPublicClient,http,parseAbi,keccak256,toHex} from 'viem';
import {baseSepolia} from 'viem/chains';
async function main(){
const rpc=process.env.BASE_SEPOLIA_RPC_URL || 'https://sepolia.base.org';
const client=createPublicClient({chain:baseSepolia,transport:http(rpc,{timeout:15000,retryCount:1})});
const chainId=await client.getChainId();
if(chainId!==baseSepolia.id) throw new Error('Refusing network other than Base Sepolia');
const factory='0x6f9a0ECD77C3Dade8Dc14a507cAbABFD746575f8';
const usdc='0x036CbD53842c5426634e7929541eC2318f3dCF7e';
const blockNumber=await client.getBlockNumber();
const wrapper=await client.readContract({address:factory,abi:parseAbi(['function getWrapper(address) view returns (address)']),functionName:'getWrapper',args:[usdc],blockNumber});
const underlying=await client.readContract({address:wrapper,abi:parseAbi(['function underlying() view returns (address)']),functionName:'underlying',blockNumber});
if(underlying.toLowerCase()!==usdc.toLowerCase())throw new Error('Wrapper underlying mismatch');
const slot=toHex(BigInt(keccak256(toHex('eip1967.proxy.beacon')))-1n,{size:32});
const beaconWord=await client.getStorageAt({address:wrapper,slot,blockNumber});
if(!beaconWord)throw new Error('Missing beacon storage');
const beacon=`0x${beaconWord.slice(-40)}`;
const implementation=await client.readContract({address:beacon,abi:parseAbi(['function implementation() view returns (address)']),functionName:'implementation',blockNumber});
const executor='0x4b9911b0191B0b6a6eA8F2Ed562e20Cff5AC8624';
const code=await client.getCode({address:executor,blockNumber});
if(!code || code==='0x')throw new Error('No executor bytecode');
console.log(JSON.stringify({kind:'public-read-only-preflight',chainId,blockNumber:blockNumber.toString(),factory,underlying,wrapper,beacon,implementation,executor,executorBytecodeBytes:(code.length-2)/2,escrowDeployed:false,livePaymentProof:false,signerConfigured:Boolean(process.env.BASE_PAYMENTS_TESTNET_PRIVATE_KEY),note:'No signatures or transactions. This does not pass the escrow payment gate.'},null,2));
}
await main().catch(()=>{console.error('Preflight failed. Verify Base Sepolia network, RPC availability and expected deployment. No transaction was sent.');process.exitCode=1;});
