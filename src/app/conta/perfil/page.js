'use client'
import { getToken } from '@/app/actions/GetToken';
import { getUser } from '@/app/actions/GetUser';
import { Login } from '@/app/actions/Login';
import { baseUrl } from '@/app/utils/baseUrl';
import { redirect } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

const page = () => {
    const [user,setUser]=useState("")
    const [token,setToken]=useState("")
    const [username,setUsername]=useState("")
    const [password,setPaswword]=useState("")
    const [confirmPassword,setConfirmPaswword]=useState("")
    const [loading,setLoading]=useState(false)
    const [endereco,setEndereco]=useState("")
    const [rua,setRua]=useState("")
    const [numero,setNumero]=useState("")
    const [bairro,setBairro]=useState("")
    const [referencia,setReferencia]=useState("")
    const [complemento,setComplemento]=useState("")
    const [cidade,setCidade]=useState("")
    const [modalEndereco,setMotalEndereco]=useState(false)
    const [carregando,setCarregando]=useState(false)
    const [modalDados,SetOpenModalDados]=useState(false)
    const [erro,setErro]=useState(false)
    const [sucess,setSucess]= useState(false)
    const refMessage= useRef()

    function openModalDados(){
        SetOpenModalDados(true)
        setUsername(user.username)
        setPaswword(user.password)
    }

    async function atualizarDados(e){
        e.preventDefault()
        clearTimeout(refMessage.current)
        if(!username.trim()){
           setErro("seu nome deve ser preenchido 😢")
           refMessage.current = setTimeout(()=>{
            setErro(false)
           },2000)
           return
        }

        if(!password){
            setErro("A Senha deve ser preenchida 😢")
           refMessage.current = setTimeout(()=>{
            setErro(false)
           },2000)
           return
         }

         if(password !== confirmPassword){
            setErro("As senhas devem ser iguais 😢")
           refMessage.current = setTimeout(()=>{
            setErro(false)
           },2000)
           return
         }

        const updatedUser = {username,password}
        const tokenBuscado = await getToken()
        console.log(username,password,confirmPassword)
        try {
            setLoading(true)
            const response = await fetch(`${baseUrl}/users/${user.id}`, {
                next:{
                    revalidate:1
                },
                method:"PUT",
                headers:{
                     "Content-Type":"application/json",
                    "authorization":`Bearer ${tokenBuscado.value}`
                },

                body:JSON.stringify(updatedUser)
            })

            const data = await response.json()
           
            await Login(user.email,password)

            setSucess("Dados atualizados com sucesso 😉")
            refMessage.current = setTimeout(()=>{
                setSucess(false)
            },2000)
          
            setTimeout(()=>{
                window.location.href="/conta/perfil"
            },500)

        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
            setUsername("")
            setPaswword("")
            SetOpenModalDados(false)
        }
    }

   

    function closeModalDados(e){
        if(e.target.id==="modalDados"){
            SetOpenModalDados(false)
        }
    }

    async function buscarUsuario(){
        const user = await getUser()
        setUser(user)
    }


    function openModalEndereco(){
        setMotalEndereco(true)
        setRua(endereco.rua)
        setNumero(endereco.numero)
        setBairro(endereco.bairro)
        setCidade(endereco.cidade)
        setComplemento(endereco.complemento)
        setReferencia(endereco.referencia)
    }

    async function verificaToken(){
        const tokenBuscado = await getToken()
            setToken(tokenBuscado)
            if(!tokenBuscado){
                window.location.href="/cardapio"
            }
    }

    async function openModalCadastro(){
        setMotalEndereco(true)
    }

    async function cadastrarEndereco(e){
        e.preventDefault()
        try {
            if(!rua.trim()||!numero.trim() || !bairro.trim() || !complemento.trim() || !referencia.trim() || !cidade.trim() ){
                setErro("Preencha todos os campos 😢")
                refMessage.current = setTimeout(()=>{
                 setErro(false)
                },2000)
               
                return
            }

            setCarregando(true)
            const tokenBuscado = await getToken()
            const response = await fetch(`${baseUrl}/endereco` ,{
                next:{
                    revalidate:1
                },
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "authorization":`Bearer ${tokenBuscado.value}`
                },body:JSON.stringify({rua,numero,bairro,complemento,referencia,cidade, userRef:user.id})
            })
            setCarregando(false)

            setRua("")
            setNumero("")
            setBairro("")
            setCidade("")
            setComplemento("")
            setReferencia("")
    
            setMotalEndereco(false)

            setTimeout(()=>{
                window.location.href="/conta/perfil"
            },1000)

        } catch (error) {
            console.log(error)
        }
    }


    async function atualizarEndereco(e){
        e.preventDefault()

        try{
            if(!rua.trim()||!numero.trim() || !bairro.trim() || !complemento.trim() || !referencia.trim() || !cidade.trim() ){
                setErro("Preencha todos os campos 😢")
           refMessage.current = setTimeout(()=>{
            setErro(false)
           },2000)
           return
            }
    
        setCarregando(true)
            const tokenBuscado = await getToken()
            const response = await fetch(`${baseUrl}/endereco/${endereco._id}` ,{
                next:{
                    revalidate:1
                },
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                    "authorization":`Bearer ${tokenBuscado.value}`
                },body:JSON.stringify({rua,numero,bairro,complemento,referencia,cidade})
            })

            setSucess( `Endereço atualizado com sucesso 😉`)
            refMessage.current = setTimeout(()=>{
                setSucess(false)
            },2000)

            setCarregando(false)

            setRua("")
        setNumero("")
        setBairro("")
        setCidade("")
        setComplemento("")
        setReferencia("")

        setMotalEndereco(false)

        setTimeout(()=>{
            window.location.href="/conta/perfil"
        },1000)

        }catch(error){
            console.log(error)
        }finally{
            setCarregando(false)
        }
        
    }

  

    async function verificarEndereco(){
        const tokenBuscado = await getToken()
        const response = await fetch(`${baseUrl}/endereco` ,{
            next:{
                revalidate:0
            },
            headers:{
                "Authorization":`Bearer ${tokenBuscado.value}`
            }
            
        })

        const dados = await response.json()

        if(dados.message==="Nenhum endereço cadastrado"){
            setEndereco(false)
        }

      setEndereco(dados)
    }



    useEffect(()=>{
        buscarUsuario()
    },[])

    useEffect(()=>{
        verificaToken()
        verificarEndereco()
    },[])

