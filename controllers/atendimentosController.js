const AtendimentosModel = require('../models/atendimentosModel')

module.exports= (app) => {
    app.get('/atendimentos', (req, res) => {
        AtendimentosModel.lista(res)
    })

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        AtendimentosModel.buscaPorID(res, id)
    })
    
    app.post('/atendimentos', (req, res) => {
        let atendimento = req.body
        AtendimentosModel.adiciona(atendimento, res)
    })

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body
        AtendimentosModel.altera(res, id, valores)
    })

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        AtendimentosModel.exclui(res, id)
    })
}

