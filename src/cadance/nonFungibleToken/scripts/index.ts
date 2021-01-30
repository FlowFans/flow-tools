import { firstUpperCase } from "../../../utils"

export const getQueryTemplate = (
  contractAddr: string,
  contractName: string
) => {
  contractName = firstUpperCase(contractName)

  const getCollectionIds = () => {
    const template = `
        import NonFungibleToken from ${process.env.REACT_APP_NON_FUNGIBLE_TOKEN_ADDRESS}
        import ${contractName} from ${contractAddr}
        // This transaction returns an array of all the nft ids in the collection
        
        pub fun main(account: Address): [UInt64] {
            let acct = getAccount(account)
            let collectionRef = acct.getCapability(${contractName}.CollectionPublicPath)!.borrow<&{NonFungibleToken.CollectionPublic}>()
                ?? panic("Could not borrow capability from public collection")
            
            return collectionRef.getIDs()
        }
        `
    return template
  }
  const getCollectionLength = () => {
    const template = `
        import NonFungibleToken from ${process.env.REACT_APP_NON_FUNGIBLE_TOKEN_ADDRESS}
        import ${contractName} from ${contractAddr}

        // This transaction gets the length of an account's nft collection

        pub fun main(account: Address): Int {
            let acct = getAccount(account)
            let collectionRef = acct.getCapability(${contractName}.CollectionPublicPath)!
                .borrow<&{NonFungibleToken.CollectionPublic}>()
                ?? panic("Could not borrow capability from public collection")
            
            return collectionRef.getIDs().length
        }
        `
    return template
  }

  const getNFTTypeId = () => {
    const template = `
        import NonFungibleToken from ${process.env.REACT_APP_NON_FUNGIBLE_TOKEN_ADDRESS}
        import ${contractName} from ${contractAddr}

        // This script reads metadata about an NFT in a user's collection
        pub fun main(account: Address, itemID: UInt64): UInt64 {

            // Get the public account object of the owner of the token
            let owner = getAccount(account)

            let collectionBorrow = owner.getCapability(${contractName}.CollectionPublicPath)!
                .borrow<&{${contractName}.${contractName}CollectionPublic}>()
                ?? panic("Could not borrow ${contractName}CollectionPublic")

            // Borrow a reference to a specific NFT in the collection
            let kittyItem = collectionBorrow.borrowKittyItem(id: itemID)
                ?? panic("No such itemID in that collection")

            return kittyItem.typeID
        }
        `
    return template
  }

  const getTotalSupply = () => {
    const template = `
        import ${contractName} from ${contractAddr}

        // This transaction gets the number of ${contractName} currently in existence
        
        pub fun main(): UInt64 {    
            return ${contractName}.totalSupply
        }
        `
    return template
  }
  const getTokenSetupInfo = () => {
    const template = `
        import NonFungibleToken from ${process.env.REACT_APP_NON_FUNGIBLE_TOKEN_ADDRESS}
        import ${contractName} from ${contractAddr}
       
        pub fun main(address: Address): Bool {

            return getAccount(address)
                .getCapability<&${contractName}.Collection{NonFungibleToken.CollectionPublic, ${contractName}.${contractName}CollectionPublic}>(${contractName}.CollectionPublicPath)!
                .check()
        }`
    return template
  }

  return {
    getCollectionIds,
    getCollectionLength,
    getTotalSupply,
    getNFTTypeId,
    getTokenSetupInfo,
  }
}
