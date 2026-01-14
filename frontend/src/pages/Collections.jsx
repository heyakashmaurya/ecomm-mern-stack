import React, { useContext, useState, useEffect } from 'react'
import { IoIosArrowDropdown } from "react-icons/io";
import { CiCircleChevRight } from "react-icons/ci";
import {shopDataContext} from "../context/ShopContext"
import CollectionCard from '../components/CollectionCard'



const Collections = () => {
  const [showFilter, setShowfilter] = useState(false);

  const {products, search, showSearch} = useContext(shopDataContext);

  let [filterProduct, setFilterProduct] = useState([]);
  let [category, setCategory] = useState([]);
  let [subCategory, setSubCategory] = useState([]);
  let [sortType, setSortType] = useState("popular")

  const applyFilter = () => {
    if (!products) {
      setFilterProduct([]); // Set to empty array if products is not loaded
      return;
    }
    let productCopy =[ ...products]

  if(category.length > 0 || subCategory.length > 0 ){
    productCopy = productCopy.filter(item => {
      const categoryMatch = category.length > 0 ? category.includes(item.category) : true;
      const subCategoryMatch = subCategory.length > 0 ? subCategory.includes(item.subcategory) : true;
      return categoryMatch && subCategoryMatch
    })
  }
    // apply sorting
    if(sortType === 'low-high'){
      productCopy.sort((a,b) => a.price - b.price)
    } else if(sortType === 'high-low'){
      productCopy.sort((a,b) => b.price - a.price)
    }

    if(search && search.trim() !== "" && showSearch){
      productCopy = productCopy.filter(p => p.name.toLowerCase().includes(search.toLowerCase().trim()))
    }

    setFilterProduct(productCopy)
  }

  useEffect(() => {
            if(products){
          applyFilter();
        }else{
          setFilterProduct([]);
          
        }

    }, [category, subCategory, products, sortType, search]); // Dependency array
  
  function toggleCategory(e) {
    setCategory(prev => prev.includes(e.target.value) ? prev.filter(v => v !== e.target.value) : [...prev, e.target.value])
  }
  function toggleSubCategory(e) {
    setSubCategory(prev => prev.includes(e.target.value) ? prev.filter(v => v !== e.target.value) : [...prev, e.target.value])
  }


  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold">Collections</h1>
          <div className="flex items-center gap-3">
            <button
              className="md:hidden inline-flex items-center gap-2 px-3 py-2 bg-white shadow-sm text-sm rounded-md"
              onClick={() => setShowfilter(prev => !prev)}
              aria-expanded={showFilter}
            >
              {showFilter ? <IoIosArrowDropdown /> : <CiCircleChevRight />}
              <span>Filters</span>
            </button>
            <select value={sortType} onChange={(e) => setSortType(e.target.value)} className="block w-full md:inline-block md:w-auto p-2 border rounded bg-white text-sm">
              <option value="popular">Sort: Popular</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-start gap-6">
          <aside className={`${showFilter ? 'block' : 'hidden'} md:block md:w-72 bg-white p-4 rounded-lg shadow-sm`}> 
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Filters</h3>
              <button className="md:hidden text-sm text-gray-500" onClick={() => setShowfilter(false)}>Close</button>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Categories</p>
                <div className="flex flex-col gap-2">
                  {['Men', 'Women', 'Kids'].map(cat => (
                    <label key={cat} className="inline-flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        value={cat}
                        checked={category.includes(cat)}
                        onChange={toggleCategory}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                      <span>{cat}</span>
                    </label>  
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Sub-categories</p>
                <div className="flex flex-col gap-2">
                  {['TopWear', 'BottomWear', 'WinterWear'].map(sub => (
                    <label key={sub} className="inline-flex items-center gap-2 text-sm">
                      <input type="checkbox"
                      value={sub}
                      checked={subCategory.includes(sub)}
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded" 
                      onChange={toggleSubCategory} />
                      <span>{sub}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button className="w-full bg-indigo-600 text-white py-2 rounded-md" onClick={applyFilter}>Apply</button>
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <div className="mb-4">
              <p className="text-sm text-gray-600">Showing <span className="font-medium">{filterProduct.length}</span> results</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {filterProduct.map(p => (
                <CollectionCard key={p._id} product={p} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Collections