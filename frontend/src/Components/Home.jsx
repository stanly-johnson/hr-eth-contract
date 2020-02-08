import React, { Component } from 'react';   
import { Button } from 'react-bootstrap';
import Web3 from 'web3'
import { CONTRACT_ABI, CONTRACT_ADDRESS } from './constants'

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
                <Button>Add New Student</Button>
            </div>

            <div className="row">
                {this.state && !this.state.loading && (
                    this.state.candidateList.map(c => {
                        return(<ul>
                            <li>UID : {c.uid}</li>
                            <li>Name : {c.name}</li>
                            <li>College : {c.college}</li>
                            <li>Phone : {c.phone}</li>
                            <li>Verified : {String(c.verified)}</li>
                            <hr />
                        </ul>)
                        
                    })
                )}
            </div>

            </div>

        </React.Fragment>
        )
    }
}
 
export default Home;