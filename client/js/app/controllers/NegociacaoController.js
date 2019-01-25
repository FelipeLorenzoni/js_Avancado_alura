class NegociacaoController {

    constructor(){
        
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        
        //Proxy! =)
        let self = this;
        this._listaNegociacoes = new Proxy(new _listaNegociacoes(), {
            get(target, prop, receiver){
                if(['adiciona','esvazia'].includes(prop) && typeof(target[prop]) == typeof(Function)){
                    return function(){

                    console.log(`${prop} interceptado`);
                    Reflect.apply(target[prop], target, arguments)
                    self._negociacoesView.update(target);
                    }
                } 
             
                return Reflect.get(target, prop, receiver);
            } 
        });

        this._negociacoesView = new NegociacoesView($('#negociacoesView'));

        this._negociacoesView.update(this._listaNegociacoes);
        
        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagemView.update(this._mensagem);
    }

    apaga(){
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = 'Negociaçoes apagadas com sucesso!';
        this._mensagemView.update(this._mensagem);
    }
    adiciona(event){
        event.preventDefault();
    
        this._listaNegociacoes.adiciona(this._criaNegociacao());

        this._mensagem.texto = 'Negociação adicionada com sucesso';
        this._mensagemView.update(this._mensagem);

        this._limpaFormulario();
        
    }
    _criaNegociacao(){
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }

    _limpaFormulario(){
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }
    
}