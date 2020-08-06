//Procura o botao e adiciona o listener chamando a funcao cloneField
document.querySelector("#add-time")
.addEventListener("click",cloneField)


//Clona um campo
function cloneField(){
    //Pega o campo a ser duplicado e usa o cloneNode para retornar o Node requisitado 
    //e o argumento "deep=true" diz que eh para pegar todo seu conteudo tambem.
    const newFieldContainer = document.querySelector(".schedule-item").cloneNode(true)

    //Limpeza dos campos
    const fields = newFieldContainer.querySelectorAll('input')

    //foreach field seta o valor do field para "" (vazio)
    fields.forEach(function(field) {field.value = ""})



    //Append no Node "schedule-items" com o appendChild
    document.querySelector("#schedule-items").appendChild(newFieldContainer)
}
    