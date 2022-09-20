import { ApiResult } from './../types/user.d';
export function makeApiResponse(code: number, data?: any, msg?: string): ApiResult{
    let res: ApiResult = {
      code: code,
    };
    if(msg) res.msg = msg;


    /*     if(data){
      if(data.hasOwnProperty('tokens')){
        let { tokens, ...payload } = data;
        res.data = payload;
        res.tokens = tokens;
        return res;
      }
      else res.data = data;
    } */
    return res;
  }
  