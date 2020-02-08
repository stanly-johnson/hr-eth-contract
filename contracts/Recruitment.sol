pragma solidity ^0.5.0;

contract Recruitment {
    // create a object for the candidate
    struct Candidate {
        uint uid;
        string name;
        string college;
        string addr;
        string phone;
        bool verified;
        address verifier; // the contract address of the college
    }

    // Read/write Candidates
    mapping(uint => Candidate) public candidates;

    // Store Candidates Count
    uint public candidatesCount;

    constructor () public {
        // create a test candidate
        createCandidate("person One", "College XYZ", "random addr", "1234");
    }

    //funtion to register new candidate
    function createCandidate (string memory _name, string memory _college, string memory _addr, string memory _phone) public {
        candidatesCount ++;
        // using a static address temporarly, need to store address of each college seperately
        address collegeAddress;
        collegeAddress = address(0x5660df1681a32E70704439E9243b1B91c369580e); //replace with your local ganache address
        // create the candidate in blockchain memory
        candidates[candidatesCount] = Candidate(candidatesCount,_name, _college, _addr, _phone, false, collegeAddress);
    }

    function approveCandidate (uint _uid, bool value) public {
        // need to check if the contract is called by the respective college
        require(msg.sender == candidates[_uid].verifier);

        candidates[_uid].verified = value;
    }

// end of recruitment smart contract
}

