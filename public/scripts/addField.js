 // procurar o botão
 document.querySelector('#add-time')
 // quando clicar no botao
 .addEventListener('click', cloneField)
 

 // executar uma ação
 function cloneField(){ //criar função cloneField para poder usar acima, como ou sem atributos no ()
 
    // duplicar(cloneNode) os campos.(Que campos?)
    const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true) //node=nó elemento

    //pegar os campos. Que campos?
    const fields = newFieldContainer.querySelectorAll('input') //tras lista com todos input no caso 2   

    //para cada campo, limpar
    fields.forEach(function(field){ //entrar na fields para cada executar função
        //pegar o field do momento e limpa ele
        console.log(field)

        field.value="" //limpar os campos quando duplica
        
    })
    

    // colocar na página: Onde?
    document.querySelector('#schedule-items').appendChild(newFieldContainer)
    }
    

    