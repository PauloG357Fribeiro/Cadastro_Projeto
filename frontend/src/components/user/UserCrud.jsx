import React, { Component } from 'react'
import Main from '../template/Main'
import axios from 'axios'

const heardProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro: Incluir, Lista, Alterar e Excluir!'
}

//Localizando nosso banco
const baseUrl = "localhost:3001/user"
//Estado inicial - Quando sobe a aplicação
const inicialState = {
    user: {name: '', email: ''},
    list: []
}

export default class UserCrud extends Component {
    state = { ...inicialState}

    clear(){
        this.setState({ user: inicialState.user})
    }
//Para incluir e alterar
    save(){
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        /*Se id for verdadeiro (existe um id, faça um put),
        senão um post */
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
    //Se existe um id atualiza a informação senão baseUrl cria mais um id
    axios[method] (url, user)
    .then(resp => {//getUpdateList será criada
        const list = this.getUpdateList(resp.data)
        this.setState({ user: inicialState.user, list })
        })
    }

    getUpdateList(user){
        //Cria uma nova lista a partir do filter
        //u => cria uma lista a separando o id que passou
        //Unshift coloca esse id na primeira posição do array
        //return list atualiza a linha 35 que atualiza o estado.
        const list = this.state.list.filter(u => u.id !== user.id)
        list.unshift(user)
        return list
    }

    updateField(event){
        //user será o cloe  (ou recebe o valor) do estado user
        //clonamos para não alterar o objeto diretamente
        const user ={ ...this.state.user }
        //seta o que está em impute e virá value
        user[event.target.name] = event.target.value
        //set insere
        this.setState({ user })
    }
    //Jsx para renderizar o formulário.
        renderForm(){
            return(
                <div className="form">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control"
                            name="name"
                            value={this.state.user.name}
                            onChange={e => this.updateField(e)}
                            placeholder="Nome = "></input> 
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control"
                            name="name"
                            value={this.state.user.name}
                            onChange={e => this.updateField(e)}
                            placeholder="Nome = "></input> 
                        </div>
                    </div>
                </div>
            )
        }
    render(){
        return(
            <Main {...heardProps}>
                Teste de cadastro
            </Main>
        )
    }
}