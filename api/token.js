import { TOKEN } from '../utils/constants'
import jwtDecode from 'jwt-decode'

export function setToken(token){
  localStorage.setItem(TOKEN, token)
}

export function getToken(token){
  return localStorage.getItem(TOKEN)
}

export function removeToken(){
  localStorage.removeItem(TOKEN)
}

export function hasExpiredToken(token){
  const tokenDecode = jwtDecode(token)
  if(!tokenDecode?.exp) {
    return true
  } 
  const expireDate = tokenDecode.exp * 1000 //para obtener milisegundos
  const currenDate = new Date().getTime()
  if(currenDate > expireDate){
    return true
  }
  return false
}
