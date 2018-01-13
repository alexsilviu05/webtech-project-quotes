var express = require('express'); 
var bodyParser = require('body-parser'); 
var cors = require('cors');
var app = new express();
var Sequelize = require("sequelize")
var nodeadmin = require('nodeadmin'); 
app.use(nodeadmin(app)); 
app.use(bodyParser.json()); 
app.use(cors()); 

var sequelize = new Sequelize('quotes', 'root', '', {
    
        dialect:'mysql',
    
        host:'localhost',
    
        define: {
    
            freezeTableName: true,
    
            timestamps: false
    
        }
    
    })

sequelize.authenticate().then(function(){

    console.log('Success')

})



var Authors = sequelize.define('authors', {

    id_author: Sequelize.INTEGER,

    name: Sequelize.STRING

})

var Quotes = sequelize.define('quotes', {

    id_quotes: Sequelize.INTEGER,

    id_author: Sequelize.INTEGER,

    sourceTitle: Sequelize.STRING,

    AuthorName: Sequelize.STRING,

    Description: Sequelize.STRING,

    AppearedAt: Sequelize.DATE

})

// Get -list of authors

app.get('/Authors', function(request, response) {

    Authors.findAll().then(function(authors){

        response.status(200).send(authors)

    })

})

// Get -authors depending on ID 

app.get('/authors/:id', function(request, response) {

    Authors.findOne({where: {id:request.params.id}}).then(function(format) {

        if(format) {

            response.status(200).send(format)

        } else {

            response.status(404).send()

        }

    })

})

//Add new author

app.post('/authors', function(request, response) {

    Authors.create(request.body).then(function(authors) {

        response.status(201).send(authors)

    })

})


app.put('/authors/:id', function(request, response) {

    Authors.findById(request.params.id).then(function(Authors) {

        if(Authors) {

            Authors.update(request.body).then(function(authors){

                response.status(201).send(authors)

            }).catch(function(error) {

                response.status(200).send(error)

            })

        } else {

            response.status(404).send('Not found')

        }

    })

})

//Delete - author

app.delete('/authors/:id', function(request, response) {

    Authors.findById(request.params.id).then(function(author) {

        if(author) {

            author.destroy().then(function(){

                response.status(204).send()

            })

        } else {

            response.status(404).send('Not found')

        }

    })

})

//Get -quote

app.get('/quotes', function(request, response) {

    Quotes.findAll(

        {

            include: [{

                model: Quotes,

                where: { id: Sequelize.col('quotes.id_quotes') }

            }]

        }

        ).then(

            function(quotes) {

                response.status(200).send(quotes)

            }

        )

})

//Get -quote after id

app.get('/quotes/:id', function(request, response) {

    Quotes.findById(request.params.id).then(

            function(quote) {

                response.status(200).send(quote)

            }

        )

})

//Add new quote

app.post('/quotes', function(request, response) {

    Quotes.create(request.body).then(function(quote) {

        response.status(201).send(quote)

    })

})

app.put('/quotes/:id', function(request, response) {

    Quotes.findById(request.params.id).then(function(quote) {

        if(quote) {

            quote.update(request.body).then(function(quote){

                response.status(201).send(quote)

            }).catch(function(error) {

                response.status(200).send(error)

            })

        } else {

            response.status(404).send('Not found')

        }

    })

})


//Delete a quote

app.delete('/quotes/:id', function(request, response) {

    Quotes.findById(request.params.id).then(function(quote) {

        if(quote) {

            quote.destroy().then(function(){

                response.status(204).send()

            })

        } else {

            response.status(404).send('Not found')

        }

    })

})

//Get - quotes depending on author

app.get('/authors/:id/quotes', function(request, response) {

    Quotes.findAll({where:{id_author: request.params.id}}).then(

            function(quotes) {

                response.status(200).send(quotes)

            }

        )

})

app.listen(process.env.PORT);
console.log("Server started successfully on port " + process.env.PORT);