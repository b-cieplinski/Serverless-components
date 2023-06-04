const Responses = require('../common/API_Responses')


exports.handler = async event => {
    console.log("event", event)

    if (!event.pathParameters || !event.pathParameters.ID){
        // failed without an ID
        return Responses._400({message: "missing the ID from the path"})
    }

    let ID = event.pathParameters.ID;

    if (data[ID]){
        // return the data
        return Responses._200(data[ID])
    }
    //failed as ID was not in the data
    return Responses._400({message: 'no ID in data'})
}

const data = { 
    1234: { name: "Malcin Wit", who: "candidate", job: "Web Dev"},
    1245: { name: "John Mayson", who: "recruiter", job: "Recruiter"},
    1256: { name: "Mama Papi", who: "candidate", job: "Cleaner"},
};