import { selectClasses } from '@mui/material';
import React, { useState } from 'react'
import { FaFileWord } from "react-icons/fa";
import axios from "axios"
function Home() {
  const [choosenFile,setChoosenFile]=useState(null);
  const [convert,setConvert]=useState("");
  const [downloadError,setdownloadError]=useState("");
  console.log(choosenFile);
  const handleFileChange=(e)=>{
    // console.log(e.target.files[0]);
    setChoosenFile(e.target.files[0]);
    console.log(choosenFile);
  }
  const handleSubmit=async(event)=>{
    event.preventDefault()
    if(!choosenFile){
      setConvert("Please Select a File");
      return;
    }
    const formData=new FormData();
    formData.append("file",choosenFile)
    try {
      const response= await axios.post("http://localhost:3000/convertFile",formData,{
        responseType:"blob",
      });
      const url=window.URL.createObjectURL(new Blob([response.data]))
      console.log(url)
      const link=document.createElement("a");
      console.log(link)
      link.href=url;
      console.log(link)
      link.setAttribute("download",choosenFile.name.replace(/\.[^/.]+$/,"")+".pdf")
      console.log(link)
      document.body.appendChild(link)
      console.log(link)
      link.click()
      link.parentNode.removeChild(link)
      setChoosenFile(null)
      setdownloadError("")
      setConvert("File Converted SuccessFully")
    } catch (error) {
      console.log(error);
      if(error.response&&error.response.status==400){
      setdownloadError("Error Occur ",error.response.data.message);
      }
    }

  }
  return (
    <>
      <div className='max-w-screen-2xl mt-2 mx-auto container px-6 md:px-40 '>
        <div className='flex h-screen items-center justify-center'>
            <div className='border-2 rounded-lg shadow-lg border-dashed px-4 py-2 md:px-8 md:py-6 border-indigo-500'>
                <h1 className='text-3xl font-bold text-center mb-4'>Word to PDF Converter</h1>
                <p className='text-sm text-cwenter mb-5'>Easily Convert Word Document to PDF Without installing any Software</p>
            
            <div className='flex flex-col items-center space-y-4'>
                <input className='hidden' id='FileInput' onChange={handleFileChange} type="file" accept='.doc, .docx' />
                <label htmlFor="FileInput"className='w-full flex items-center justify-center px-4 py-6 bg-gray-100 text-gray-700 rounded-lg cursor-pointer border-blue-300 hover:bg-blue-700  duration-300 hover:text-white'><FaFileWord />
                <span className=' text-3xl mr-2 ml-2 font-semibold'>{choosenFile?choosenFile.name:"Choose File"}</span>
                </label>
                <button onClick={handleSubmit}disabled={!choosenFile} className='text-white disabled:bg-slate-400 disabled:pointer-events-none bg-blue-500 hover:bg-blue-600 duration-700 font-bold px-4 py-2 rounded-lg'>Convert File</button>
                {convert&&(<div className='text-green-500 text-center  '>{convert}</div>)}
                {downloadError&&(<div className='text-red-500 text-center  '>{downloadError}</div>)}
            </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Home
