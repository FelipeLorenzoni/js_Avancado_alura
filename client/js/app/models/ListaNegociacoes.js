class ListaNegociacoes {

    constructor(){
        this._negociacoes = [];madilha = armadilha;
    }

    adiciona(negociacao){
        this._negociacoes.push(negociacao);
    }

    get negociacoes() {
        return [].concat(this._negociacoes);
    }

    esvazia() {
        this._negociacoes = [];
    }

}