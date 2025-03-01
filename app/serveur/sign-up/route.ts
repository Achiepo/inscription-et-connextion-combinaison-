import { auth, database } from "@/db/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { NextResponse } from "next/server"

export const POST = async (req: Request) => {
    const {firstName, lastName, email, gender, country, city, address, accountType, password } = await req.json()
   try {
    const info = await createUserWithEmailAndPassword(auth,email,password)
    const id = info.user.uid
    const data = {firstName, lastName, email, gender, country, city, address, accountType, password, createDate: new Date(), id}
    //Créer un document dont c'est nous meme qui donnons l'id
    await setDoc(doc(database, "users", id), data)
    return NextResponse.json({data})
   } catch (error) {
    console.log(error)
    return NextResponse.json("Une erreur s'est produite")
   }
}