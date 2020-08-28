//npm packages
const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const cors = require('cors');
//routes
const applicationRoutes = require('./routes/application');
const passbookRoutes = require('./routes/passbook');

const app = express();

require('dotenv').config();
let port = process.env.PORT || 9000;



//configurations for swagger
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'PMD API',
            description: "PMD API Information",
            contact: {
                name: "Marco Butalid"
            },
            servers: [`http://localhost:${port}`]
        }
    },
    apis: ['./routes/*.js']
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


//middleware setup
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));


//middleware routes
app.use(applicationRoutes);
app.use(passbookRoutes);



app.use((err, req, res, next) => {
    let statusCode = err.statusCode || 422;
    res.status(statusCode).json({error:{...err}});
})


module.exports = app;