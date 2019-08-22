import React from 'react'
import './Main.css'
import Header from './Header'
//Main será nosso executável
export default props =>/*Componente pode retornar múltiplos
elementos. Os fragmentos permitem agrupar uma lista
de filhos sem adicionarnós extras ao DOM. PARA USARMOS O HEADER*/
    <React.Fragment>
        <Header {...props}/>
        <main className = "content container-fluid">
            <div className = "p-33 mt-3">
                {props.children}
            </div>
        </main>
    </React.Fragment>