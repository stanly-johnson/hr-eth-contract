import React, { Component } from 'react';
import Web3 from 'web3';
import { CONTRACT_ABI, CONTRACT_ADDRESS, INFURA_PROVIDER, SENDER_ADDRESS, SENDER_PVT_KEY } from './constants'
var Tx = require('ethereumjs-tx');
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
        const web3 = new Web3(new Web3.providers.HttpProvider(INFURA_PROVIDER));
        var getNonce = await web3.eth.getTransactionCount(SENDER_ADDRESS, 'pending');
        var contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS, { from: SENDER_ADDRESS });
        const payload = contract.methods.createCandidate(this.state.name, this.state.college, this.state.addr, this.state.phone)
        .encodeABI();
        // prepare transaction
        var rawTx = {
            nonce: getNonce,
            gasPrice: web3.utils.toHex('10000000000'),
            gasLimit: web3.utils.toHex('3000000'),
            to: CONTRACT_ADDRESS,
            value: '0x0',
            data: payload
        };

        console.log(rawTx);
        var tx = new Tx(rawTx);
        var privKey = Buffer.from(SENDER_PVT_KEY, 'hex');
        tx.sign(privKey);

        var serializedTx = tx.serialize();

        web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function(err, hash) {
            if (!err) {
                console.log(hash);
            } else {
                console.log(err)
            }
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