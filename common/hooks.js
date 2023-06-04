const { useHooks, logEvent, parseEvent, handleUnexpectedError } = require('lambda-hooks')

const withHooks = useHooks({
    before: [logEvent, parseEvent],
    after: [],
    onError: [handleUnexpectedError]
})

const hooksWithValidation = ({bodySchema, pathSchema}) => {
    return useHooks({
        before: [logEvent, parseEvent],
        after: [],
        onError: [handleUnexpectedError]
    },
    {
        bodySchema,
        pathSchema
    })
}

module.exports = {
    withHooks,
    hooksWithValidation
}

const validateEventBody = async state => {
    const { bodySchema } = state.config

    if (!bodySchema) {
        throw Error('missing the required body schema')
    }

    try {
        const {event} = state;

        await bodySchema.validate(event.body, {strict: true})
    } catch (error) {
        console.log('Yep validation error of event.body', error)
        //tell the lambda hooks lib that something is wrong and to stop running
        state.exit = true
        //Whats happening 
        state.response = {  statusCode: 400, body: JSON.stringify({error: error.message}) }
    }
    return state;
}
