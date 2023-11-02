const { ethers } = require('ethers');

async function getAccounts() {
  const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545'); // Assurez-vous que l'URL du fournisseur est correcte

  try {
    const accounts = await provider.listAccounts();
    return accounts;
  } catch (error) {
    console.error('Erreur lors de la récupération des comptes :', error);
    return []
  }
}


async function checkKeyForAccount(privateKey) {
    try {
      const wallet = new ethers.Wallet(privateKey);
      const address = await wallet.getAddress();
      console.log('Clé privée associée à l\'adresse :', address);
      const contListe = await getAccounts()
      var test = false
      console.log(contListe.length)
      for(var i = 0; i < contListe.length; i++){
        if(contListe[i] == address){
            test = true
            break
        }
      }
      if(test){
        console.log("Connection")
        return address
      }else{
        console.log("Not connected")
      }

      return false
        
    } catch (error) {
      console.error('La clé privée n\'est pas associée à un compte valide :', error);
    }
}


// const privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'; // Remplacez ceci par votre clé privée
// checkKeyForAccount(privateKey);

module.exports = {checkKeyForAccount};


