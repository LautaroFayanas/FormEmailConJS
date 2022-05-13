
// Variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');

// Variables para campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

//Scope de email
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


eventListener()


//Funciones

function eventListener(){
    //Cuando arranca la app
    document.addEventListener('DOMContentLoaded', iniciarApp);

    //Campos del formulario
    email.addEventListener('blur', validarFormulario)       //Blur = desenfoque. (Cuando salimos del form)
    asunto.addEventListener('blur', validarFormulario)
    mensaje.addEventListener('blur', validarFormulario)

    //Reset BTN
    btnReset.addEventListener('click',resetearForm);

    //Enviar email
    formulario.addEventListener('submit', enviarEmail);

}

function iniciarApp(){
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')   //Estilos Tailwind
}

//Validar el form
function validarFormulario(e){

   if(e.target.value.length > 0 ){  

            const error = document.querySelector('p.error');
            if(error){
                error.remove();
            }

        e.target.classList.remove('border','border-red-500');
        e.target.classList.add('border','border-green-500');
   }else{
        e.target.classList.remove('border','border-green-500');
        e.target.classList.add('border','border-red-500')   
        mostrarError('Todos los campos son obligatorios');
   }



   if(e.target.type === 'email'){
        if(er.test(e.target.value)){
            const error = document.querySelector('p.error');
            if(error){
                error.remove();
            }
            e.target.classList.remove('border','border-red-500');
            e.target.classList.add('border','border-green-500');
        }else{
            e.target.classList.remove('border','border-green-500');
            e.target.classList.add('border','border-red-500')  
            mostrarError('Email no valido')
        }
   }

   if(er.test(email.value) !== '' && asunto.value !== '' && mensaje.value !== ''){
    btnEnviar.disabled = false;
    btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
   }

}


function mostrarError(mensaje){
        const mensajeError = document.createElement('p');
        mensajeError.textContent = mensaje;
        mensajeError.classList.add('border','border-red-500','background-red-500','text-red-500','p-5','mt-5','text-center','error')
        
        //Si tengo una clase con el nombre error , entonces no quiero que se ejecute mas el mensaje.
        //QuerySelectorAll nos retorna una coleccion de elementos y tenemos acceso a .length
        const errores = document.querySelectorAll('.error');
            if(errores.length === 0){
                formulario.appendChild(mensajeError)
            }
}

// Enviar email
function enviarEmail(e){
    e.preventDefault();
    
    //Mostrar spinner escondido con css
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    setTimeout(() => {
        spinner.style.display= 'none';
    
        setTimeout(() => {
            
            resetearForm();
            parrafo.remove();
        }, 2000);
        

        //Mostrar mensaje
        const parrafo = document.createElement('p');
        parrafo.textContent = 'Realizado con existo';
        parrafo.classList.add('text-center','my-10','p-2','bg-green-500','border-green-500','text-white');

        // Inserto el parrafo antes del spinner
        formulario.insertBefore(parrafo,spinner);
        

    }, 3000);
    
}


//Funcion para resetear el formulario
function resetearForm(){
    formulario.reset();
    iniciarApp();
}



/* 
    LOS ESPINNER SON TOMADOS DE LA WEB ....  SPINKIT - TOBIASAHLIN
*/