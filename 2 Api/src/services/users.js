import { getConnetion, sql } from "../connection/connection"

export const showAllUsers = async () => {
    try{
        let pool = await getConnetion()
        let result = await pool.request().query("SELECT * FROM Users")
        return({status:200, response:result.recordset})
    } catch(error){
        return({status:500, response:"Error Interno del Servidor"}) 
    }
}


export const createNewUser = async (body) => {
    const {firstName, lastName, email, professionId} = body

    if(!firstName || !lastName || !email || !professionId){
        return({status:400, response:"Campos Incompletos"})
    }

    try{
        let pool = await getConnetion()
        await pool
            .request()
            .input("firstName", sql.VarChar(40), firstName)
            .input("lastName", sql.VarChar(40), lastName)
            .input("email", sql.VarChar(50), email)
            .input("professionId", sql.Int, professionId)
            .query("INSERT INTO Users (firstName, lastName, email, professionId) VALUES (@firstName, @lastName, @email, @professionId)")
        return({status:200, response:body})
    }catch(error){
        return({status:500, response:"Error Interno del Servidor"}) 
    }  
}


export const findUserbyID = async (params) => {
    const {id} = params
    try{
        let pool = await getConnetion()
        let result = await pool
            .request()
            .input("id", id)
            .query("SELECT * FROM Users WHERE Id = @id")
            if(result.recordset.length === 0){
                return({status:400, response:`El usuario de Id:${id} no se encuentra registrado`})
            }
        return({status:200, response:result.recordset[0]})
    }catch(error){
        return({status:500, response:error}) 
    }
}


export const deleteUserbyID = async (params) => {
    const {id} = params
    try{

        await removeEmployeeFromProject(params)
        let pool = await getConnetion()
        let result = await pool
            .request()
            .input("userId", id)
            .query("DELETE FROM [Users] WHERE [id] = @userId")
            if(result.rowsAffected[0] === 0){
                return({status:200, response:`El usuario de Id:${id} no se encuentra registrado`})
            }else{
                return({status:200, response:"El usuario fue removido con éxito"})
            }
    }catch(error){
        return({status:500, response:error}) 
    }
}


export const removeEmployeeFromProject  = async (params) => {
    const {id} = params
    try{
        let pool = await getConnetion()
        let result = await pool
            .request()
            .input("userId", id)
            .query("DELETE FROM [AssignedProjects] WHERE [userId] = @userId")
            if(result.rowsAffected[0] === 0){
                return({status:204, response:"Este usuario no se encuentra asociado a un Proyecto"})
            }else{
                return({status:200, response:`El usuario fue removido de ${result.rowsAffected[0]} Proyectos`})
            }
    }catch(error){
        return({status:500, response:error}) 
    }
}


export const updateUserbyID  = async (req) => {
    const {body, params} = req
    const {firstName, lastName, email, professionId} = body
    const {id} = params

    try{
        let dataUser = await findUserbyID(params)
        if(dataUser.status === 400){
            return(dataUser)
        }
        let pool = await getConnetion()
        // console.log(dataUser.response)
        await pool
            .request()
            .input("firstName", sql.VarChar(40), firstName || dataUser.response.firstName)
            .input("lastName", sql.VarChar(40), lastName || dataUser.response.lastName)
            .input("professionId", sql.Int, professionId  || dataUser.response.professionId)
            .input("email", sql.VarChar(50), email  || dataUser.response.email)
            .input("IdUser", id)
            .query("UPDATE [Users] SET [firstName] = @firstName, [lastName] = @lastName, [professionId] = @professionId, [email] = @email WHERE [id] = @IdUser")
        return(await findUserbyID(params))
    }catch(error){
        return({status:500, response:"Error Interno del Servidor"}) 
    }  
}