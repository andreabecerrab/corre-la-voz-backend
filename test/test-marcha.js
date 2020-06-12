const assert = require('assert');
const axios = require('axios');

describe('Marcha', () => {
    describe('#apiGetMarchas', () => {
        it('Should return all strikes', (done) => {
            axios.get('http://localhost:8081/marchas')
                .then((data) => {
                    assert.ok(data.status == 200)
                    done()
                })
                .catch((err) => done(err))
        });
    });

    describe('#apiCountMarchas', () => {
        it('Should return the total of strikes', (done) => {
            axios.get('http://localhost:8081/total')
                .then((data) => {
                    assert.ok(data.status == 200)
                    done()
                })
                .catch((err) => done(err))
        });
        
        
    });
    

    describe('#apiGetSingleMarcha', () => {
        it('Should return a single strike', (done) => {
            let id = '5ee1b927efcc8e207031e2e2';
            axios.get('http://localhost:8081/marcha/' + id)
                .then((data) => {
                    assert.ok(data.status == 200)
                    done()
                })
                .catch((err) => done(err))
        });
        
    });
    
    
});
