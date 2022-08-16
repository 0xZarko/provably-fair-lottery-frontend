import { useMoralis, useWeb3Contract } from "react-moralis"
import { contractAddresses, contractAbi } from "../constants/constants"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { useNotification } from "@web3uikit/core" //We import the hook to use notifications
import { Bell } from "@web3uikit/icons"

export default function LotteryEntrance() {
    const { Moralis, chainId: chainIdHex, isWeb3Enabled } = useMoralis() //We can get the chain ID from Moralis
    const chainId = parseInt(chainIdHex) //We have to parse it to an int because it comes in hexadecimal
    const lotteryAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null //If we have a contract address, we get it

    /* State hooks */
    const [entranceFee, setEntranceFee] = useState("0") //We set the getter and setter of the entranceFee to show it and use it as msg.value
    const [numOfPlayers, setNumOfPlayers] = useState("0")
    const [mostRecentWinner, setMostRecentWinner] = useState("0")

    const dispatch = useNotification() //The useNotification hook gives us a dispatch which is like a popup

    //We define the functions of our contract we want to call (We have to specify the relevant parameters)
    const {
        runContractFunction: enterLottery,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: contractAbi,
        contractAddress: lotteryAddress,
        functionName: "enterLottery",
        params: {},
        msgValue: entranceFee,
    })

    /* View functions */
    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: contractAbi,
        contractAddress: lotteryAddress,
        functionName: "getEntranceFee",
        params: {},
    })

    const { runContractFunction: getNumOfPlayers } = useWeb3Contract({
        abi: contractAbi,
        contractAddress: lotteryAddress,
        functionName: "getNumOfPlayers",
        params: {},
    })

    const { runContractFunction: getMostRecentWinner } = useWeb3Contract({
        abi: contractAbi,
        contractAddress: lotteryAddress,
        functionName: "getMostRecentWinner",
        params: {},
    })

    async function updateUIValues() {
        //since getEntranceFee is an async function, we have to wrap it in another async function because you can't await in useEffect
        const entranceFeeFromCall = (await getEntranceFee()).toString() //We get the entrance fee
        setEntranceFee(entranceFeeFromCall) //And format it to ETH

        const numPlayersFromCall = (await getNumOfPlayers()).toString()
        setNumOfPlayers(numPlayersFromCall)

        const mostRecentWinnerFromCall = await getMostRecentWinner()
        setMostRecentWinner(mostRecentWinnerFromCall)
    }

    useEffect(() => {
        //This useEffect is to update the entrance fee that's shown whenever we enable web3
        if (isWeb3Enabled) {
            updateUIValues()
        }
    }, [isWeb3Enabled])

    const handleSuccess = async function (tx) {
        //This function gets executed when the enterLottery tx goes through
        await tx.wait(1)
        handleNewNotification(tx)
        updateUIValues()
    }

    const handleNewNotification = function () {
        //This handles the notification to show a tx completed
        dispatch({
            type: "info",
            message: "Transaction complete!",
            title: "Transaction Notification",
            position: "topR",
            icon: <Bell></Bell>, //In icon the dispatcher expects a React object
        })
    }

    return lotteryAddress ? (
        <div>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
                onClick={async function () {
                    //We create a button that calls the enterLottery function
                    await enterLottery({
                        //Functions created by runContractFunction come with onSuccess, onComplete and onError parameters
                        onSuccess: handleSuccess,
                        onError: (error) => console.log(error),
                    })
                }}
                disabled={isLoading || isFetching}
            >
                {isLoading || isFetching ? (
                    <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                ) : (
                    <div>Enter lottery</div>
                )}
            </button>
            <div>Entrance Fee: {ethers.utils.formatUnits(entranceFee, "ether")} ETH</div>
            <div>Current number of players: {numOfPlayers}</div>
            <div>Most recent winer: {mostRecentWinner}</div>
        </div>
    ) : (
        <div>Please connect to a supported chain.</div>
    )
}
