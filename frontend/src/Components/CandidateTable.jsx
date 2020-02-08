import React, { Component } from 'react';
import Web3 from 'web3';
import { CONTRACT_ABI, CONTRACT_ADDRESS, APPROVAL_ADDRESS } from './constants'

class CandidateTable extends Component {
    state = {  }

    doSubmit = async(uid) => {
      const web3 = new Web3("http://127.0.0.1:7545");
      const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)
      contract.methods.approveCandidate(uid, true)
      .send({ from: APPROVAL_ADDRESS, gas:3000000 })
      .once('receipt', (receipt) => {
          console.log(receipt)
        })
    }
    render() { 
            const { c } = this.props;
            return (
              <React.Fragment>
                <ul>
                            <li>UID : {c.uid}</li>
                            <li>Name : {c.name}</li>
                            <li>College : {c.college}</li>
                            <li>Phone : {c.phone}</li>
                            <li>Verified : {String(c.verified)}</li>
                            <button type="button" class="btn btn-success"
                            onClick={() => {this.doSubmit(c.uid)}}>Approve</button>
                </ul>
                <br />
                <hr />
              </React.Fragment>);
    }
}
export default CandidateTable;