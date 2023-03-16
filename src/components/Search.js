import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore'
import React, { useContext, useState } from 'react'
import { db } from '../Firebase'
import { UserContext } from '../context/UserContext'

function Search() {
    const [term, setTerm] = useState("")
    const [result, setResult] = useState(null)
    const [notFound, setNotFound] = useState(false)

    const currentUser = useContext(UserContext)

    const handleSearch = async (e) => {
        const q = query(collection(db, "users"), where("displayName", '==', term))

        try {
            const querySnapshot = await getDocs(q)
            querySnapshot?.forEach(doc => setResult(doc.data()))
        } catch (error) {
            console.log(error)
        }
    }

    const handleClick = async () => {
        console.log(currentUser.uid + result.uid)

        //check to see if there is an exisitng chat between the users 
        const docSnap = await getDoc(doc(db, "chats", currentUser.uid + result.uid))
        // if there isn't, create the link in the 'chats' collection
        if (!docSnap.exists()) {
            try {
                await setDoc(doc(db, "chats", currentUser.uid + result.uid), { messages: [] })

                //create the link for the signed in user 
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [currentUser.uid + result.uid]: {
                        user: currentUser.displayName,
                        talkingToID: result.uid,
                        talkingTo: result.displayName,
                        photoURL: result.photoURL,
                        lastMessage: [],
                    },
                    timestamp: serverTimestamp()
                })
                //create the link for the selected user 
                await updateDoc(doc(db, "userChats", result.uid), {
                    [currentUser.uid + result.uid]: {
                        user: result.displayName,
                        talkingToID: currentUser.uid,
                        talkingTo: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                        lastMessage: [],
                    },
                    [(currentUser.uid + result.uid) + '.timestamp']: serverTimestamp()
                })
            } catch (error) {
                console.log(error)
            }
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
                <div className='search__result' onClick={handleClick}>
                    <img src={result.photoURL} alt="" />
                    <h3>{result.displayName}</h3>
                </div>
        }

    </div>
  )
}

export default Search