function closeModalEndereco(e){
    if(e.target.id==="modalEndereco"){
        setMotalEndereco(false)
    }
    
}



  return (
    <div className="p-4 max-w-7xl mx-auto mt-4">

    {erro && <div className='flex inset-0 fixed items-center justify-center bg-black bg-opacity-5 backdrop-blur-sm z-50'>
        <p className='bg-white p-4 border-4 border-b-red-600 anima'>{erro}</p>
    </div>}

    {sucess && <div className='flex inset-0 fixed items-center justify-center bg-black bg-opacity-5 backdrop-blur-sm z-50'>
        <p className='bg-white p-4 border-4 border-b-green-600 anima'>{sucess}</p>
    </div>}

       <div className='h-screen'>
       {user!==null && user && <div className='bg-gray-200 rounded-md '>
       <div className='flex  justify-between items-center w-full max-w-sm p-2'>
       <h1 className='text-2xl font-bold text-gray-600'>Dados de acesso</h1>
       <button className='text-green-600 py-3 rounded-md font-bold' onClick={openModalDados}>Alterar</button>
       </div>
      <div className='mt-2  p-2'>
      <p>Nome: {user.username}</p>
      <p>email : {user.email}</p>
      <p>Senha : *********</p>
      </div>
       </div>}

        { endereco.status===404 && <button className='mt-4 bg-green-600 text-white py-3 px-6 rounded-md' onClick={openModalCadastro}>Cadastrar endereço</button> }

      {endereco.status!==404 && <div className='mt-4 bg-gray-200 p-2 rounded-md'>
        <div className='flex  justify-between items-center max-w-sm '>
      <h1 className='text-2xl font-bold text-gray-600'>Endereço</h1>
      <button className='text-green-600 rounded-md font-bold' onClick={openModalEndereco}>Alterar</button>
      </div>
      <div className='mt-6'>
      <h1>Rua : {endereco.rua} , número: {endereco.numero}</h1>
      <p>Bairro : {endereco.bairro}</p>
      <p>Cidade : {endereco.cidade}</p>
      <p>referência : {endereco.referencia}</p>
      <p>Complemento : {endereco.complemento}</p>
      </div>
      </div>}
       </div>



        {/* inicio modal endereco */}
        {modalEndereco && <div className='bg-black bg-opacity-15 backdrop-blur-sm flex items-center justify-center fixed inset-0' id='modalEndereco' onClick={closeModalEndereco}>
           <div className='max-w-md w-full p-4 bg-white anima'>
           <h1 className='text-center font-bold text-2xl my-4'>{endereco && <span>Editando endereço</span> } {!endereco && <span>Cadastrando endereço</span> }</h1>
           <form >
            <div className='flex justify-between gap-2'>
                <div className='flex flex-col flex-1'>
                <label htmlFor="rua">Rua</label>
                <input type="text" value={rua} onChange={({target})=>setRua(target.value)} className='bg-gray-100 p-2 rounded-md outline-none'/>
                </div>
                <div className='flex flex-col max-w-[100px]'>
                <label htmlFor="numero">Número</label>
                <input type="text" value={numero} onChange={({target})=>setNumero(target.value)} className='bg-gray-100 p-2 rounded-md outline-none'/>
            </div>
            </div>

            <div className='flex flex-col flex-1 mt-4'>
                <label htmlFor="bairro">Bairro</label>
                <input type="text" value={bairro} onChange={({target})=>setBairro(target.value)} className='bg-gray-100 p-2 rounded-md outline-none'/>
                </div>

                <div className='flex flex-col flex-1 mt-4'>
                <label htmlFor="complemento">Complemento</label>
                <input type="text" value={complemento} onChange={({target})=>setComplemento(target.value)} className='bg-gray-100 p-2 rounded-md outline-none'/>
                </div>

                <div className='flex flex-col flex-1 mt-4'>
                <label htmlFor="referencia">Referência</label>
                <input type="text" value={referencia} onChange={({target})=>setReferencia(target.value)} className='bg-gray-100 p-2 rounded-md outline-none'/>
                </div>

                <div className='flex flex-col flex-1 mt-4'>
                <label htmlFor="cidade">Cidade</label>
                <input type="text" value={cidade} onChange={({target})=>setCidade(target.value)} className='bg-gray-100 p-2 rounded-md outline-none'/>
                </div>
                <div className='flex items-center mt-4 justify-between'>
                {endereco.status!==404 && <button className='bg-green-600 rounded-md text-white px-8 py-2 flex items-center justify-center' onClick={atualizarEndereco} disabled={carregando}> {carregando && <div className='flex items-center justify-center bg-green-600 rounded-md w-[66px]'>
                <div className='w-6 animate-spin h-6 rounded-full border-2 border-r-transparent '></div>
                </div>} {!carregando && <span>Atualizar</span>} </button>}
                
                {endereco.status===404 && <button className='bg-green-600 rounded-md text-white px-8 py-2' disabled={carregando} onClick={cadastrarEndereco}>Salvar</button>}
                <button onClick={()=>setMotalEndereco(false)}>← Voltar</button>
                </div>
           </form>
           </div>
        </div>}
        {/* final modal endereco */}

         {/* inicio modal dados */}
         {modalDados && <div className='bg-black bg-opacity-15 backdrop-blur-sm flex items-center justify-center fixed inset-0 p-4' id='modalDados' onClick={closeModalDados}>
            <div className='bg-white w-full max-w-md rounded-md shadow-sm anima'>
<h1 className='text-center text-xl font-medium my-8'>Editando Seus Dados</h1>
<form className='flex flex-col gap-2 p-4' onSubmit={atualizarDados}>
    <div className='flex flex-col mt-2'>
    <label htmlFor="username">Nome</label>
    <input type="text" placeholder='Seu nome' className='bg-gray-100 p-3 rounded-md outline-none' value={username} onChange={({target})=>setUsername(target.value)}/>
    </div>
    <div className='flex flex-col mt-2'>
    <label htmlFor="password">Senha</label>
    <input type="password" placeholder='********' className='bg-gray-100 p-3 rounded-md outline-none' value={password} onChange={({target})=>setPaswword(target.value)}/>
    </div>
    <div className='flex flex-col mt-2'>
    <label htmlFor="password">Confirme sua senha</label>
    <input type="password" placeholder='********' className='bg-gray-100 p-3 rounded-md outline-none' value={confirmPassword} onChange={({target})=>setConfirmPaswword(target.value)}/>
    </div>
    <div className='flex justify-between items-center mt-4'>
        <button className='bg-green-600 text-white py-3 px-8 rounded-md flex items-center justify-center' disabled={loading}> {loading && <div className='flex items-center justify-center bg-green-600 rounded-md w-[66px]'>
                <div className='w-6 animate-spin h-6 rounded-full border-2 border-r-transparent '></div>
                </div>} {!loading && <span>Atualizar</span> } </button>
        <button onClick={()=>SetOpenModalDados(false)}>← Voltar</button>
    </div>
</form>
            </div>
         </div>}
         {/* final modal dados */}

    </div>
  );
};

export default page;