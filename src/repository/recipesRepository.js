import axios from 'axios'
import qs from 'query-string'

const RecipesRepository = {

    fetchRecipesPaged: (page, size, token) => {

        // console.log("-----------")
        // console.log(token);

        return axios.get("/recipes", {
            headers: {
                'page': page, 'page-size': size
                // 'Content-Type': 'application/json',
                // 'Authorization': token
            }
        })
    },

    getRecipesByTerm: (term, page, size) => {

        return axios.get("/recipes/title", {
            headers: {
                'title': term, 'page': page, 'size': size
            }
        })

    },

    logIn: (username, password) => {

        let info = {
            username: username,
            password: password
        };

        return axios.post("/recipes/authenticate", info, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

    },

    deleteRecipe: (recipeId, token) => {
        var finalToken = 'Bearer ' + token;
        return axios.delete(`/recipes/delete/${recipeId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': finalToken
            }
        })
    },

    createRecipe: (formData) => {
        return axios.post("/recipes/add", formData);
    },

    updateRecipe: (formData) => {

        // const finalData = qs.stringify(formData);
        return axios.patch("/recipes/update", formData);

    }


};

export default RecipesRepository;