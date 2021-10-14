import sql from 'mssql'
import config from "../config";

const { user, password, server, database} = config

const dbsetting = {
    user:user,
    password:password,
    server:server,
    database:database,
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
      }
}


export const getConnetion = async () => {
    try {
        const pool = await sql.connect(dbsetting)
        return(pool)
    } catch (err) {
        console.log("error" + err)
    }
}

export {sql}


