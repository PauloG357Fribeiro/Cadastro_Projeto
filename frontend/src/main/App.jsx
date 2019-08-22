import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

import Logo from '../components/template/Logo'
import Nav from '../components/template/Nav'
//Main, nele já importa o Header
import Main from '../components/template/Main'
import Footer from '../components/template/Footer'

export default props =>
<div className="app">
    <Logo />
    <Nav />
    <Main icon="steam text-danger" title="Among Us"
        subtitle="Jogo disponível na Steam" />
        <div className = 'display-4'>Steam Ltda.</div>
            <hr />
            <p className="mb-0">Criar conta no jogo</p>
    <Footer />
</div>