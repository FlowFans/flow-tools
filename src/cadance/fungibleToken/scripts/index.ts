import {firstUpperCase} from '../../../utils'

export const getQueryTemplate = (contractAddr: string, contractName:string) => {
    contractName = firstUpperCase(contractName)
    const getBalances = () => {
        const template = `
        import FungibleToken from ${process.env.REACT_APP_FUNGIBLE_TOKEN_ADDRESS}
        import ${contractName} from ${contractAddr}

        pub fun main(account: Address): UFix64 {
            let acct = getAccount(account)
            let vaultRef = acct.getCapability(${contractName}.BalancePublicPath)!.borrow<&${contractName}.Vault{FungibleToken.Balance}>()
                ?? panic("Could not borrow Balance reference to the Vault")

            return vaultRef.balance
        }
        `
        return template
    }
    
    const getTotalSupply = () => {
        const template = `
        import ${contractName} from ${contractAddr}

        pub fun main(): UFix64 {

            let supply = ${contractName}.totalSupply
            log(supply)
            return supply
        }
        `
        return template
    }

    const getTokenSetupInfo = () => {

        const template = `
        import FungibleToken from ${process.env.REACT_APP_FUNGIBLE_TOKEN_ADDRESS}
        import ${contractName} from ${contractAddr}


        pub fun main(address: Address): Bool {

            let receiver: Bool = getAccount(address)
            .getCapability<&${contractName}.Vault{FungibleToken.Receiver}>(${contractName}.ReceiverPublicPath)!
            .check()

            let balance: Bool = getAccount(address)
            .getCapability<&${contractName}.Vault{FungibleToken.Balance}>(${contractName}.BalancePublicPath)!
            .check()

            return receiver && balance
        }`
        return template
    }

    return {
        getBalances,
        getTotalSupply,
        getTokenSetupInfo
    }
}

