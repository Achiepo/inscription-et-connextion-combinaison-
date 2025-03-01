import { firebaseConfig } from "@/db/firebase";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        // Log l'objet pour voir sa structure
        console.log("firebaseConfig: ", firebaseConfig);

        // Tente de sérialiser l'objet pour voir si ça marche
        JSON.stringify(firebaseConfig); // Vérifie si cela passe sans erreur

        return NextResponse.json(firebaseConfig);
    } catch (error) {
        console.error("Erreur lors de la sérialisation");
        return NextResponse.json({ error: "Erreur de sérialisation" });
    }
};
