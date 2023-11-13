const inp = document.querySelector('#todo')
const btn  = document.getElementById('btn')
const wrapper = document.querySelector('#wrapper')


// todos
// todo - isCompleted

function todoGuncelle(){
    let kayıtlılar = localStorage.getItem('todos')
    if(kayıtlılar){
        let objeTodos = JSON.parse(kayıtlılar)
        for(let i of objeTodos){
            todoKaydet(i)
        }
    }else{
        localStorage.setItem('todos','[]')
    }
}
todoGuncelle()


btn.addEventListener('click',yeniKayıt)
inp.addEventListener('keyup',function klavye(e){
    if(e.keyCode == 13){
        yeniKayıt()
    }   
})

function yeniKayıt(){
    let newTodo = {
        'todo':inp.value,
        'isComleted':false
    }
    let kayıtlıTodos = JSON.parse(localStorage.getItem('todos'))
    kayıtlıTodos.push(newTodo)
    localStorage.setItem('todos',JSON.stringify(kayıtlıTodos))
    todoKaydet(newTodo)
}


function todoKaydet(i){
    let value = i.todo
    if(value.trim() != ''){
        let div = document.createElement('div')
        div.classList.add('p-2', 'rounded-2','my-2')
    
        let p = document.createElement('p')
        p.textContent = value
        if(i.isComleted == true){
            p.classList.add('text-decoration-line-through','text-white')
            div.classList.add('bg-success')
        }
        
        let iconDone = document.createElement('span')
        iconDone.className = "material-symbols-outlined"
        iconDone.textContent = 'done'
    
        iconDone.addEventListener('click',function done(){
            let kapsayıcı = this.parentElement.parentElement
            let pEtiketi = this.parentElement.parentElement.children[0]
            console.log(pEtiketi)
            kapsayıcı.classList.toggle('bg-success')
            pEtiketi.classList.toggle('text-decoration-line-through')
            pEtiketi.classList.toggle('text-white')

            let kayıtlıTodos = JSON.parse(localStorage.getItem('todos'))
          
            for(let i of kayıtlıTodos){
                if (i.todo == pEtiketi.textContent){
                    i.isComleted = !i.isComleted  
                }
            }
            localStorage.setItem('todos',JSON.stringify(kayıtlıTodos))

        })
    
        let iconDelete = document.createElement('span')
        iconDelete.className = "material-symbols-outlined"
        iconDelete.textContent = 'delete'
    
        iconDelete.addEventListener('click',function del(){
            
            let p  = this.parentElement.parentElement.children[0]
            let silinecek = p.textContent
            let kayıtlıTodos = JSON.parse(localStorage.getItem('todos'))
            let yeniKayıt = []
            for(let i of kayıtlıTodos){
                if(i.todo != silinecek){
                    yeniKayıt.push(i)
                }
            }
            
            localStorage.setItem('todos',JSON.stringify(yeniKayıt))

            let anlikSil = this.parentElement.parentElement
            anlikSil.remove()  
        })
    
        let divIcon = document.createElement('div')
        divIcon.appendChild(iconDone)
        divIcon.appendChild(iconDelete)
    
        div.appendChild(p)
        div.appendChild(divIcon)
        wrapper.appendChild(div)
        div.style.display = 'flex'
        div.style.justifyContent = 'space-between'
    
        todo.value = ''
    }
}






// onclik eventi 3 farklı şekilde dinlenebilir.
// btn.addEventListener('click',todoKaydet)

// btn.onclick = todoKaydet
