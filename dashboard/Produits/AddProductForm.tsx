"use client"
import React, { useState, useRef } from 'react'
import { Card, Text, Button, Group, Container } from '@mantine/core'
import { Dropzone } from '@mantine/dropzone'
import { IconPhoto, IconUpload, IconBrandTelegram } from '@tabler/icons-react'

function AddProductForm() {
    const openRef = useRef<() => void>(null)
    const [codeProduit, setCodeProduit] = useState("")
    const [nomProduit, setNomProduit] = useState("")
    const [descriptionProduit, setDescriptionProduit] = useState("")
    const [prix, setPrix] = useState("")
    const [typeVente, setTypeVente] = useState("")
    const [devise, setDevise] = useState("")
    const [qte, setQte] = useState("")
    const [date, setDate] = useState("")
    const [lieu, setLieu] = useState("")
    const [load, setLoad] = useState(false)
    const [message, setMessage] = useState("")

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoad(true)
        setMessage("")
        try {
            const data = { nomProduit, codeProduit, descriptionProduit, prix, typeVente, devise, qte, date }
            const req = await fetch("/api/prouct-routes/add-product", {
                headers: { "Content-type": "application/json" },
                method: "POST",
                body: JSON.stringify(data)
            })

            const res = await req.json()
            setLoad(false)
            if (res && res.data) {
                setMessage("Produit ajouté avec succès")
            } else {
                setMessage("Erreur lors de l'ajout du produit")
            }
        } catch (error) {
            console.log(error)
            setLoad(false)
            setMessage("Erreur lors de l'ajout du produit")
        }
    }

    return (
        <Container size="lg" className="py-8 px-4">
            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Ajouter un Nouveau Produit</h2>
                <p className="text-gray-600 mt-2">Veuillez remplir les informations ci-dessous pour ajouter votre produit.</p>
            </div>

            {/* Form */}
            <form onSubmit={submitForm}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Information de base */}
                    <Card shadow="sm" padding="lg" radius="md" withBorder className="flex flex-col space-y-6">
                        <h4 className="text-xl font-semibold text-gray-800">Informations de base</h4>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="produit" className="block text-sm font-medium text-gray-600">Nom du produit</label>
                                <input
                                    type="text"
                                    id="produit"
                                    className="form-input p-3 w-full border-gray-300 rounded-md shadow-sm"
                                    placeholder="Entrer le nom du produit"
                                    onChange={(e) => setNomProduit(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="code" className="block text-sm font-medium text-gray-600">Code du produit</label>
                                <input
                                    type="text"
                                    id="code"
                                    className="form-input p-3 w-full border-gray-300 rounded-md shadow-sm"
                                    placeholder="Entrer le code du produit"
                                    onChange={(e) => setCodeProduit(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-600">Description produit</label>
                                <textarea
                                    id="description"
                                    rows={3}
                                    className="form-input p-3 w-full border-gray-300 rounded-md shadow-sm"
                                    placeholder="Ajouter une brève description"
                                    onChange={(e) => setDescriptionProduit(e.target.value)}
                                />
                            </div>
                        </div>
                    </Card>

                    {/* Image produit */}
                    <Card shadow="sm" padding="lg" radius="md" withBorder className="flex flex-col space-y-6">
                        <h4 className="text-xl font-semibold text-gray-800">Ajoutez une image</h4>
                        <Dropzone openRef={openRef} onDrop={() => { }} radius="md" maxSize={30 * 1024 ** 2} className="dropzone-dashed mb-4">
                            <Group justify="center" className="flex-col items-center text-center">
                                <IconPhoto size={60} className="text-gray-500" />
                                <Text size="sm" color="dimmed" className="mb-2">
                                    Glissez-déposez des images ici ou cliquez pour sélectionner des fichiers.
                                </Text>
                                <Button variant="light" onClick={() => openRef.current?.()} className="bg-blue-600 text-white hover:bg-blue-700">
                                    Sélectionner une image <IconUpload size={20} className="ml-2" />
                                </Button>
                            </Group>
                        </Dropzone>
                        <Text size="sm" color="dimmed" className="text-center">
                            Chaque fichier ne doit pas dépasser 30 Mo.
                        </Text>
                    </Card>
                </div>

                {/* Prix et Quantité */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                    <Card shadow="sm" padding="lg" radius="md" withBorder className="flex flex-col space-y-6">
                        <h4 className="text-xl font-semibold text-gray-800">Prix et Quantité</h4>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="prix" className="block text-sm font-medium text-gray-600">Prix unitaire</label>
                                <input
                                    type="number"
                                    id="prix"
                                    className="form-input p-3 w-full border-gray-300 rounded-md shadow-sm"
                                    placeholder="Entrer le prix du produit"
                                    onChange={(e) => setPrix(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="devise" className="block text-sm font-medium text-gray-600">Devise</label>
                                <select
                                    id="devise"
                                    className="form-select p-3 w-full border-gray-300 rounded-md shadow-sm"
                                    onChange={(e) => setDevise(e.target.value)}
                                >
                                    <option value="FCFA">FCFA</option>
                                    <option value="$">$</option>
                                    <option value="€">€</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="qte" className="block text-sm font-medium text-gray-600">Quantité</label>
                                <input
                                    type="number"
                                    id="qte"
                                    className="form-input p-3 w-full border-gray-300 rounded-md shadow-sm"
                                    placeholder="Quantité du produit"
                                    onChange={(e) => setQte(e.target.value)}
                                />
                            </div>
                        </div>
                    </Card>

                    {/* Type de vente et Date */}
                    <Card shadow="sm" padding="lg" radius="md" withBorder className="flex flex-col space-y-6">
                        <h4 className="text-xl font-semibold text-gray-800">Type de vente et Date</h4>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="typeVente" className="block text-sm font-medium text-gray-600">Type de vente</label>
                                <select
                                    id="typeVente"
                                    className="form-select p-3 w-full border-gray-300 rounded-md shadow-sm"
                                    onChange={(e) => setTypeVente(e.target.value)}
                                >
                                    <option value="1">Vente en détail</option>
                                    <option value="2">Vente en gros</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="date" className="block text-sm font-medium text-gray-600">Date de publication</label>
                                <input
                                    type="date"
                                    id="date"
                                    className="form-input p-3 w-full border-gray-300 rounded-md shadow-sm"
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Soumission du formulaire */}
                <div className="mt-8 text-center">
                    <Button
                        type="submit"
                        className={`w-full ${load ? 'bg-blue-400' : 'bg-blue-600'} text-white py-3 px-6 rounded-full font-semibold`}
                        loading={load}
                        disabled={load}
                    >
                        {load ? 'Traitement en cours...' : 'Ajouter un produit'} <IconBrandTelegram size={24} className="ml-2" />
                    </Button>
                </div>

                {/* Message de retour */}
                {message && <div className="mt-6 text-center"><p className="text-sm font-semibold text-red-500">{message}</p></div>}
            </form>
        </Container>
    )
}

export default AddProductForm;
