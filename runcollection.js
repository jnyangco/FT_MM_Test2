const newman = require('newman');
const fs = require('fs');
const apiCollection = './API_Test2.json';

newman.run({
    collection: require(apiCollection),
    reporters: 'cli'
}).on('request', (error, data) => {
    if(error) {
        console.log(error);
        return;
    }
    
    const requestName = data.item.name.replace(/[^a-z0-9]/gi, '-');
    const fileName = `response-${requestName}.json`;
    const responseBody = data.response.stream.toString();

    fs.writeFile(__dirname+'/MM_API/'+fileName, responseBody, function (error) {
        if(error) {
            console.error(error);
        }
    });

});



