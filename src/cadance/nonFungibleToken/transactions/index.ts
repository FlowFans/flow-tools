
import {firstUpperCase} from '../../../utils'

export const getTransactions = (contractAddr: string, contractName:string) => {
    contractName = firstUpperCase(contractName)

    const mintToken = () => {
        const trx = `
            import NonFungibleToken from ${process.env.REACT_APP_NON_FUNGIBLE_TOKEN_ADDRESS}
            import ${contractName} from ${contractAddr}
            
            // This script uses the NFTMinter resource to mint a new NFT
            // It must be run with the account that has the minter resource
            // stored in /storage/NFTMinter
            
            transaction(recipient: Address, typeID: UInt64) {
                
                // local variable for storing the minter reference
                let minter: &${contractName}.NFTMinter
            
                prepare(signer: AuthAccount) {
            
                    // borrow a reference to the NFTMinter resource in storage
                    self.minter = signer.borrow<&${contractName}.NFTMinter>(from: ${contractName}.MinterStoragePath)
                        ?? panic("Could not borrow a reference to the NFT minter")
                }
            
                execute {
                    // Get the public account object for the recipient
                    let recipient = getAccount(recipient)
            
                    // Borrow the recipient's public NFT collection reference
                    let receiver = recipient
                        .getCapability(${contractName}.CollectionPublicPath)!
                        .borrow<&{NonFungibleToken.CollectionPublic}>()
                        ?? panic("Could not get receiver reference to the NFT Collection")
            
                    // Mint the NFT and deposit it to the recipient's collection
                    self.minter.mintNFT(recipient: receiver, typeID: typeID)
                }
            }
        `
        return trx
    }

    const setupAccount = () => {
        const trx = `
            import NonFungibleToken from ${process.env.REACT_APP_NON_FUNGIBLE_TOKEN_ADDRESS}
            import ${contractName} from ${contractAddr}

            // This transaction is what an account would run
            // to set itself up to receive NFTs
            
            transaction {
                prepare(acct: AuthAccount) {
            
                    // If the account doesn't already have a collection
                    if acct.borrow<&${contractName}.Collection>(from: ${contractName}.CollectionStoragePath) == nil {
            
                        // Create a new empty collection
                        let collection <- ${contractName}.createEmptyCollection()
                        
                        // save it to the account
                        acct.save(<-collection, to: ${contractName}.CollectionStoragePath)
            
                        // create a public capability for the collection
                        acct.link<&${contractName}.Collection{NonFungibleToken.CollectionPublic, ${contractName}.${contractName}CollectionPublic}>(${contractName}.CollectionPublicPath, target: ${contractName}.CollectionStoragePath)
                    }
                }
            }
        `
        return trx
    }

    const transfer = () => {
        const trx = `
            import NonFungibleToken from ${process.env.REACT_APP_NON_FUNGIBLE_TOKEN_ADDRESS}
            import ${contractName} from ${contractAddr}


            // This transaction is for transferring and NFT from 
            // one account to another

            transaction(recipient: Address, withdrawID: UInt64) {
                prepare(acct: AuthAccount) {
                    
                    // get the recipients public account object
                    let recipient = getAccount(recipient)

                    // borrow a reference to the signer's NFT collection
                    let collectionRef = acct.borrow<&${contractName}.Collection>(from: ${contractName}.CollectionStoragePath)
                        ?? panic("Could not borrow a reference to the owner's collection")

                    // borrow a public reference to the receivers collection
                    let depositRef = recipient.getCapability(${contractName}.CollectionPublicPath)!.borrow<&{NonFungibleToken.CollectionPublic}>()!

                    // withdraw the NFT from the owner's collection
                    let nft <- collectionRef.withdraw(withdrawID: withdrawID)

                    // Deposit the NFT in the recipient's collection
                    depositRef.deposit(token: <-nft)
                }
            }
        `
        return trx
    }

    return {
        mintToken,
        setupAccount,
        transfer
    }
}