const fetch = require('node-fetch');

class MoviesService {
    getMovies = async ({ search = 'aaa', type, year, page = 1 }) => {
        try {
            let query = `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${search}&page=${page}`
            if (type) query += `&type=${type}`
            if (year) query += `&y=${year}`
            let res = await fetch(query)
            res = await res.json()
            return res.Search
        } catch (e) {
            return []
        }
    }
}

module.exports = new MoviesService()