const { ethers } = require('ethers');
require('dotenv').config();


const provider = new ethers.providers.JsonRpcProvider('https://alfajores-forno.celo-testnet.org');

const privateKey = process.env.PRIVATE_KEY; 
const wallet = new ethers.Wallet(privateKey, provider);

const contractAddress = '0xDb4F6F77dCcECfB0581A716374Bb9A50E4DCCd1C'; // Replace with your actual contract address
const contractABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "employee",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "salary",
        "type": "uint256"
      }
    ],
    "name": "EmployeeAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "employee",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "SalaryPaid",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "employee",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "newSalary",
        "type": "uint256"
      }
    ],
    "name": "SalarySet",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "employee",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "salary",
        "type": "uint256"
      }
    ],
    "name": "addEmployee",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "employer",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "employee",
        "type": "address"
      }
    ],
    "name": "getSalary",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "employee",
        "type": "address"
      }
    ],
    "name": "paySalary",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "salaries",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "employee",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "newSalary",
        "type": "uint256"
      }
    ],
    "name": "setSalary",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]


const contract = new ethers.Contract(contractAddress, contractABI, wallet);

async function interactWithContract() {
  try {
      // Add an employee
      const employeeAddress = '0x873b3862A9a7bE3D5Cc51703675C781233BD92BB';
      const salary = ethers.utils.parseEther('2'); 

      // Assuming the contract has a function named 'addEmployee'
      const addEmployeeTx = await contract.addEmployee(employeeAddress, salary, { gasLimit: 1000000 });
      await addEmployeeTx.wait();

      console.log('Employee added successfully.');

      // Get an employee's salary
      const employeeSalary = await contract.getSalary(employeeAddress);
      console.log(`Employee's Salary: ${ethers.utils.formatEther(employeeSalary)} CELO`);

      // Set an employee's salary
      const newSalary = ethers.utils.parseEther('3');
      const setSalaryTx = await contract.setSalary(employeeAddress, newSalary, { gasLimit: 1000000 });
      await setSalaryTx.wait();

      console.log('Employee salary updated successfully.');

      // Pay an employee's salary
 
      const paySalaryTx = await contract.paySalary(employeeAddress, { gasLimit: 1000000 });
      await paySalaryTx.wait();

      console.log('Salary paid successfully.');
  } catch (error) {
      console.error('Error interacting with the contract:', error.message);
  }
}

interactWithContract();

