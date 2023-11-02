var http = require('http');

var cors = require("cors");

const express = require("express");
const {checkForAccont} = require("./authentification")
const {createCollection, getCollections, createCard, getCardOfCollection} = require("./collection")

const app = express();

var serveur = http.createServer(app);
app.use(express.urlencoded({extended : true}));
app.use(cors());


const port = 8181;

app.use(express.json({
    type: "*/*" 
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


app.post('/connection', async function(req, res){
    try{
        const  {adresse, privateKey} = req.body;

        if(!adresse || !privateKey){
            res.send([{ error: 'Donnée manquante' }])
            return;
        }
        const addr  = checkForAccont(privateKey)
        if(addr != false){
            if(addr == adresse){
                res.send([{ isConnected: "True", "adresse": adresse, "privateKey": privateKey}]);
            }
        }
    }catch (error){
        res.send([{ error: 'Erreur' }])
    }
})

app.post('/createCollection', async function(req, res){
    console.log("Hello")
    try{
        const collectionName = req.body.collectionName;
        const nbCard = req.body.nbCard;
        const privateKey = req.body.privateKey;
        if(createCollection(collectionName, nbCard, privateKey)){
            res.send({ collectionCreated: "True"});
            
        }else{
            res.send([{ error: 'Erreur' }])
        }
        

    }catch (error){
        console.log("Errreur")
        console.log(error.message)

        res.send([{ error: 'Erreur' }])
    }
})

app.post('/getCollection', async function(req, res){
    try{
        console.log("Hello")
        const privateKey = req.body.privateKey;
        const collection = await getCollections(privateKey);
        res.send(collection)
    }catch(error){
        console.log(error.message)
        res.send([])
    }
})

app.post('/getCardOfCollection', async function(req, res){
    try{
        const privateKey = req.body.privateKey;
        const collectionId = req.body.collectionId; 
        const cards = await getCardOfCollection(privateKey, collectionId);
        res.send(cards)
    }catch(error){
        console.log(error.message)
        res.send([])
    }
})

app.post('/mintCard', async function(req, res){
    try{
        const privateKey = req.body.privateKey;
        const cardId = req.body.cardId; 
        const addressTo = req.body.addressTo; 
        const result = await mintCard(privateKey, idCard, addressTo)
        if(result){
            res.send([{"info": "La carte a bien été donnée à l'adresse donnée."}])
        }else{
            res.send([{"info": "Il y a une erreur : soit la carte a déjà été donnée à un utilisateur, soit elle n'existe pas, ou il y a une autre erreur."}])
        }
    }catch (error){
        res.send([{"info": "Il y a une erreur."}])
    }
})

app.post('transferCard', async function(req, res){
    try{
        const privateKey = req.body.privateKey;
        const cardId = req.body.cardId; 
        const addressTo = req.body.addressTo; 
        const result = await transferCard(idCard, addressTo)
        if(result){
            res.send([{"info": "La carte a bien été donnée à l'adresse donnée."}])
        }else{
            res.send([{"info": "Il y a une erreur : soit la carte n'est pas associée à la clé privée donnée, soit elle n'existe pas, ou il y a une autre erreur."}])
        }
    }catch (error){
        res.send([{"info": "Il y a une erreur."}])
    }
})

app.post('getAllCard', async function(req, res){
    try{
        const privateKey = req.body.privateKey;
        
        const result = await getAllCard(idCard, addressTo)
        if(result){
            res.send(result)
        }else{
            res.send([{"info": "Il y a une erreur."}])
        }
    }catch (error){
        res.send([{"info": "Il y a une erreur."}])
    }
})

serveur.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
