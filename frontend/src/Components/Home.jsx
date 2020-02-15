import React, { Component } from 'react';   
import { Button } from 'react-bootstrap';
import Web3 from 'web3'
import { CONTRACT_ABI, CONTRACT_ADDRESS } from './constants'
import CandidateTable from './CandidateTable'

class Home extends Component {
    state = { 
        account : "",
        loading : true,
        candidatesCount : "",
        candidateList : []
     }

    fetchBlockchainData = async() => {
        const web3 = new Web3("http://127.0.0.1:7545");
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })
        // copy contract abi from build/contracts
        // copy contract address from ganache 
        // paste in contants.js
        const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)
        this.setState({ contract })
        const candidatesCount = await contract.methods.candidatesCount().call()
        console.log(candidatesCount)
        this.setState({ candidatesCount })
        for (var i = 1; i <= candidatesCount; i++) {
        const cand = await contract.methods.candidates(i).call()
        this.setState({
            candidateList: [...this.state.candidateList, cand]
        })
        }
        this.setState({ loading: false })
        console.log(this.state.candidateList)
    }

    async componentDidMount() {
        this.fetchBlockchainData()
    }

    render() { 
        return (
        <React.Fragment>
            <div className="container">
            <div className="jumbotron">
                <h1 className="display-4">Home</h1>
                <p>Active Account : {this.state.account}</p>
                <button type="button" class="btn btn-primary" onClick={() => {
              window.location = '/add';
            }}>Add New Student</button>
            </div>

            <div className="row">
                {this.state && !this.state.loading && (
                <div className="col-md-6">
                {this.state.candidateList.map(c => (
                  <ul key={c.uid}>
                    <CandidateTable c={c} />
                  </ul>
                ))}
              </div>
              )}
            </div>

            </div>

        </React.Fragment>
        )
    }
}
 
export default Home;