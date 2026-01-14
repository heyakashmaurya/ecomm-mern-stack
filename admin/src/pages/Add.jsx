import React, { useContext, useState } from 'react'
import Nav from '../components/Nav'
import Sidebar from '../components/Sidebar'
import uploadimage from "../assets/uploadimage.png"
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../components/Loading'


const Add = () => {
  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState("Men")
  const [price, setPrice] = useState("")
  const [subCategory, setSubCategory] = useState('TopWear')
  const [bestseller, setbestSeller] = useState(false)
  const [sizes, setSizes] = useState([])
  const [loading, setLoading] = useState(false)
  const {serverUrl} = useContext(authDataContext)

  const handleAddProduct = async (e) => {
    
    setLoading(true)
        e.preventDefault()
        try {
          let formdata = new FormData()
          formdata.append("name", name)
          formdata.append("description", description)
          formdata.append("category", category)
          formdata.append("subcategory", subCategory)
          formdata.append("price", price)
          formdata.append("sizes", JSON.stringify(sizes))
          formdata.append("bestseller", bestseller)
          formdata.append("image1", image1)
          formdata.append("image2", image2)
          formdata.append("image3", image3)
          formdata.append("image4", image4)

          let result = await axios.post(serverUrl + "/api/product/addproduct", formdata, {withCredentials:true, headers: { "Content-Type": "multipart/form-data" }})
          console.log(result.data)
          setLoading(false)

          if(result.data){
            setName("")
            setDescription(false)
            setImage1(null)
            setImage2(null)
            setImage3(null)
            setImage4(null)
            setPrice("")
            setbestSeller(false)
            setCategory("Men")
            setSubCategory("TopWear")
          }

          toast.success("Add Product Successfully")
          
        } catch (error) {
          console.log(error)
              toast.error("Add Product Failed")
    setLoading(false)
        }finally{
          setLoading(false)
        }
  }




  return (
    <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#32393b] to-[#2d1818]  text-white overflow-x-hidden relative'>
       <Nav/>
       <Sidebar/>


       <div className='w-[75%] md:w-[82%] h-[100%] flex items-center justify-start overflow-x-hidden pt-15 absolute right-0 bottom-[5%] '>


        <form  onSubmit={handleAddProduct} className='w-[100%] md:w-[90%] h-[100%] mt-[70px] flex flex-col gap-[30px] py-[60px] md:px-[60px]'>
            <div className='w-[400px] h-[50px] text-[25px] md:text-[40px] text-white font-semibold'>Add Product Page</div>

            <div className='w-[80%] h-[130px] flex items-start justify-center flex-col mt-[20px] gap-[10px] '>
              <p className='text-20px] md:text-[25px] font-semibold'>Upload Image</p>
              <div className='w-[100vw] h-[100vh] flex items-center justify-start '>

                <label htmlFor="image1" className='size-[65px] md:size-[100px] cursor-pointer hover:border-[#46d1f7] '>
                  <img src={!image1 ? uploadimage : URL.createObjectURL(image1)} alt="" className='size-[80%]  shadow-2xl hover:border-[#82ff84] border-[1px]'/>
                  <input type="file"  id='image1' className='hidden' onChange={(e) => setImage1(e.target.files[0])} required/>
                </label>

                <label htmlFor="image2" className='size-[65px] md:size-[100px] cursor-pointer hover:border-[#46d1f7] '>
                  <img src={!image2 ? uploadimage : URL.createObjectURL(image2)} alt="" className='size-[80%]  shadow-2xl hover:border-[#82ff84] border-[1px] '/>
                  <input type="file"  id='image2' className='hidden' onChange={(e) => setImage2(e.target.files[0])} required />

                </label>

                <label htmlFor="image3" className='size-[65px] md:size-[100px] cursor-pointer hover:border-[#46d1f7] '>
                  <img src={!image3 ? uploadimage : URL.createObjectURL(image3)} alt="" className='size-[80%]  shadow-2xl hover:border-[#82ff84] border-[1px]'/>
                  <input type="file"  id='image3' className='hidden' onChange={(e) => setImage3(e.target.files[0])} required/>

                </label>

                <label htmlFor="image4" className='size-[65px] md:size-[100px] cursor-pointer hover:border-[#46d1f7] '>
                  <img src={!image4 ? uploadimage : URL.createObjectURL(image4)} alt="" className='size-[80%]  shadow-2xl hover:border-[#82ff84] border-[1px]'/>
                  <input type="file"  id='image4' className='hidden' onChange={(e) => setImage4(e.target.files[0])} required />

                </label>

              </div>
            </div>

            <div className='w-[80%] h-[100px] flex items-start justify-center flex-col gap-[10px]'>
              <p className='text-[20px] md:text-[25px] font-semibold'>Product Name </p>
              <input type="text" placeholder='Type Here'  className='w-[600px] max-w-[98%] h-[40px] rounded-lg hover:border-[#46d1f7] border-[2px] cursor-pointer bg-slate-600 px-[20px] text-[18px] placeholder:text-[#ffffffc2] ' onChange={(e) => setName(e.target.value)} value={name}  required />
            </div>

          <div className='w-[80%] flex items-start justify-center flex-col gap-[10px]'>
              <p className='text-[20px] md:text-[25px] font-semibold'>Product Description</p>
  
                <textarea
                  placeholder="Type Here"
                  className='w-[600px] max-w-[98%] h-[100px] rounded-lg border-[2px] border-transparent hover:border-[#46d1f7] cursor-pointer bg-slate-600 px-[20px] py-[12px] text-[18px] text-white placeholder:text-[#ffffffc2] resize-none focus:outline-none focus:border-[#46d1f7] transition-all duration-200' onChange={(e) => setDescription(e.target.value)} value={description} required
                ></textarea>
          </div>

        <div className='w-[80%] flex items-center gap-[10px] flex-wrap '>
          <div className='md:w-[30%] w-[100%] flex items-start sm:justify-center flex-col gap-[10px] '>
              <p className='text-[20px] md:text-[25px] font-semibold'>Product Category </p>
              <select name="" id="" className='bg-slate-600  w-[60%] px-[10px] py-[7px] rounded-lg hover:border-[#34d1f7] border-[2px] 'onChange={( e) => setCategory(e.target.value)} required >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
          </div>

           <div className='md:w-[30%] w-[100%] flex items-start sm:justify-center flex-col gap-[10px] '>
              <p className='text-[20px] md:text-[25px] font-semibold'> Sub-Category </p>
              <select name="" id="" className='bg-slate-600  w-[60%] px-[10px] py-[7px] rounded-lg hover:border-[#34d1f7] border-[2px] ' onChange={( e) => setSubCategory(e.target.value)} required >
                <option value="TopWear">TopWear</option>
                <option value="BottomWear">Bottom Wear</option>
                <option value="WinterWear">WinterWear</option>
              </select>
          </div>
        </div>

         <div className='w-[80%] h-[100px] flex items-start justify-center flex-col gap-[10px]'>
              <p className='text-[20px] md:text-[25px] font-semibold'>Product Price </p>
              <input type="number" placeholder='₹2000'  className='w-[600px] max-w-[98%] h-[40px] rounded-lg hover:border-[#46d1f7] border-[2px] cursor-pointer bg-slate-600 px-[20px] text-[18px] placeholder:text-[#ffffffc2] ' onChange={( e) => setPrice(e.target.value)} value={price} required />
          </div>

          <div className='w-[80%] h-[220px] md:h-[100px] flex items-start justify-center flex-col gap-[10px] py-[10px] md:py-[0px] '>
              <p className='text-[20px] md:text-[25px] font-semibold'> Product Size </p>
              <div className=' flex items-center justify-start gap-[15px] flex-wrap  '>
                <div className={`px-[20px] p-[7px] rounded-lg bg-slate-600 text-[18px] hover:border-fuchsia-600 border-[2px] cursor-pointer ${sizes.includes("S") ? "bg-green-800 text-black border-fuchsia-600" : ""}`} onClick={()=>setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"] )}>S</div>

                <div className={`px-[20px] p-[7px] rounded-lg bg-slate-600 text-[18px] hover:border-fuchsia-600 border-[2px] cursor-pointer ${sizes.includes("M") ? "bg-green-800 text-black border-fuchsia-600" : ""}`} onClick={()=>setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"] )}>M</div>

                <div className={`px-[20px] p-[7px] rounded-lg bg-slate-600 text-[18px] hover:border-fuchsia-600 border-[2px] cursor-pointer ${sizes.includes("L") ? "bg-green-800 text-black border-fuchsia-600" : ""}`} onClick={()=>setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"] )}>L</div>

                <div className={`px-[20px] p-[7px] rounded-lg bg-slate-600 text-[18px] hover:border-fuchsia-600 border-[2px] cursor-pointer ${sizes.includes("XL") ? "bg-green-800 text-black border-fuchsia-600" : ""}`} onClick={()=>setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"] )}>XL</div>

                <div className={`px-[20px] p-[7px] rounded-lg bg-slate-600 text-[18px] hover:border-fuchsia-600 border-[2px] cursor-pointer ${sizes.includes("XXL") ? "bg-green-800 text-black border-fuchsia-600" : ""}`} onClick={()=>setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"] )}>XXL</div>

              </div>
          </div>

          <div className='w-[80%] flex items-center justify-start gap-[10px] mt-[20px] '>
            <input type="checkbox" id='checkbox' className='w-[25px] h-[25px] cursor-pointer '  onChange={() => setbestSeller(prev => !prev)}/>
            <label htmlFor="checkbox" className='text-[18px] md:text-[22px] font-semibold '>
                Add to BestSeller
            </label>
          </div>

          <button className='w-[140px] px-[20px] py-[20px] rounded-xl bg-[#d940de] flex items-center justify-center gap-[10px] text-white active:bg-blue-200  active:text-white active:border-[2px] border-white  cursor-pointer' > {loading ? <Loading/> : "Add Product" } </button>

        </form>


       </div>
    </div>
  )
}

export default Add


