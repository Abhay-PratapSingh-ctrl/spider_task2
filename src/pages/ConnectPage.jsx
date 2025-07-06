import {useNavigate} from 'react-router-dom'
import {ethers} from "ethers"
import {useState} from 'react'

const abi=[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "ElectionEnded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "ElectionStarted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "voter",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "candidateIndex",
				"type": "uint256"
			}
		],
		"name": "VoteCast",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_candidateIndex",
				"type": "uint256"
			}
		],
		"name": "Vote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "Whitelist",
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
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "addCandidate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "candidates",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "voteCount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "electionActive",
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
		"name": "endElection",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCandidateCount",
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
				"internalType": "uint256",
				"name": "_candidateIndex",
				"type": "uint256"
			}
		],
		"name": "getCandidateDetails",
		"outputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "voteCount",
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
				"name": "",
				"type": "address"
			}
		],
		"name": "hasAlreadyVoted",
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
		"name": "startElection",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_voter",
				"type": "address"
			}
		],
		"name": "whitelistVoter",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]




// ● Authenticate users using wallet login (e.g., MetaMask). 
// ● Create a simulated whitelist of eligible voters (wallets pre-approved to vote). 
// ● Display a list of candidates for the Student Council President election. 
// ● Each student can cast only one vote per election. 
// ● Show a public and verifiable vote count for each candidate after voting ends, 
// while keeping voter identities private. 
// ● Build a clean frontend dashboard for viewing candidates, voting, and seeing 
// live results.
var account = null;
var contract = null;
const ADDRESS ="0x87BEA2C6e1c65e8a2a868836FA26C56a12f46432";

function ConnectPage(){
    const navigate =useNavigate();
    const [account, setAccount]=useState('')

  async function connectWallet() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
      await window.ethereum.request({method: 'eth_requestAccounts'});
      const accounts =await web3.eth.getAccounts();
      setAccount( accounts[0])
      navigate ('/dashboard', {state: {acccount: accounts[0]}})
      document.getElementById('walletAddress').textContent = account;
      contract = new web3.eth.Contract(abi,ADDRESS);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Voting App</h1>
        <h3>Connect your wallet to start voting</h3>
        <div className="card" id="walletAddress">Wallet Address: {account ? account : "Not connected"}</div>
        <br />
        <Button onClick={connectWallet}>Connect Wallet</Button>
        <br />
        
        
        <div></div>
      </header>
    </div>
  );
}

export default ConnectPage
