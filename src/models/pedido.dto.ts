import { RefDTO } from "./ref.dto";
import { PagamentoDTO } from "./pagamento.dto";
import { ItemPedidoDTO } from "./itemPedido.dto";

export interface PedidoDTO {
    client: RefDTO;
    adress: RefDTO;
    payment: PagamentoDTO;
    itens: ItemPedidoDTO[];
}