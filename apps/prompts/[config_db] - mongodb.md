# Algumas confifuraÃ§Ãµes minhas do MongoDB Atlas

1. Organization

    - Display Name: Vitor Santos
    - ID: 67db3cecf9567b5153431a28
    - Name: IFMS
    - email: <vitor.santos9@estudante.ifms.edu.br>
    - password: 137946
    - tags (key:value): "application: mongoatlas-ageplan-db"
    - Project name: AgeplanMongo
    - Cluster: Cluster-ageplan
    - IP_local (vitor pc): 177.86.2.93/32 (includes your current IP address)
    - database user: vitor_santos (SCRAM)
    - Connection String: mongodb+srv://vitors_santos:<db_password>
      @cluster-ageplan.qz1rb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-ageplan
    - Mongoose sample code: [
      ```javascript
      const mongoose = require('mongoose');
      const uri = "mongodb+srv://vitors_santos:<db_password>
      @cluster-ageplan.qz1rb.mongodb.net/?appName=Cluster-ageplan";

          const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
          
          async function run() {
          try {
          // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
          await mongoose.connect(uri, clientOptions);
          await mongoose.connection.db.admin().command({ ping: 1 });
          console.log("Pinged your deployment. You successfully connected to MongoDB!");
          } finally {
          // Ensures that the client will close when you finish/error
          await mongoose.disconnect();
          }
          }
          run().catch(console.dir);
          ```]

2. Links para documentaÃ§Ãµes adicionais
    - <https://www.mongodb.com/docs/atlas/reference/api-resources-spec/v2/#tag/Cloud-Migration-Service>
    - <https://www.mongodb.com/developer/languages/javascript/getting-started-with-mongodb-and-mongoose/>
    - <https://www.mongodb.com/developer/languages/javascript/nextjs-with-mongodb/>
    - <https://www.mongodb.com/pt-br/docs/atlas/troubleshoot-connection/#special-characters-in-connection-string-password>
  