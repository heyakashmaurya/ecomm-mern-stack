import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { shopDataContext } from '../context/ShopContext'

const CollectionCard = ({ product }) => {
	const { currency } = useContext(shopDataContext)
	const { _id, name, price, image1, description } = product
	const navigate = useNavigate();

	return (
		<article className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-transform duration-200 hover:-translate-y-1">
			{/* Image */}
			<div className="relative w-full h-52 sm:h-56 md:h-48 lg:h-52 bg-gray-100" onClick={() => {navigate(`/productdetails/${_id}`)}}>
				<img src={image1} alt={name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />

				<div className="absolute top-3 left-3 bg-rose-600 text-white text-xs px-2 py-1 rounded-md font-medium">Limited</div>
				<div className="absolute top-3 right-3 bg-indigo-600 text-white text-sm px-2 py-1 rounded-md font-semibold">{currency} {price}</div>

				<div className="absolute inset-0 flex items-end justify-center p-3 pointer-events-none">
					<div className="w-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-auto flex gap-2 justify-center">
						<Link to={`/productdetails/${_id}`} className="bg-white text-sm text-gray-800 px-3 py-1 rounded-md shadow-sm">View</Link>
						<button className="bg-rose-600 text-white text-sm px-3 py-1 rounded-md shadow-sm">Add</button>
					</div>
				</div>
			</div>

			{/* Content */}
			<div className="p-3 border-t">
				<Link to={`/productdetails/${_id}`} className="block">
					<h3 className="text-sm font-semibold text-gray-900 leading-tight">{name}</h3>
					<p className="text-sm text-gray-500 mt-1 max-h-12 overflow-hidden">{description || 'Premium product'}</p>
				</Link>

				{/* bottom row: meta + actions + price */}
				<div className="mt-1 mb-1 block">
					<div className="flex items-center gap-3">
						<div className="flex items-center justify-start text-sm text-amber-500 pb-1.5">★ ★ ★ ★ ☆ <span className="text-xs text-slate-400 ml-1">4.6</span></div>
						<span className="text-xs text-slate-500">In stock</span>
					</div>

					<div className="block ">
						<div className="text-lg font-bold text-rose-600 ml-2">{currency} {price}</div>
						<button className="px-3 py-1 mr-3 text-sm bg-white border border-slate-200 rounded-md ">Wishlist</button>
						<button onClick={()=> {navigate(`/productdetails/${_id}`)}} className="px-3 py-1 text-sm bg-rose-600 text-white rounded-md">Add</button> 
						
					</div>
				</div>
			</div>
		</article>
	)
}

export default CollectionCard

