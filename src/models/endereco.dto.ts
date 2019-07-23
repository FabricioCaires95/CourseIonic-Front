import { CidadeDTO } from "./cidade.dto";

export interface EnderecoDTO {
    id: string; 
    street: string; 
    houseNumber: string; 
    zipCode: string;
    city: CidadeDTO;
}