// Controlleur de mon api Custom

export const customApiController = async (req, res) => {
    //controller        
    try {
        const url = 'https://api.jikan.moe/v4/anime?q=naruto&sfw'    
        const data = await fetch(url)    
        const json = await data.json()
        
        //alter data with a new record of a anime bleach
        const newitem = {
            "dataDeux": {
                "title" : "Bleach",
                "author" : "pierre"
            }
        }

        //je créer un nouvel objet JSON avec les données de data et de newitem
        const newData = {...json, ...newitem}

        //j'envoi le nouvel objet
        res.send(newData)
        
    } catch (error) {
        res.send(error)
    }   
 

}