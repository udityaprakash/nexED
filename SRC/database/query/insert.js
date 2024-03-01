var query = {
    insert_user: (userid,username,profile_url,email) => {
        return (`Insert into customer (user_id,username,profile_url,email) values($1,$2,$3,$4)`,[userid,username,profile_url,email])  
    }
}

module.exports = {query};