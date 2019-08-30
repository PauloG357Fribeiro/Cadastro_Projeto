import React from 'react'
import './Nav.css'

//Depois mudamos o #
export default props =>
    <aside className="menu-area">
        <nav className= "menu">
            <a href='#/'>
                <i className = "fa fa-home"></i>Início
            </a>
            <a href = '#/user'>
                <i className = "fa fa-user"></i>Usuários
            </a>
            <a href ='#/produtos'>
                <i className = "fa fa-product-hunt"></i>Produtos
            </a>
        </nav>
    </aside>