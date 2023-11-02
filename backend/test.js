const { ethers } = require('ethers');
const fs = require('fs')
let contractABI = []
let contractABI_card = []
const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
try {
  contractABI = fs.readFileSync("../frontend/src/abis/Main.json", 'utf8');
} catch (err) {
  console.error('Erreur lors de la lecture du fichier :', err);
}

try {
  contractABI_card = fs.readFileSync("../frontend/src/abis/Card.json", 'utf8');
} catch (err) {
  console.error('Erreur lors de la lecture du fichier :', err);
}

privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
countAdrees = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"

async function createCollection(collectionName, nbCard, privateKey) {  
  try {
    const wallet = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(contractAddress, contractABI, wallet);

    // Appel de la fonction createCollection du contrat Main
    const tx = await contract.createCollection(collectionName, nbCard);
    await tx.wait();

    console.log('Collection créée avec succès!');
  } catch (error) {
    console.error('Erreur lors de la création de la collection :', error);
  }

}

//createCollection("Massi", 40, privateKey)
//createCollection("Messi", 3, privateKey)

async function getCollections(privateKey) {
  
  const wallet = new ethers.Wallet(privateKey, provider); 
  const contract = new ethers.Contract(contractAddress, contractABI, wallet);

  try {
    const collections = await contract.getAllCollections();
     collections.forEach(async function(collection){
      const collec = await contract.getCollection(collection);
      console.log("L'id est ", parseInt(collec[0], 10))
      console.log("Le nom : ", collec[1])
      console.log("Le nombre de carte:", parseInt(collec[2], 10))
    });
  } catch (error) {
    console.error('Erreur :', error);
  }
}

//getCollections(privateKey)

async function createCard(privateKey, collectionId, cardName, imageCard) {
  try{
    const wallet = new ethers.Wallet(privateKey, provider); 
    const contract = new ethers.Contract(contractAddress, contractABI, wallet);

    const tx = await contract.createCardInCollection(collectionId, cardName, imageCard);
      await tx.wait();

      console.log('Carte crée avec succès!');
  } catch (error) {
    console.error('Erreur lors de la création de la carte :');
    console.log("Le nombre de carte a atteind le max");
  }
}


//createCard(privateKey, 0, "pok1", "http://image"); 
//
//createCard(privateKey, 1, "pok2", "http://image1");

async function getCardOfCollection(privateKey, collectionId) {
  
  const wallet = new ethers.Wallet(privateKey, provider); 
  const contract = new ethers.Contract(contractAddress, contractABI, wallet);

  try {
    const cards = await contract.getCardOfCollection(collectionId);
    cards.forEach(async function(card){
      const car = await contract.getCardInfo(card);
      //console.log("L'id est ", parseInt(collec[0], 10))
      console.log("Le nom : ", car[0])
      console.log("Le url:", car[1])
    });
  } catch (error) {
    console.error('Erreur :', error);
  }
}

//getCardOfCollection(privateKey, 0)


async function verifieOwner(privateKey, idCard) {
  try {
    const wallet = new ethers.Wallet(privateKey, provider); 
    const contract = new ethers.Contract(contractAddress, contractABI, wallet);


    const owner = await contract.getOwnerOf(idCard);
    return owner;
  } catch (error) {
    console.log("Erreur dans la fonction verifieOwner")
    return false
  }
}

async function mintCard(privateKey, idCard, address) {
  try {
    const wallet = new ethers.Wallet(privateKey, provider); 
    const contract = new ethers.Contract(contractAddress, contractABI, wallet);

    await contract.mintCard(idCard, address);
    return true;
  } catch (error) {
    console.error('Erreur dans la fonction mintCard');
    return false; 
  }
}


async function transferCard(privateKey, idCard, address) {
  try {
    const wallet = new ethers.Wallet(privateKey, provider); 
    const contract = new ethers.Contract(contractAddress, contractABI, wallet);

    await contract.transferCard(idCard, address);

    return true;
  } catch (error) {
    console.error('Erreur dans la fonction transferCard');
    return false;
  }
}


async function getAllCard(privateKey) {
  try {
    const wallet = new ethers.Wallet(privateKey, provider); 
    const contract = new ethers.Contract(contractAddress, contractABI, wallet);

  
    const cards = await contract.getAllCard();
    var listCard = []
    for(var i = 0; i < cards; i++){
      const car = await contract.getCardInfoById(i);
     
      if(await verifieOwner(privateKey, i) == wallet.address){
        listCard.push({"nom": car[0], "url": car[1], "id": parseInt(car[2], 16)})
      }
      
    }
    console.log("La liste des cartes sont: ", listCard)
    return listCard
  } catch (error) {
    console.error('Erreur dans la fonction getAllCard');
    return false; 
  }
}



address0 = "0xcd3B766CCDd6AE721141F452C550Ca635964ce71"

privateKey0 = "0x8166f546bab6da521a8369cab06c5d2b9e46670292d85c875ee9ec20e84ffb61"
address1 = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"
privateKey1 = "0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a"
//transferCard(privateKey0, 3, address1)
//mintCard(privateKey, 0, address0)
getAllCard(privateKey0)
//verifieOwner(privateKey1, 0)