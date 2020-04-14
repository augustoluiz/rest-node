const moment = require('moment')
const conexao = require('../infraestrutura/conexao')

class AtendimentosModel{
    adiciona(atendimento, res){
        
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        
        //validações
        const clienteEhValido = atendimento.cliente.length >= 5
        const dataEhValida = moment(data).isSameOrAfter(dataCriacao)
        const validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual à data atual',
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: 'O Cliente deve ter pelo menos 5 caracteres'
            }
        ]
        
        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if(existemErros){
            res.status(400).json(erros)
        } else {
            const atendimentoDatado = {...atendimento, dataCriacao, data}
            const sql = `INSERT INTO Atendimentos SET ?`
    
            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if(erro){
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(atendimentoDatado)
                }
            })
        }
    }

    lista(res){
        const sql = `SELECT * FROM  Atendimentos`
        conexao.query(sql, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorID(res, id){
        const sql = `SELECT * from Atendimentos WHERE id = ?`
        conexao.query(sql, id, (erro, resultados) => {
            const atendimento = resultados[0]
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json(atendimento)
            }
        })
    }

    altera(res, id, valores){
        if(valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }
        const sql = `UPDATE Atendimentos SET ? WHERE id = ?`
        conexao.query(sql, [valores, id], (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }
        })
    }

    exclui(res, id){
        const sql = `DELETE FROM Atendimentos WHERE id = ?`
        conexao.query(sql, id, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json({id: id})
            }
        })
    }
}

module.exports = new AtendimentosModel()