const main = async () => {
    // const [owner, randomPerson] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory(
        'WavePortal'
    )
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther('0.1'),
    })
    await waveContract.deployed()
    console.log('Contract ready:', waveContract.address)

    // console.log("Contract deployed to:", waveContract.address);
    // console.log("Contract deployed by:", owner.address);

    // Get Contract Balance
    let contractBalance = await hre.ethers.provider.getBalance(
        waveContract.address
    )
    console.log(
        'Contract balance:',
        hre.ethers.utils.formatEther(contractBalance)
    )

    // Get Wave Count
    let waveCount
    waveCount = await waveContract.getTotalWaves()
    console.log(waveCount.toNumber())

    // Send Wave
    let waveTxn = await waveContract.wave('Wave #1')
    await waveTxn.wait()

    let waveTxn2 = await waveContract.wave('Wave #2')
    await waveTxn2.wait()

    // Get Contract Balance to see what happens
    contractBalance = await hre.ethers.provider.getBalance(waveContract.address)
    console.log(
        'Contract Balance:',
        hre.ethers.utils.formatEther(contractBalance)
    )

    const [_, randomPerson] = await hre.ethers.getSigners()
    waveTxn = await waveContract.connect(randomPerson).wave('Another Message!')
    await waveTxn.wait()

    let allWaves = await waveContract.getAllWaves()
    console.log(allWaves)
}

const runMain = async () => {
    try {
        await main()
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

runMain()
