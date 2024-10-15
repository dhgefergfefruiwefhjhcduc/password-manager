
import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {
  let t = true
  const ref = useRef()
  const passref = useRef()
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordarray, setpasswordarray] = useState([])
  useEffect(() => {
    let passwords = localStorage.getItem("password")
    if (passwords) {
      setpasswordarray(JSON.parse(passwords))
    }


  }, [])

  const showpassword = () => {
    if (t) {
      passref.current.type = "text"
      ref.current.src = "icons/slasheye.svg"
      t = false
    }
    else {
      passref.current.type = "password"
      ref.current.src = "icons/eye.svg"
      t = true
    }
  }
  const savepassword = () => {
    console.log(form)
    setpasswordarray([...passwordarray, {...form,id:uuidv4()}])
    localStorage.setItem("password", JSON.stringify([...passwordarray, {...form,id:uuidv4()}]))
    console.log([...passwordarray, form])
    toast('Password Saved!', {
      position: "bottom-right",
      theme: "dark"
      });
      setform({site:"",username:"",password:""})


  }
  const handelchange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value }
    )
  }
  const deletepassword=(id) => {
    let c=confirm("Do you really want to delete the password")
    if(c){
    setpasswordarray(passwordarray.filter(item => 
      item.id!==id
    
    
    ))
  }
    localStorage.setItem("password", JSON.stringify(passwordarray.filter(item => 
      item.id!==id
    )))
    toast('Password Deleted!', {
      position: "bottom-right",
      theme: "dark"
      });
  }
  const editpassword=(id) => {
    setform(passwordarray.filter(i=>i.id===id)[0])
    setpasswordarray(passwordarray.filter(item => 
      item.id!==id
    
    
    ))
    
  }
  



  return (

    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {/* Same as */}
      
  
      <div className='w-full h-full  justify-center items-center flex flex-col mt-20'>
        <div className='flex  flex-col items-center'>
          <div className='flex font-bold text-xl'>
            <p className='text-green-600 text-2xl'>&lt;</p>
            <p className='text-black text-2xl'>Pass</p>
            <p className='text-green-600 text-2xl'>Op/&gt;</p>
          </div>
          <p>Your own Password Manager</p>
        </div>
        <div className='te mt-10'>
          <input name="site" value={form.site} onChange={handelchange} type="text" className=' border border-green-600 rounded-full w-[43vw] p-2' placeholder='Enter website URL' />
        </div>
        <div className='te ui flex items-center'>
          <input name="username" value={form.username} onChange={handelchange} type="text" className='border border-green-600 m-6 rounded-full w-[20vw] p-2' placeholder='Enter Username ' />
          <div className='relative'>
            <input ref={passref} name="password" value={form.password} onChange={handelchange} type="password" className='border border-green-600 m-6 rounded-full w-[20vw] p-2' placeholder='Enter Password' />
            <span onClick={showpassword} className='absolute right-[35px] top-[37px]'><img ref={ref} src="icons/eye.svg" className='h-[15px] cursor-pointer'></img></span>
          </div>

        </div>
        <div>
          <button onClick={savepassword} className='font-medium flex justify-center items-center h-14 w-42 bg-green-600 rounded-full p-2 hover:bg-white border-2  hover:border-black'>
            <lord-icon
              src="https://cdn.lordicon.com/sbnjyzil.json"
              trigger="hover"
              stroke="bold"
              colors="primary:#121331,secondary:#000000">

            </lord-icon>
            Save Password
          </button>
        </div>
        <div className='mt-20 w-full flex flex-col items-center'>

          <h1 className='mb-10 font-bold text-2xl'>Your passwords</h1>
          {passwordarray.length == 0 && <div>No Password</div>}
          {passwordarray.length != 0 &&
            <table className="table-auto w-[92vw] rounded-xl overflow-hidden mb-5 tab">
              <thead className='bg-green-600 ' >
                <tr >
                  <th className='w-1/3'>Site</th>
                  <th className='w-1/4'>Username</th>
                  <th className='w-1/3'>Password</th>
                  <th className='w-1/5'>Actions</th>
                </tr>
              </thead>
              <tbody className='bg-green-200'>
                {passwordarray.map((item, index) => {

                  return <tr key={index} >
                    <td className='text-center py-2'>
                      <a href={item.site} target='_blank'>{item.site}</a>

                    </td>
                    <td className='text-center py-2 '>
                      <a href={item.username} target='_blank'>{item.username}</a>

                    </td>
                    <td className='text-center py-2 '>
                      <a href={item.password} target='_blank'>{item.password}</a>

                    </td>
                    <td className='text-center py-2 flex justify-center'>
                    <div onClick={() => {
                      editpassword(item.id)
                    }
                    }   className='m-2 cursor-pointer'>
                    <lord-icon
                    src="https://cdn.lordicon.com/exymduqj.json"
                    trigger="hover"
                    stroke="bold"
                    style={{"width":"20px","height":"20px"}}
                    >
                    </lord-icon></div>
                    <div onClick={() => {
                      deletepassword(item.id)
                    }
                    } className='m-2 cursor-pointer'>
                    <lord-icon
                    src="https://cdn.lordicon.com/hwjcdycb.json"
                    trigger="hover"
                    stroke="bold"
                    style={{"width":"20px","height":"20px"}}>
                    </lord-icon></div>
                    </td>

                  </tr>
                }
                )}

              </tbody>
            </table>}

        </div>
      </div>
    </>
  )
}

export default Manager