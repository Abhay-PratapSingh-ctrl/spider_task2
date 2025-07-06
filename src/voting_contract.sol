//SPDX License-Identifier: MIT

pragma solidity ^0.8.30;

contract voting {
    //owner of the contract
    address public owner;
    //import {forge} from "forge-std/Script.sol";
    bool public electionActive;

    //Candidate data
    struct Candidate {
        string name;
        uint voteCount;
    }

    //whitelist addresses allowed to vote
    mapping(address => bool) public Whitelist;

    //Array of candidates
    Candidate[] public candidates;

    //Track if he has already voted;
    mapping(address => bool) public hasAlreadyVoted;

    // Event to notify when a vote is cast
    event ElectionStarted();
    event ElectionEnded();
    event VoteCast(address indexed voter, uint indexed candidateIndex);

    modifier onlyowner() {
        require(msg.sender == owner, "not an owner");
        _;
    }

    //constructor

    constructor() {
        owner = msg.sender;
    }

    //to add candidates
    function addCandidate(string memory _name) public onlyowner {
        if (electionActive != false) {
            revert("Election is already active, cannot add candidates");
            candidates.push(Candidate(_name, 0));
        }
    }

    //whitelist a voter
    function whitelistVoter(address _voter) public onlyowner {
        Whitelist[_voter] = true;
    }

    //start the election
    function startElection() public onlyowner {
        require(!electionActive, "Election already active");
        electionActive = true;
        emit ElectionStarted();
    }

    //end the election
    function endElection() public onlyowner {
        require(electionActive, "Election is not active");
        electionActive = false;
        emit ElectionEnded();
    }

    //cast a vote
    function Vote(uint256 _candidateIndex) public {
        require(electionActive, "Election is not active");
        require(Whitelist[msg.sender], "you have already voted");

        require(!hasAlreadyVoted[msg.sender], "You have already voted");
        require(_candidateIndex < candidates.length, "Invalid candidate index");
        //record the vote
        hasAlreadyVoted[msg.sender] = true;
        candidates[_candidateIndex].voteCount++;
        emit VoteCast(msg.sender, _candidateIndex);
    }

    //get the total number of candidates
    function getCandidateCount() public view returns (uint) {
        return candidates.length;
    }

    //get the candidate details
    function getCandidateDetails(
        uint256 _candidateIndex
    ) public view returns (string memory _name, uint256 voteCount) {
        require(_candidateIndex < candidates.length, "Invalid candidate index");
        Candidate storage candidate = candidates[_candidateIndex];
        return (candidate.name, candidate.voteCount);
    }
}
