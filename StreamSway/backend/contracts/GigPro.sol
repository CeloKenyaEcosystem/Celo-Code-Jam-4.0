// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract GigPro {
    struct FreeLancer {
        address userAddress;
        uint payAmount;
        address owner;
    }

    FreeLancer[] public freelancers;
    mapping(address => uint) public freelancerIndex;

    function addFreeLancer(address _userAddress, uint amount) external {
        FreeLancer memory freeLancer = FreeLancer(_userAddress, amount, msg.sender);
        freelancers.push(freeLancer);
        freelancerIndex[_userAddress] = freelancers.length - 1;
    }

    function getFreeLancersByOwner(address _owner) external view returns (FreeLancer[] memory) {
        uint count = 0;
        for (uint i = 0; i < freelancers.length; i++) {
            if (freelancers[i].owner == _owner) {
                count++;
            }
        }

        FreeLancer[] memory result = new FreeLancer[](count);
        uint index = 0;
        for (uint i = 0; i < freelancers.length; i++) {
            if (freelancers[i].owner == _owner) {
                result[index] = freelancers[i];
                index++;
            }
        }

        return result;
    }

    function getSingleFreeLancer(address _userAddress, address _owner) external view returns (FreeLancer memory) {
        uint index = freelancerIndex[_userAddress];
        require(freelancers[index].owner == _owner, "Not authorized for this freelancer");
        return freelancers[index];
    }

    function removeFreeLancer(address _userAddress, address _owner) external {
        require(freelancerIndex[_userAddress] > 0, "Freelancer not found");
        uint indexToDelete = freelancerIndex[_userAddress];
        require(freelancers[indexToDelete].owner == _owner, "Not authorized to remove this freelancer");

        freelancers[indexToDelete] = freelancers[freelancers.length - 1];
        freelancerIndex[freelancers[indexToDelete].userAddress] = indexToDelete;
        freelancers.pop();
        delete freelancerIndex[_userAddress];
    }

    function updateFreeLancer(address _userAddress, uint newAmount, address _newAddress) external {
        require(freelancerIndex[_userAddress] > 0, "Freelancer not found");
        uint indexToUpdate = freelancerIndex[_userAddress];
        require(freelancers[indexToUpdate].owner == msg.sender, "Not authorized to update this freelancer");

        freelancers[indexToUpdate].payAmount = newAmount;
        freelancers[indexToUpdate].userAddress = _newAddress;
    }
}
