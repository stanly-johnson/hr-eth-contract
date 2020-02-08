import React, { Component } from 'react';
import Web3 from 'web3';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from './constants'

class AddNew extends Component {

    state = { 
        name : "",
        college : "",
        addr : "",
        phone : "",
        account : ""
     }

    handleSubmit = e => {
        e.preventDefault();
        this.doSubmit();
      };

    doSubmit = async() => {
        const web3 = new Web3("http://127.0.0.1:7545");
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })
        const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)
        contract.methods.createCandidate(this.state.name, this.state.college, this.state.addr, this.state.phone)
        .send({ from: this.state.account, gas:3000000 })
        .once('receipt', (receipt) => {
            console.log(receipt)
            this.setState({ loading: false })
          })
    }

    
    render() { 
        return (
        <React.Fragment>
            <div className="container">
            <div className="jumbotron">
                <h1 className="display-4">Add New Candidate</h1>
            </div>

            <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Name:</label>
                                <input type="text" className="form-control" id="name" 
                                onChange={e => this.setState({ name: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">College:</label>
                                <input type="text" className="form-control" id="college" 
                                onChange={e => this.setState({ college: e.target.value })}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Address:</label>
                                <input type="text" className="form-control" id="addr" 
                                onChange={e => this.setState({ addr: e.target.value })}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Phone:</label>
                                <input type="text" className="form-control" id="addr" 
                                onChange={e => this.setState({ phone: e.target.value })}/>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
            </form>


            </div>
        </React.Fragment>
        );
    }
}
 
export default AddNew;