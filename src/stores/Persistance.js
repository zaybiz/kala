const initialState = require('components/mockAppState');
const Promise = require('bluebird')
const DBStore = require('nedb');
Promise.promisifyAll(DBStore.prototype);

const db = new DBStore({
    filename: '/tmp/kala.db',
    autoload: true
  });

let dataStore = {
  getDefaultState(){
    return db.findOneAsync({mock:true})
      .then((state)=>{
        if(!state){
          console.log('no state found')
          let defaultState =  initialState;
          return db.updateAsync({},defaultState,{upsert:true})
            .then((der)=>{
              console.log(der)
              return db.findOneAsync({mock:true})
            })
        } else {
          console.log('state found')
          return Promise.resolve(state);
        }
      })
  },
  persist(state){
    db.updateAsync({mock:true},state)
      .catch((err)=>{
        console.log(err)
      })
  }

}

module.exports = dataStore;
