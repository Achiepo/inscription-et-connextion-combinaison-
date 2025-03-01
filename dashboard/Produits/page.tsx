"use client"
import React from 'react'
import AddProductForm from './AddProductForm'

export default function Produits() {
    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 gap-4">
                <div className="col-span-1">
                    <AddProductForm />
                </div>
            </div>
        </div>
    )
}

