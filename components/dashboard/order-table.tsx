"use client";

import { useEffect, useState, useRef } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { Nullable } from 'primereact/ts-helpers';
import { getOrders, saveOrder } from '@/service/firebase/database';
import { Order } from '@/interfaces/order';
import toast from 'react-hot-toast';

import CommandPreview from './command-preview';
import Image from 'next/image';
import CommandAmplifyed from './command-amplify';

export default function OrderTable() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [command, setCommand] = useState("");
    const [amplify, setAmplify] = useState<Order | null>(null);
    
    // Filters
    const [filtered, setFiltered] = useState<Order[]>([]);
    const [dateFilter, setDateFilter] = useState<Nullable<Date>>(null);
    const [nameFilter, setNameFilter] = useState("");
    const [stateFilter, setStateFilter] = useState(-1);
    
    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    
    const states = ["⚠️ en attente", "✅ Confirmée", "📤 envoyée", "❌ retour"];
    const loadedRef = useRef(false);

    useEffect(() => {
        if (!loadedRef.current) {
            loadedRef.current = true;
            getOrders().then((e) => {
                setOrders(e);
                setLoading(false);
            });
        }
        
        let f = [...orders];
        if (nameFilter.length > 0)
            f = f.filter((e) => e.name.toLowerCase().includes(nameFilter.toLowerCase()));
        if (dateFilter != null) {
            f = f.filter((e) => new Date(e.date).toDateString() === dateFilter.toDateString());
        }
        if (stateFilter >= 0)
            f = f.filter((e) => e.state === stateFilter);

        f.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

        setFiltered(f);
        // Reset to page 1 on filter change
        setCurrentPage(1);
    }, [orders, dateFilter, nameFilter, stateFilter]);

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filtered.length / itemsPerPage);

    const handleStateChange = async (order: Order, newStateStr: string) => {
        const newState = states.indexOf(newStateStr);
        if (newState === -1) return;
        
        const updatedOrder = { ...order, state: newState };
        
        // Optimistic update
        setOrders(prev => prev.map(o => o.id === order.id ? updatedOrder : o));
        
        try {
            await saveOrder(updatedOrder);
            toast.success('Statut de la commande mis à jour');
        } catch (error) {
            // Revert on error
            setOrders(prev => prev.map(o => o.id === order.id ? order : o));
            toast.error('Erreur lors de la mise à jour');
        }
    };

    const exportToCSV = () => {
        if (filtered.length === 0) {
            toast.error('Aucune donnée à exporter');
            return;
        }

        const headers = ["ID", "Nom", "Téléphone", "Article", "Quantité", "Prix Unitaire", "Total", "Adresse", "Date", "Statut"];
        const csvRows = [headers.join(",")];
        
        for (const o of filtered) {
            const values = [
                o.id,
                `"${o.name}"`,
                o.phone,
                `"${o.command.title}"`,
                o.quantity,
                o.command.price,
                o.command.price * o.quantity,
                `"${o.address}"`,
                `"${new Date(o.date).toLocaleDateString()}"`,
                `"${states[o.state]}"`
            ];
            csvRows.push(values.join(","));
        }
        
        const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `commandes_${new Date().toLocaleDateString()}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success('Export réussi');
    };

    if (loading) {
        return (
            <div className="py-6 px-3">
                <div className="h-10 bg-gray-200 rounded w-1/4 mb-6 animate-pulse"></div>
                <div className="p-3 mb-4 bg-gray-100 rounded-lg h-24 animate-pulse"></div>
                <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-24 bg-gray-100 rounded animate-pulse"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className='py-6 px-3 max-w-7xl mx-auto'>
            <div className='flex justify-between items-center mb-6'>
                <div className='text-3xl font-bold text-gray-800'>Les Commandes</div>
                <button 
                    onClick={exportToCSV}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    <i className="fa-solid fa-file-csv"></i>
                    Exporter CSV
                </button>
            </div>
            
            <div className='p-4 mb-6 bg-white w-full border border-gray-100 rounded-xl shadow-sm'>
                <div className='mb-3 font-semibold text-gray-700 flex items-center gap-2'>
                    <i className="fa-solid fa-filter text-blue-500"></i> Filtres
                </div>
                <div className='flex gap-3 flex-wrap'>
                    <InputText className="shadow-sm border border-gray-200 rounded px-3 py-2 w-full md:w-auto focus:border-blue-500 focus:ring-1 focus:ring-blue-500" value={nameFilter} placeholder='Rechercher par nom' onChange={(e) => setNameFilter(e.target.value)} />
                    <Calendar value={dateFilter} className='shadow-sm border border-gray-200 rounded px-3 py-2 w-full md:w-auto' placeholder='Filtrer par date' onChange={(e) => setDateFilter(e.value)} />
                    <Dropdown placeholder='Tous les états' className='shadow-sm border border-gray-200 rounded px-3 py-2 w-full md:w-auto' value={stateFilter >= 0 ? states[stateFilter] : ""} onChange={(e) => setStateFilter(states.indexOf(e.value))} options={["", ...states]} />
                    
                    {(nameFilter || dateFilter || stateFilter >= 0) && (
                        <button 
                            onClick={() => { setNameFilter(""); setDateFilter(null); setStateFilter(-1); }}
                            className="px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                        >
                            Réinitialiser
                        </button>
                    )}
                </div>
                <div className="mt-2 text-sm text-gray-500">
                    Affichage de {filtered.length} commande(s)
                </div>
            </div>

            <div className="space-y-4">
                {currentItems.map((e) => (
                    <div key={e.id} className='w-full'>
                        {/* Desktop Layout */}
                        <div className='hidden md:flex p-4 border border-gray-100 rounded-xl items-center gap-4 justify-between w-full bg-white shadow-sm hover:shadow-md transition-shadow'>
                            <div className='w-12 text-xs text-gray-400 font-mono'>{e.id.slice(0,5)}..</div>
                            <div className='w-32 font-medium'> {e.name} </div>
                            <div className='w-28 text-gray-600'> {e.phone} </div>
                            
                            <div className='flex-1 flex gap-3 items-center min-w-[250px]'>
                                <div className='h-12 w-16 relative rounded-lg overflow-hidden border border-gray-100 shrink-0'>
                                    <Image alt='' fill src={e.command.thumb} className='object-cover' />
                                </div>
                                <div className='flex flex-col text-sm'>
                                    <span className="line-clamp-1">{e.command.title}</span>
                                    <span>Qté: <span className='font-bold text-blue-600'>{e.quantity}</span></span>
                                </div>
                                <button onClick={() => setCommand(e.command.article_id)} className='ml-auto p-1.5 text-xs rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors'>
                                    <i className="fa-solid fa-eye"></i>
                                </button>
                            </div>

                            <div className='w-40 text-sm text-gray-600 line-clamp-2'> {e.address} </div>
                            
                            <div className='w-40'>
                                <Dropdown 
                                    value={states[e.state]} 
                                    onChange={(selected) => handleStateChange(e, selected.value)} 
                                    options={states} 
                                    className="w-full border border-gray-200 rounded text-sm py-1 px-2" 
                                />
                            </div>

                            <div>
                                <button onClick={() => setAmplify(e)} className='bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium'>
                                    Amplifier
                                </button>
                            </div>
                        </div>
                        
                        {/* Mobile Layout */}
                        <div className="md:hidden flex flex-col p-4 border border-gray-100 rounded-xl shadow-sm gap-3 bg-white">
                            <div className="flex justify-between items-center border-b pb-2">
                                <div className="font-bold">{e.name}</div>
                                <div className="text-gray-600 font-medium text-sm">{e.phone}</div>
                            </div>
                            
                            <div className="flex gap-3 items-center">
                                <div className="h-16 w-16 relative rounded-lg overflow-hidden shrink-0 border border-gray-100">
                                    <Image alt="" fill src={e.command.thumb} className="object-cover" />
                                </div>
                                <div className="flex flex-col flex-grow">
                                    <div className="font-medium text-sm line-clamp-2">{e.command.title}</div>
                                    <div className="text-gray-600 text-sm mt-1">Qté: <span className="font-bold text-blue-600 text-lg ml-1">{e.quantity}</span></div>
                                </div>
                            </div>
                            
                            <div className="text-sm text-gray-700 bg-gray-50 p-2 rounded-lg border border-gray-100 flex items-start gap-2">
                                <i className="fa-solid fa-location-dot mt-1 text-gray-400"></i>
                                <span>{e.address}</span>
                            </div>
                            
                            <div className="flex flex-col gap-2 mt-1">
                                <Dropdown 
                                    className="w-full shadow-sm border border-gray-200 rounded" 
                                    value={states[e.state]} 
                                    onChange={(selected) => handleStateChange(e, selected.value)} 
                                    options={states} 
                                />
                                
                                <div className="flex gap-2">
                                    <button onClick={() => setCommand(e.command.article_id)} className="flex-1 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium">
                                        Voir Produit
                                    </button>
                                    <button onClick={() => setAmplify(e)} className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors text-sm">
                                        Amplifier
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                
                {filtered.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-xl border border-gray-100 text-gray-500">
                        <i className="fa-solid fa-inbox text-4xl mb-3 text-gray-300"></i>
                        <p>Aucune commande trouvée</p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                    <button 
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 rounded-md border disabled:opacity-50 hover:bg-gray-50"
                    >
                        Précédent
                    </button>
                    <div className="flex gap-1">
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`w-8 h-8 rounded-md flex items-center justify-center text-sm ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 text-gray-600'}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                    <button 
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 rounded-md border disabled:opacity-50 hover:bg-gray-50"
                    >
                        Suivant
                    </button>
                </div>
            )}

            {command.length > 0 && <CommandPreview article_id={command} close={() => setCommand("")} />}
            {amplify && <CommandAmplifyed order={amplify} article_id={amplify.command.article_id} close={() => setAmplify(null)} />}
        </div>
    );
}