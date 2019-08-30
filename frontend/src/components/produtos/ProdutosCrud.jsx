import React, { Component } from "react";
import Main from "../template/Main";
import axios from "axios";

const heardProps = {
  icon: "users text-danger",
  title: "Usuários",
  subtitle: "Cadastro: Incluir, Lista, Alterar e Excluir!"
};

//Localizando nosso banco
const baseUrl = "http://localhost:3002/compra";
//Estado inicial - Quando sobe a aplicação
const inicialState = {
  compra: { NomeProduto: "", Quantidade: "", Valor: "" },
  list: []
};

export default class compra extends Component {
  state = { ...inicialState };

  //Será chamado antes do componente na tela
  //farei uma chamada no backEnd da lista
  componentWillMount() {
    axios(baseUrl).then(resp => {
      this.setState({ list: resp.data });
    });
  }

  clear() {
    this.setState({ compra: inicialState.compra });
  }
  //Para incluir e alterar
  save() {
    const compra = this.state.compra;
    const method = compra.id ? "put" : "post";
    /*Se id for verdadeiro (existe um id, faça um put),
        senao um post */
    const url = compra.id ? `${baseUrl}/${compra.id}` : baseUrl;
    //Se existe um id atualiza a informação senão baseUrl cria mais um id
    axios[method](url, compra).then(resp => {
      //getUpdateLIst será criada
      const list = this.getUpdateList(resp.data);
      this.setState({ compra: inicialState.compra, list });
    });
  }
  //Atualizando a lista
  getUpdateList(compra) {
    //Cria uma nova lista a partir do filter
    //u => cria uma lista a separando o id que passou
    //Unshift coloca esse id na primeira posição do array
    //return list atualiza a linha 35 que atualiza o estado.
    const list = this.state.list.filter(u => u.id !== compra.id);
    list.unshift(compra);
    return list;
  }

  updateField(event) {
    //user será o clone (ou recebe o valor) do estado user
    //clonamos para não alterar o objeto direatamente
    const compra = { ...this.state.compra };
    //seta o que está em input e virá value
    compra[event.target.name] = event.target.value;
    //set insere
    this.setState({ compra });
  }
  //Jsx para renderizar o formulário.
  renderForm() {
    return (
      <div className="form">
        <div className="col-12 col-md-6">
          <div className="form-group">
            <label>Produto</label>
            <input
              type="text"
              className="form-control"
              name="Produto"
              value={this.state.compra.Produto}
              onChange={e => this.updateField(e)}
              placeholder="Digite o nome do Produto"
            />
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="form-group">
            <label>Quantidade</label>
            <input
              type="text"
              className="form-control"
              name="Quantidade"
              value={this.state.compra.Quantidade}
              onChange={e => this.updateField(e)}
              placeholder="Digite a quantidade desejada"
            />
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="form-group">
            <label>Valor</label>
            <input
              type="text"
              className="form-control"
              name="Valor"
              value={this.state.compra.Valor}
              onChange={e => this.updateField(e)}
              placeholder="Digite o valor do produto"
            />
          </div>
        </div>

        <hr />
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <button className="btn btn-primary" onClick={e => this.save(e)}>
              salvar
            </button>
            <button
              className="btn btn-secundary ml-2"
              onClick={e => this.clear(e)}
            >
              cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  //Atualizar o estado do objeto
  load(compra) {
    this.setState({ compra });
  }

  remove(compra) {
    //Deleta na base então repasa a lista atualizando
    axios.delete(`${baseUrl}/${compra.id}`).then(resp => {
      const list = this.state.list.filter(u => u !== compra);
      this.setState({ list });
    });
  }

  renderTable() {
    return (
      <table className="table mt-4">
        <thead>
          <th>ID</th>
          <th>Produto</th>
          <th>Quantidade</th>
          <th>Valor</th>
          <th>Ações</th>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  }
  renderRows() {
    return this.state.list.map(compra => {
      return (
        <tr key={compra.id}>
          <td>{compra.id}</td>
          <td>{compra.Produto}</td>
          <td>{compra.Quantidade}</td>
          <td>{compra.Valor}</td>
          <td>
            <button className="btn btn=warning">
              <i className="fa fa-pencil" onClick={() => this.load(compra)} />
            </button>
            <button className="btn btn-danger ml-2">
              <i className="fa fa-trash" onClick={() => this.remove(compra)} />
            </button>
          </td>
        </tr>
      );
    });
  }
//copyright: Paulo Gabriel;
  render() {
    return (
      <Main {...heardProps}>
        {this.renderForm()}
        {this.renderTable()}
      </Main>
    );
  }
}
