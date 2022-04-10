const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory("Poap");
    const waveContract = await waveContractFactory.deploy('TEST', 'XYZ', 'Hew!');
    await waveContract.deployed();
    console.log("Contract deployed to:", waveContract.address);
    console.log("Contract deployed by:", owner.address);

    await waveContract.mint(owner.address, 1);

    let name = await waveContract.name();
    let symbol = await waveContract.symbol();
    
    console.log("Name: ", name);
    console.log("Symbol: ", symbol);

    let balance = await waveContract.balanceOf('0x70997970C51812dc3A010C7d01b50e0d17dc79C8');
    let shouldBeEmpty = await waveContract.balanceOf('0x71bE63f3384f5fb98995898A86B02Fb2426c5788');
    console.log('balance: ', balance);
    console.log('balance empty: ', shouldBeEmpty)

    let tokenId = await waveContract.tokenOfOwnerByIndex(owner.address, 0)
    console.log('tokenID: ', tokenId);

    let mintOwner = await waveContract.ownerOf(tokenId);
    console.log('mintOwner: ', mintOwner);

    await waveContract.transferFrom(mintOwner, '0x71bE63f3384f5fb98995898A86B02Fb2426c5788', 0)


  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0); // exit Node process without error
    } catch (error) {
      console.log(error);
      process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
    }
    // Read more about Node exit ('process.exit(num)') status codes here: https://stackoverflow.com/a/47163396/7974948
  };
  
  runMain();