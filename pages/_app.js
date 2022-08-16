import "../styles/globals.css"
import { MoralisProvider } from "react-moralis" //To use Moralis we have to import its provider
import { NotificationProvider } from "@web3uikit/core"

function MyApp({ Component, pageProps }) {
    return (
        //We have to wrap the page component with the Moralis Provider to use it
        <MoralisProvider initializeOnMount={false}>
            <NotificationProvider>
                <Component {...pageProps} />
            </NotificationProvider>
        </MoralisProvider>
    )
}

export default MyApp
