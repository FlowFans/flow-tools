
import {firstUpperCase} from '../../../utils'

export const getTransactions = (contractAddr: string, contractName:string) => {
    contractName = firstUpperCase(contractName)

    const mintToken = () => {
        const trx = `
            import FungibleToken from ${process.env.REACT_APP_FUNGIBLE_TOKEN_ADDRESS}
            import ${contractName} from ${contractAddr}

            transaction(recipient: Address, amount: UFix64) {
                let tokenAdmin: &${contractName}.Administrator
                let tokenReceiver: &{FungibleToken.Receiver}

                prepare(signer: AuthAccount) {
                    self.tokenAdmin = signer
                    .borrow<&${contractName}.Administrator>(from: ${contractName}.AdminStoragePath)
                    ?? panic("Signer is not the token admin")

                    self.tokenReceiver = getAccount(recipient)
                    .getCapability(${contractName}.ReceiverPublicPath)!
                    .borrow<&{FungibleToken.Receiver}>()
                    ?? panic("Unable to borrow receiver reference")
                }

                execute {
                    let minter <- self.tokenAdmin.createNewMinter(allowedAmount: amount)
                    let mintedVault <- minter.mintTokens(amount: amount)

                    self.tokenReceiver.deposit(from: <-mintedVault)

                    destroy minter
                }
            }
        `
        return trx
    }

    const setupAccount = () => {
        const trx = `
            import FungibleToken from ${process.env.REACT_APP_FUNGIBLE_TOKEN_ADDRESS}
            import ${contractName} from ${contractAddr}

            transaction {

                prepare(signer: AuthAccount) {

                    if signer.borrow<&${contractName}.Vault>(from: ${contractName}.VaultStoragePath) == nil {
                        // Create a new ${contractName} Vault and put it in storage
                        signer.save(<-${contractName}.createEmptyVault(), to: ${contractName}.VaultStoragePath)

                        // Create a public capability to the Vault that only exposes
                        // the deposit function through the Receiver interface
                        signer.link<&${contractName}.Vault{FungibleToken.Receiver}>(
                            ${contractName}.ReceiverPublicPath,
                            target: ${contractName}.VaultStoragePath
                        )

                        // Create a public capability to the Vault that only exposes
                        // the balance field through the Balance interface
                        signer.link<&${contractName}.Vault{FungibleToken.Balance}>(
                            ${contractName}.BalancePublicPath,
                            target: ${contractName}.VaultStoragePath
                        )
                    }
                }
            }
        `
        return trx
    }


    const transfer = () => {
        const trx = `
            import FungibleToken from ${process.env.REACT_APP_FUNGIBLE_TOKEN_ADDRESS}
            import ${contractName} from ${contractAddr}

            transaction(amount: UFix64, to: Address) {

                // The Vault resource that holds the tokens that are being transferred
                let sentVault: @FungibleToken.Vault

                prepare(signer: AuthAccount) {

                    // Get a reference to the signer's stored vault
                    let vaultRef = signer.borrow<&${contractName}.Vault>(from: ${contractName}.VaultStoragePath)
                        ?? panic("Could not borrow reference to the owner's Vault!")

                    // Withdraw tokens from the signer's stored vault
                    self.sentVault <- vaultRef.withdraw(amount: amount)
                }

                execute {

                    // Get the recipient's public account object
                    let recipient = getAccount(to)

                    // Get a reference to the recipient's Receiver
                    let receiverRef = recipient.getCapability(${contractName}.ReceiverPublicPath)!.borrow<&{FungibleToken.Receiver}>()
                        ?? panic("Could not borrow receiver reference to the recipient's Vault")

                    // Deposit the withdrawn tokens in the recipient's receiver
                    receiverRef.deposit(from: <-self.sentVault)
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