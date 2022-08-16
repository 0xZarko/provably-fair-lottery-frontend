/* import { useMoralis } from "react-moralis" //We import Moralis
import { useEffect } from "react"

export default function Header() {
    //We import Moralis hooks
    const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading } =
        useMoralis() //enableWeb3 let's you connect a wallet, account checks if there's an account connected

    //useEffect hook -> takes a function and a dependency array, it executes the function on load and anytime anything from the array changes
    //If we don't pass it an array, it will execute the function on load and anytime the page re-renders
    //If we pass it an empty array, it will execute the function only once on load (two with strictmode enabled)
    //If we pass it a dependency array, it will execute the function on load and anytime a dependency changes
    useEffect(() => {
        //This useEffect checks if an account was connected before the refresh. If it was, it automatically connects to it
        if (isWeb3Enabled) {
            return
        } else {
            if (typeof window !== "undefined") {
                if (window.localStorage.getItem("connected")) {
                    enableWeb3()
                }
            }
        }
    }, [isWeb3Enabled])

    useEffect(() => {
        //This useEffect checks if the account was disconnected to delete the "connected" key from local storage
        Moralis.onAccountChanged((account) => {
            if (account == null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3()
            }
        })
    }, [])

    return (
        <div>
            {account ? ( //If there's an account connected, we show it
                <div>
                    Connected to {account.slice(0, 6)}...{account.slice(account.length - 4)}
                </div>
            ) : (
                //If there's not an account connected, we try to connect to one
                <button
                    onClick={async () => {
                        await enableWeb3()
                        if (typeof window !== "undefined") {
                            window.localStorage.setItem("connected", "injected")
                        }
                    }}
                    disabled={isWeb3EnableLoading}
                >
                    Connect Wallet
                </button>
            )}
        </div>
    )
}
 */
