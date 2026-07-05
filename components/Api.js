export class Api {
    constructor(options){
        this._baseUrl = options;
        this._headers = options;
    }
    getInitialCards(){
        return fetch("https://around-api.pt-br.tripleten-services.com/v1/cards/", 
            {
            headers: {
                authorization: "e61c6696-d0b3-4bf9-8d70-f2eda4e25e18"
                  } 
        })
        .then((res) => {
            if(res.ok){
             return res.json()
            } else {
             return Promise.reject(`Error: ${res.status}`)    
            }
        })     
        .catch((err) => {
            return Promise.reject(`Error: ${err}`) 
        })
    }
    getUserInfo(){
        return fetch("https://around-api.pt-br.tripleten-services.com/v1/users/me",
                {
                    headers:{
                        authorization:"e61c6696-d0b3-4bf9-8d70-f2eda4e25e18",
                    }
                }
        ).then((res) => {
            if(res.ok){
             return res.json()
            } else {
             return Promise.reject(`Error: ${res.status}`)    
            }
        })
        }
    updateUserInfo(newName, newAbout){
        return fetch("https://around-api.pt-br.tripleten-services.com/v1/users/me",
                {
                    method: 'PATCH',
                    headers:{
                        authorization:"e61c6696-d0b3-4bf9-8d70-f2eda4e25e18",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: `${newName}`,
                        about: `${newAbout}`,
                    })
                }
            ).then((res) => {
            if(res.ok){
             return res.json()
            } else {
             return Promise.reject(`Error: ${res.status}`)    
            }
        })
    }
    updateAvatar(newAvatar){
        return fetch("https://around-api.pt-br.tripleten-services.com/v1/users/me/avatar",
            {
                method: 'PATCH',
                headers:{
                        authorization:"e61c6696-d0b3-4bf9-8d70-f2eda4e25e18",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        avatar: `${newAvatar}`
                    })
            }
        ).then((res) => {
            if(res.ok){
             return res.json()
            } else {
             return Promise.reject(`Error: ${res.status}`)    
            }
        })
    }
    newCard({cardName, cardLink}){
        return fetch("https://around-api.pt-br.tripleten-services.com/v1/cards",
                {
                    method:'POST',
                    headers:{
                        authorization:"e61c6696-d0b3-4bf9-8d70-f2eda4e25e18",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: cardName,
                        link: cardLink,
                    })
                }).then((res) => {
            if(res.ok){
             return res.json()
            } else {
             return Promise.reject(`Error: ${res.status}`)    
            }
        })
    }

    deleteCard(cardId){
        return fetch(`https://around-api.pt-br.tripleten-services.com/v1/cards/${cardId}`,
                {
                    method:'DELETE',
                    headers:{
                        authorization:"e61c6696-d0b3-4bf9-8d70-f2eda4e25e18",
                        "Content-Type": "application/json",
                    }
                }).then((res) => {
                    if(res.ok){
             return res.json()
            } else {
             return Promise.reject(`Error: ${res.status}`)    
            }
                })
    }
    putLike(cardId){
        return fetch(`https://around-api.pt-br.tripleten-services.com/v1/cards/${cardId}/likes`,
                {
                    method:'PUT',
                    headers:{
                        authorization:"e61c6696-d0b3-4bf9-8d70-f2eda4e25e18",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        isLiked: true
                    })
                }).then((res) =>{
                    if(res.ok){
                    return res.json()
                    } else {
                    return Promise.reject(`Error: ${res.status}`)    
                    }
                })
    }
    removeLike(cardId){
        return fetch(`https://around-api.pt-br.tripleten-services.com/v1/cards/${cardId}/likes`,
                {
                    method:'DELETE',
                    headers:{
                        authorization:"e61c6696-d0b3-4bf9-8d70-f2eda4e25e18",
                        "Content-Type": "application/json",
                    }
                })
    }
    loadInitialData(){
    return Promise.all([this.getUserInfo(), this.getInitialCards()]).then((res)=>{
        return res;
    })
    }
    

    }

