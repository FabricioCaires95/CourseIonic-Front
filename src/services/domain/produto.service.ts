import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class ProdutoService {

    constructor(public http: HttpClient){

    }

    findByCategoria(categoria_id: string){
        console.log(categoria_id);
        return this.http.get(`${API_CONFIG.baseUrl}/product/?categories=${categoria_id}`);
    }
}