import { Contract, ethers } from 'ethers';
import { cusdAbi } from '@/abi/cusdabi';

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

export const sendCusd = async (_amount: any, _receiver: string) => {
  const accounts = await provider.send('eth_requestAccounts', []); //This is used to pop up metamask accounts list
  const account = accounts[0];
  //const _receiver = "0x9368e48B38248373f861fF02f06A7900E9de9a60";
  console.log(' Address :' + account);
  console.log('CUSD Amt =' + _amount);

  console.log('ReC = ' + _receiver);
  const tokenAddress = '0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1'; //CUSDC Token Address
  const tokenContract = new ethers.Contract(tokenAddress, cusdAbi, signer);
  await tokenContract.approve(account, _amount);
  const writen = await tokenContract.transfer(
    _receiver,
    ethers.utils.parseEther(_amount)
  );
  console.log('Written' + writen.hash);
  return writen.hash;
};

export const sendToken = async (_cmd: any, receiver: any) => {
  console.log('The command is : ' + _cmd);
  const myArray = _cmd.split(' ');
  console.log(myArray);
  if (myArray[2] === 'cusd') {
    return sendCusd(myArray[1], receiver);
  }
};
