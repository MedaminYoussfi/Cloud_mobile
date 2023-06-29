
const app = express () ;
app.use ((req,res) => { 
//res.json ({message: 'votre requéte à été bien reçue!' });

});



/*const express =require ('express') ;
const app = express () ;

app.use ((req,res,next) => { 
    console.log ('requéte reçue!');
    next();

});
app.use ((req,res,next) => {
    res.status (201);
    next();
});

app.use ((req,res,next) => {
res.json ({message: 'votre requéte à été bien reçue!' });
next() ;
});

app.use ((req,res,next) => { 
    console.log ('réponse envoyé avec succés');

});

module.exports =app ;
*/

const express = require('express') ;
const mysql = require ('mysql') ;
//const app = express() ;
const port = 3000 ;

//config connexion bd mysql

const connection = mysql.createConnection ({
host: 'localhost' ,
user: 'root' ,
password: '',
database: 'base_cloud_mobile'

});

//etablissement de la connexion bd
Connection.connect((err) => {

    if (err) {
        console.error('Erreur de connexion a la base de données :', err);

    
    } else {

        console.log('connecté a la base de données');
    }

});

//definition du middleware 
app.use(express.json())

//creer un produit
app.post('/produits',(req,res) => {
    const {nom, prix} =req.body;

    const query = 'insert into produit (nom , prix) VALUES (? , ?)';
    Connection.query(query, [nom, prix], (err, result) => {
        if(err){

            console.error
            ('erreur lors de la creation du produit :', err);
            res.status(500).json({message: 'erreur lors de la création du produit'});

        }
        else{
            res.status(201).json({message: 'produit cree avec succés'});
        }
    });
});
 //récupérer les produits 

 app.get('/produits',(req,res) => {
    

    const query = 'select * from produit';
    Connection.query(query,  (err, rows) => {
        if(err){

            console.error
            ('erreur lors de la creation du produit :', err);
            res.status(500).json({message: 'erreur lors de la création du produit'});

        }

        else{
            res.status(200).json(rows);
        }
    });
});

//recupérer le rpoduit par son ID
app.get('/produits',(req,res) => {
    
    const {id}= req.params;
    
        const query = 'select * from produit where id = ?';
        Connection.query(query,  (err, rows) => {
            if(err){

                console.error('erreur lors de la creation du produit :', err);
                res.status(500).json({message: 'erreur lors de la création du produit'});
        
            }

            else if(rows.lenghth ===0)
            {
                res.status(404).json({message: 'produit non trouvé'});
            }
            else{
                res.status(200).json(rows[0]);
            }
        });
    });

//M à j  d'un produit par son ID 
         app.put('/produits',(req,res) => {
        const {id}= req.params;
        const {nom, prix} =req.body;
        const query = 'UPDATE produit SET nom = ? ,prix =? WHERE id = ?' ;
        Connection.query(query, [nom, prix,id], (err, result) => {

            if(err){

                console.error
                ('erreur lors de la mise à jour du produit :', err);
                res.status(500).json({message: 'erreur lors de la mise à jour du produit'});
                }

                else if (result.affectedRows === 0) {
                res.status(404).json({message: 'produit non trouvé'});    
                }
            else{
                res.status(200).json({message: 'produit mise à jour avec succés'});
            }
        });   
    });  

 //Supprimer un produit
 
 app.delete('/produits/:id',(req,res) => {
    
    const {id}= req.params;
    
        const query = 'DELETE * from produit where id = ?';
        Connection.query(query,[id] ,  (err, rows) => {
            if(err){

                console.error
                ('erreur lors de la suppresssion du produit :', err);
                 res.status(500).json({message: 'erreur lors de la suppression du produit'});
    
                }

            else if (result.affectedRows === 0) {
                res.status(404).json({message: 'produit non trouvé'});
            }
            else{
                res.status(200).json({message: 'produit supprimé'});
            }
        });
    });

    module.exports = app ;