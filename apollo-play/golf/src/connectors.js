import fetch from 'node-fetch'

const PlayerU = {
    getAll() {
        return fetch('http://localhost:5000/active')
                .then(res => res.json())
    }
}