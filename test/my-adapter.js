module.exports = {
    resolved: value =>  {
        
    },
    
    rejected: reason => {
        
    },
    
    deferred: ()=> {
        return {
            promise: {},
            resolve: value => {
                
            },
            reject: reason => {
                
            }
        }
    }
}