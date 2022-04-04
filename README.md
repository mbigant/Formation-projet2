# Tests unitaire du contrat Voting.sol


## Utilisation
[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/mbigant/Formation-projet2)

 - Sans installation avec [gitpod](https://gitpod.io/#https://github.com/mbigant/Formation-projet2 "titre de lien optionnel")
 - Cloner le projet puis lancer les commandes : 
    `npm install && npx run truffle test`



## Résumé

Fichier de test : **Voting.js**

Fichier du contrat : **Voting.sol**

44 tests validés

Coverage 100%

| File       |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
|------------|----------|----------|----------|----------|----------------|
| contracts/ |      100 | 100      |      100 |      100 |                |
| Voting.sol |      100 | 100      |      100 |      100 |                |
|  All files |      100 | 100      |      100 |      100 |                |


## Tests
J'ai choisi de faire une grosse partie des tests sur le cylce de vie du contrat étant donné sa nature fortement lié au "**Workflow**". Cette partie ré-utilise le contrat déployé et le modifie tout au long des différentes étapes.

Je test ensuite en 2 temps les restrictions d'accès aux méthodes **onlyOwner** et **onlyVoter** 

Deux méthodes ont été créées afin de factoriser les tests de contrôle du changement d'état de la variable **workflowStatus** et des events **WorkflowStatusChange**.

1) **Workflow**
    - At initial state
      - should have status set to "RegisteringVoters" :white_check_mark:
      - should revert on adding proposal
      - should revert on voting
      - should revert if ending proposal registering
      - should revert if starting voting session
      - should revert if ending voting session
      - should revert if tallying votes
    - When registering a voter
      - should emit a "VoterRegistered" event
      - should set voter as "Registered"
      - should revert if already registered
    - When proposal registering starts
      - should emit a "WorkflowStatusChange" event
      - should set status to "ProposalsRegistrationStarted"
      - should revert if proposal registering already started
      - should revert if adding voter
    - When a voter register a proposal
      - should emit a "ProposalRegistered" event
      - should revert if description is blank
      - should let voter adding multiple proposal
    - When proposal registering ends
      - should emit a "WorkflowStatusChange" event
      - should set status to "ProposalsRegistrationEnded"
      - should revert if voter registered a proposal
    - When voting session starts
      - should emit a "WorkflowStatusChange" event
      - should set status to "VotingSessionStarted"
    - When voter vote for proposal
      - should emit a "Voted" event
      - should increase proposal voteCount
      - should set voter hasVoted
      - should set voted proposalId on voter
      - should revert if already voted
      - should revert if proposal does not exists
    - When voting session ends
      - should emit a "WorkflowStatusChange" event
      - should set status to "VotingSessionEnded"
      - should revert if voter try voting for proposal
    - When votes are talled
      - should emit a "WorkflowStatusChange" event
      - should set status to "VotesTallied"
      - should get a winner for everybody asking for


2) **Admin scope**
  - should revert if not contract owner call addVoter
  - should revert if not contract owner call startProposalsRegistering
  - should revert if not contract owner call endProposalsRegistering
  - should revert if not contract owner call startVotingSession
  - should revert if not contract owner call endVotingSession
  - should revert if not contract owner call tallyVotes
3) **Voter scope**
  - should revert if non voter call addProposal
  - should revert if non voter call getOneProposal
  - should revert if non voter call getVoter
  - should revert if non voter call setVote