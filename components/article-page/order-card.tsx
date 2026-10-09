"use client";

import { Article } from "@/interfaces/article";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import wilaya_data from "@/assets/json/wilaya.json";
import commune_data from "@/assets/json/commune.json";
import { createOrder } from '@/app/actions/orders';
import { delivery_price } from "@/service/constants";

function OrderCard({ article }: { article: Article }) {
  const [name, setName] = useState("");
  const [secname, setSecName] = useState("");
  const [wilaya, setWilaya] = useState<any>(null);
  const [commune, setCommune] = useState<any>(null);
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState(1);

  const [saving, setSaving] = useState(false);
  const [incomplete, setIncomplete] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Live delivery quote for the selected wilaya, with the flat configured
  // price as fallback so the form never blocks on a third party.
  const [quotedFee, setQuotedFee] = useState<number | null>(null);

  useEffect(() => {
    if (!wilaya) {
      setQuotedFee(null);
      return;
    }
    let cancelled = false;
    fetch("/api/shipping/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wilayaCode: Number(wilaya.code) }),
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled && data && Number.isFinite(data.deliveryFee)) {
          setQuotedFee(data.deliveryFee);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [wilaya]);

  // Reset form
  const resetForm = () => {
    setName("");
    setSecName("");
    setPhone("");
    setAmount(1);
    setCommune(null);
    setWilaya(null);
    setOrderId("");
  };

  // Validation
  useEffect(() => {
    const f =
      name.trim().length === 0 ||
      secname.trim().length === 0 ||
      !wilaya ||
      !commune ||
      phone.trim().length === 0 ||
      !amount ||
      amount <= 0;
    setIncomplete(f);
  }, [name, secname, wilaya, commune, phone, amount]);

  // Confirm order step
  const confirmOrder = () => {
    if (incomplete) return;
    setShowConfirmation(true);
  };

  // Place order
  const PlaceOrder = async () => {
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const result = await createOrder({
        name: name + " " + secname,
        phone,
        address: wilaya.name + ", " + commune.name,
        wilayaCode: Number(wilaya.code),
        communeName: commune.name,
        articleId: article.id,
        articleTitle: article.title,
        articlePrice: article.price,
        articleThumb: article.thumbnail,
        quantity: amount,
      });

      if (!result.success) {
        setError(result.error || "Une erreur s'est produite lors de la création de la commande.");
        setShowConfirmation(false);
      } else {
        setOrderId(result.orderId || "");
        setShowConfirmation(false);
        setMessage(
          "Votre commande a été envoyée. Notre équipe vous contactera le plus tôt possible pour confirmer."
        );
      }
    } catch (e) {
      setError("Erreur de connexion. Veuillez réessayer.");
      setShowConfirmation(false);
    } finally {
      setSaving(false);
    }
  };

  // Calculate total. The quoted courier fee wins when available; the flat
  // configured price is the fallback when the gateway is unreachable.
  const deliveryFee = quotedFee ?? delivery_price;
  const total = article.price * amount + deliveryFee;
  const phoneDigits = phone.replace(/\D/g, "");
  const phoneValid = /^0[5-7][0-9]{8}$/.test(phoneDigits);

  return (
    <div className="w-full lg:w-[400px] xl:w-[440px] shrink-0 lg:sticky lg:top-24 self-start p-6 md:p-7 bg-white shadow-xl rounded-2xl flex flex-col gap-5 border-2 border-blue-100">
      {/* COD header — price + trust */}
      <div className="rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-blue-100/50 p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-medium text-blue-900">Prix unitaire:</span>
          <span className="font-extrabold text-xl text-blue-800 whitespace-nowrap">{article.price} DZD</span>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-full font-semibold text-green-700 border border-green-200">
            <i className="fa-solid fa-money-bill-wave"></i> Paiement à la livraison
          </span>
          <span className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-full font-semibold text-blue-700 border border-blue-200">
            <i className="fa-solid fa-phone"></i> Confirmation par téléphone
          </span>
        </div>
      </div>

      <h3 className="text-lg font-extrabold text-gray-900 -mb-1">Informations de livraison</h3>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1.5">Nom *</label>
          <InputText
            className="p-3 w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow text-base"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex. Benali"
            autoComplete="family-name"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1.5">Prénom *</label>
          <InputText
            className="p-3 w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow text-base"
            value={secname}
            onChange={(e) => setSecName(e.target.value)}
            placeholder="Ex. Yacine"
            autoComplete="given-name"
          />
        </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1.5">Téléphone *</label>
          <div className="relative">
          <InputText
            className={`p-3 w-full border rounded-xl focus:ring-2 transition-shadow text-base pr-10 ${phone.length === 0 ? 'border-gray-300 focus:ring-blue-500 focus:border-blue-500' : phoneValid ? 'border-green-500 focus:ring-green-500 focus:border-green-500 bg-green-50/30' : 'border-red-400 focus:ring-red-500 focus:border-red-500 bg-red-50/30'}`}
            type="tel"
            inputMode="numeric"
            placeholder="0551234567"
            pattern="0[5-7][0-9]{8}"
            title="Numéro algérien : 05, 06 ou 07 suivi de 8 chiffres"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
            autoComplete="tel"
          />
          {phone.length > 0 && (
            <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-lg ${phoneValid ? 'text-green-600' : 'text-red-400'}`}>
              <i className={`fa-solid ${phoneValid ? 'fa-circle-check' : 'fa-circle-exclamation'}`}></i>
            </span>
          )}
          </div>
          <p className={`text-xs mt-1.5 ${phone.length > 0 && !phoneValid ? 'text-red-600 font-medium' : 'text-gray-500'}`}>Format 05/06/07 + 8 chiffres. Le transporteur vous appellera sur ce numéro.</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1.5">Wilaya *</label>
          <Dropdown
            value={wilaya}
            onChange={(e) => { setWilaya(e.value); setCommune(null); }}
            options={wilaya_data}
            optionLabel="name"
            filter filterPlaceholder="Rechercher wilaya..."
            placeholder="Sélectionnez votre wilaya"
            className="w-full border border-gray-300 rounded-xl flex items-center text-base"
            pt={{
              input: { className: 'p-3 text-base' },
              trigger: { className: 'w-12 flex items-center justify-center' }
            }}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1.5">Commune *</label>
          <Dropdown
            value={commune}
            onChange={(e) => setCommune(e.value)}
            options={commune_data.filter(
              (c) => wilaya && c.wilaya_id === wilaya.id
            )}
            optionLabel="name"
            filter filterPlaceholder="Rechercher commune..."
            placeholder={wilaya ? "Sélectionnez votre commune" : "Choisissez d'abord la wilaya"}
            className="w-full border border-gray-300 rounded-xl flex items-center text-base"
            disabled={!wilaya}
            pt={{
              input: { className: 'p-3 text-base' },
              trigger: { className: 'w-12 flex items-center justify-center' }
            }}
          />
        </div>

        <div className="flex items-center justify-between gap-4 bg-gray-50 p-3 rounded-xl border border-gray-100">
          <label className="text-sm font-semibold text-gray-800">Quantité *</label>
          <div className="flex items-center gap-3">
            <button 
              type="button"
              aria-label="Diminuer quantité"
              onClick={() => setAmount(prev => Math.max(1, prev - 1))}
              className="w-11 h-11 flex items-center justify-center border border-gray-300 rounded-xl bg-white hover:bg-gray-100 active:scale-95 transition"
            >
              <i className="fa-solid fa-minus"></i>
            </button>
            <span className="text-xl font-extrabold w-8 text-center tabular-nums">{amount}</span>
            <button 
              type="button"
              aria-label="Augmenter quantité"
              onClick={() => setAmount(prev => Math.min(10, prev + 1))}
              className="w-11 h-11 flex items-center justify-center border border-gray-300 rounded-xl bg-white hover:bg-gray-100 active:scale-95 transition"
            >
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Total Card */}
      <div className="bg-gray-900 text-white p-5 rounded-xl mt-1 shadow-inner">
        <div className="flex justify-between items-center mb-2 text-sm">
          <span className="text-gray-300">Sous-total ({amount} article{amount > 1 ? 's' : ''})</span>
          <span className="font-semibold tabular-nums">{article.price * amount} DZD</span>
        </div>
        <div className="flex justify-between items-center mb-3 text-sm">
          <span className="text-gray-300">Frais de livraison {wilaya ? `• ${wilaya.name}` : ''}</span>
          <span className="font-semibold tabular-nums">{deliveryFee} DZD</span>
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-white/15">
          <span className="font-bold text-base">Total à payer</span>
          <span className="font-extrabold text-2xl text-green-400 tabular-nums">{total} DZD</span>
        </div>
      </div>

      {/* Submit */}
      <div className="mt-1">
        <button
          disabled={incomplete || saving}
          onClick={confirmOrder}
          className="disabled:opacity-50 disabled:cursor-not-allowed w-full bg-blue-600 text-white text-lg font-extrabold py-4 rounded-xl hover:bg-blue-700 active:scale-[0.99] transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          <i className="fa-solid fa-bag-shopping"></i>
          Commander • {total} DZD
        </button>
        {incomplete && (
          <p className="text-xs text-center text-gray-500 mt-2">Remplissez nom, téléphone valide, wilaya, commune pour commander.</p>
        )}
        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[11px] text-gray-600">
          <div className="bg-gray-50 rounded-lg py-2 px-1 border border-gray-100"><i className="fa-solid fa-truck-fast block text-sm mb-1 text-green-700"></i>58 wilayas</div>
          <div className="bg-gray-50 rounded-lg py-2 px-1 border border-gray-100"><i className="fa-solid fa-cash-register block text-sm mb-1 text-green-700"></i>Cash à réception</div>
          <div className="bg-gray-50 rounded-lg py-2 px-1 border border-gray-100"><i className="fa-solid fa-phone-volume block text-sm mb-1 text-green-700"></i>On vous appelle</div>
        </div>
      </div>
      
      {error && (
        <div className="text-red-500 mt-4 text-center">{error}</div>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed h-screen w-screen top-0 left-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="p-8 shadow-2xl rounded-xl w-[90%] max-w-md bg-white">
            <h3 className="text-2xl font-bold mb-4">Confirmer votre commande</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex gap-4 items-center">
                <img src={article.thumbnail} alt={article.title} className="w-16 h-16 object-cover rounded-md" />
                <div>
                  <div className="font-semibold">{article.title}</div>
                  <div className="text-sm text-gray-600">Quantité: {amount}</div>
                </div>
              </div>
              
              <div className="border-t border-b py-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Sous-total:</span>
                  <span>{article.price * amount} dzd</span>
                </div>
                <div className="flex justify-between">
                  <span>Livraison:</span>
                  <span>{deliveryFee} dzd</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2">
                  <span>Total:</span>
                  <span>{total} dzd</span>
                </div>
              </div>
              
              <div className="text-sm bg-gray-50 p-3 rounded-md">
                <div className="font-semibold mb-1">Informations de livraison</div>
                <div>{name} {secname}</div>
                <div>{phone}</div>
                <div>{wilaya?.name}, {commune?.name}</div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                disabled={saving}
                onClick={() => setShowConfirmation(false)}
                className="flex-1 p-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
              >
                Modifier
              </button>
              <button
                disabled={saving}
                onClick={PlaceOrder}
                className="flex-1 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                {saving ? "Envoi..." : "Confirmer"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {message.length > 0 && (
        <div className="fixed h-screen w-screen top-0 left-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="p-10 shadow-2xl rounded-xl w-96 bg-white text-lg text-center">
            <div className="text-4xl mb-4">✅ Merci !</div>
            <p className="mb-4">{message}</p>
            {orderId && (
              <div className="bg-gray-100 p-3 rounded-lg flex items-center justify-between border border-gray-200">
                <span className="font-mono font-semibold text-sm">Réf: {orderId}</span>
                <button 
                  onClick={() => navigator.clipboard.writeText(orderId)}
                  className="text-gray-500 hover:text-black"
                  title="Copier"
                >
                  <i className="fa-solid fa-copy"></i>
                </button>
              </div>
            )}
            <button
              onClick={() => {
                setMessage("");
                resetForm();
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg mt-6 w-full transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderCard;
