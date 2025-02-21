'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useRouter } from "next/navigation"



type Gender = 'homme' | 'femme' | 'autre';
type AccountType = 'client' | 'vendeur';

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    gender: Gender;
    country: string;
    city: string;
    address: string;
    accountType: AccountType;
    password: string;
}

export default function Home() {
    const [step, setStep] = useState(1);
    const redirecte = useRouter();

    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        gender: 'autre',
        country: '',
        city: '',
        address: '',
        accountType: 'client',
        password: '',
    });
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});


    // Fonction pour la soumission du formulaire
    const [message, setMessage] = useState("");
    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage(""); // Réinitialisation du message

        try {

            const req = await fetch("/serveur/sign-up", {
                headers: { "Content-type": "application/json" },
                method: "Post",
                body: JSON.stringify({ formData })
            })

            const res = await req.json()
            // Vérification des champs requis
            if (res && res.data) {
                console.log(res.data)
                // Si l'utilisateur existe dans Firestore, rediriger
                setMessage("Connexion réussie !")
                localStorage.setItem("user", JSON.stringify(res.data))
                redirecte.push("/dashboard"); // Redirection vers le dashboard

                return;
            } else {
                console.log(res)
                setMessage("création avec succès")
            }

        } catch (error: any) {
            console.error("Erreur lors de la connexion");

            // Gestion des erreurs Firebase Auth
            if (error.code === "auth/user-not-found") {
                setMessage("Aucun compte trouvé avec cet email.");

            } else if (error.code === "auth/wrong-password") {
                setMessage("Mot de passe incorrect.");

            } else if (error.code === "auth/network-request-failed") {
                setMessage("Problème de connexion internet.");

            } else if (error.code === "auth/invalid-credential") {
                setMessage("Identifiants invalides. Veuillez vous inscrire.");
            } else {
                setMessage("Erreur lors de la connexion. Vérifiez vos identifiants.");
            }
        }
    };



    const totalSteps = 4;

    const validateStep = () => {
        const newErrors: Partial<Record<keyof FormData, string>> = {};

        switch (step) {
            case 1:
                if (!formData.firstName) newErrors.firstName = "Le prénom est obligatoire";
                if (!formData.lastName) newErrors.lastName = "Le nom de famille est obligatoire";
                if (!formData.email) newErrors.email = "L'email est obligatoire";
                else if (!/\S+@\S+\.\S+/.test(formData.email))
                    newErrors.email = "Format d'email invalide";
                break;
            case 2:
                if (!formData.country) newErrors.country = "Le pays est obligatoire";
                if (!formData.city) newErrors.city = "La ville est obligatoire";
                if (!formData.address) newErrors.address = "L'adresse est obligatoire";
                break;
            case 3:
                if (!formData.accountType) newErrors.accountType = "Le type de compte est obligatoire";
                break;
            case 4:
                if (!formData.password) newErrors.password = "Le mot de passe est obligatoire";
                else if (formData.password.length < 8)
                    newErrors.password = "Le mot de passe doit contenir au moins 8 caractères";
                break;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep()) {
            if (step < totalSteps) {
                setStep(step + 1);
            } else {
                handleSubmit();
            }
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleSubmit = () => {
        console.log('donnée envoyer:', formData);
        alert('Inscription réussie !');
    };

    const inputClassName = (error?: string) =>
        `w-full px-4 py-2 rounded-lg border ${error ? 'border-red-500' : 'border-gray-300'
        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`;
        

    const renderStep1 = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Prénom
                    </label>
                    <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className={inputClassName(errors.firstName)}
                        placeholder="Votre prénom"
                    />
                    {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Nom de famille
                    </label>
                    <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className={inputClassName(errors.lastName)}
                        placeholder="Votre nom de famille"
                    />
                    {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
                </div>
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Genre</label>
                <div className="flex space-x-4">
                    {(['homme', 'femme', 'autre'] as const).map((gender) => (
                        <label key={gender} className="flex items-center space-x-2">
                            <input
                                type="radio"
                                checked={formData.gender === gender}
                                onChange={() => setFormData({ ...formData, gender })}
                                className="text-blue-500 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700 capitalize">{gender}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={inputClassName(errors.email)}
                    placeholder="votre@email.com"
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-6">
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                    Pays
                </label>
                <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className={inputClassName(errors.country)}
                    placeholder="Votre pays"
                />
                {errors.country && <p className="text-sm text-red-500">{errors.country}</p>}
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                    Ville
                </label>
                <input type="text" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className={inputClassName(errors.city)}
                    placeholder="Votre ville"
                />
                {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                    Adresse
                </label>
                <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className={inputClassName(errors.address)}
                    placeholder="Votre adresse"
                />
                {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className="space-y-6">
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                    Type de compte
                </label>
                <div className="space-y-4">
                    {(['client', 'vendeur'] as const).map((type) => (
                        <label key={type} className="flex items-center space-x-2">
                            <input
                                type="radio"
                                checked={formData.accountType === type}
                                onChange={() => setFormData({ ...formData, accountType: type })}
                                className="text-blue-500 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700 capitalize">
                                Compte {type}
                            </span>
                        </label>
                    ))}
                </div>
                {errors.accountType && <p className="text-sm text-red-500">{errors.accountType}</p>}
            </div>
        </div>
    );

    const renderStep4 = () => (
        <div className="space-y-6">
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                    Mot de passe
                </label>
                <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={inputClassName(errors.password)}
                    placeholder="Votre mot de passe"
                />
                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>
        </div>
    );

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Créez votre compte
                    </h1>
                    <p className="text-gray-600 mb-4">
                        Étape {step} sur {totalSteps}
                    </p>

                    {/* Progress bar */}
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-500 transition-all duration-300"
                            style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
                        />
                    </div>
                </div>

                <div className="mb-8">
                    {step === 1 && renderStep1()}
                    {step === 2 && renderStep2()}
                    {step === 3 && renderStep3()}
                    {step === 4 && renderStep4()}
                </div>

                <div className="flex justify-between"> <button onClick={handleBack}className={`flex items-center px-4 py-2 rounded-lg transition-colors ${step === 1
                 ? 'text-gray-400 cursor-not-allowed'
                 : 'text-gray-600 hover:bg-gray-100' }`}disabled={step === 1}><ChevronLeft className="w-5 h-5 mr-2" />
                        Retour
                    </button>

                    <button onClick={handleNext} className="flex items-center px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                        {message || (step === totalSteps ? (
                            <>
                                Soumettre <Check className="w-5 h-5 ml-2" />
                            </>
                        ) : (
                            <>
                                Suivant
                                <ChevronRight className="w-5 h-5 ml-2" />
                            </>
                        ))}
                    </button>

                </div>
            </div>
        </main>
    );
}