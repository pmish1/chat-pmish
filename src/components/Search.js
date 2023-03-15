import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import React, { useState } from 'react'
import { db } from '../Firebase'

function Search() {
    const [term, setTerm] = useState("")
    const [result, setResult] = useState(null)
    const [notFound, setNotFound] = useState(false)

    const handleSearch = async (e) => {
        const q = query(collection(db, "users"), where("displayName", '==', term))

        try {
            const querySnapshot = await getDocs(q)
            querySnapshot?.forEach(doc => setResult(doc.data()))
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='search'>
        <input 
            type="text" 
            placeholder='search profiles' 
            onChange={(e) => setTerm(e.target.value)}
            onKeyDown={(e) => (e.code === "Enter" && handleSearch())}
        />

        {
            result && 
                <div className='search__result'>
                    <img src={result.photoURL} alt="" />
                    <h3>{result.displayName}</h3>
                </div>
        }

    </div>
  )
}

export default Search