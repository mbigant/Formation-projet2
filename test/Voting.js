// erc20.test.js
const { BN, ether } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');
const Voting = artifacts.require('Voting');
const { expectRevert } = require('@openzeppelin/test-helpers');
const { expectEvent } = require('@openzeppelin/test-helpers');

contract('Voting', function (accounts) {

    const [ owner, voter1, voter2, voter3 ] = accounts;
    const [ RegisteringVotersStatus, ProposalsRegistrationStartedStatus, ProposalsRegistrationEndedStatus, VotingSessionStartedStatus, VotingSessionEndedStatus, VotesTalliedStatus] = [0, 1, 2, 3, 4, 5];


    beforeEach(async function () {
        //votingInstance = await Voting.new({from: owner});
    });

    describe('Workflow', function() {

        describe('At initial state', function () {

            let votingInstance;

            before(async function () {
                votingInstance = await Voting.deployed();
            });


            it('Should have status set to "RegisteringVoters"', async function () {
                const expected = new BN(RegisteringVotersStatus);
                expect( await votingInstance.workflowStatus() ).to.be.bignumber.equal(expected);
            });

        });
    });


    async function shouldChangeWorkflowStatus( contractInstance, expectedStatus ) {
        const expected = new BN(expectedStatus);
        expect( await contractInstance.workflowStatus() ).to.be.bignumber.equal(expected);
    }

    function shouldEmitWorkflowStatusChange( tx, newStatus ) {
        const prevExpectedStatus = new BN(newStatus-1);
        const newExpectedStatus = new BN(newStatus);
        expectEvent( tx, 'WorkflowStatusChange', {previousStatus: prevExpectedStatus, newStatus: newExpectedStatus} )
    }

});
