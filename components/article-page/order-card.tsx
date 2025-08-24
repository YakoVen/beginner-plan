"use client";

import { article } from "@/interfaces/article";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import wilaya_data from "@/assets/json/wilaya.json";
import commune_data from "@/assets/json/commune.json";
import { order } from "@/interfaces/order";
import { saveOrder } from "@/service/suberbase/databasehandle";
import { delivery_price } from "@/service/constants";

function OrderCard({ article }: { article: article }) {
  const [name, setName] = useState("");
  const [secname, setSecName] = useState("");
  const [wilaya, setWilaya] = useState<any>(null);
  const [commune, setCommune] = useState<any>(null);
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState(1);

  const [saving, setSaving] = useState(false);
  const [incomplete, setIncomplete] = useState(true);
  const [message, setMessage] = useState("");

  // Reset form
  const resetForm = () => {
    setName("");
    setSecName("");
    setPhone("");
    setAmount(1);
    setCommune(null);
    setWilaya(null);
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

  // Place order
  const PlaceOrder = async () => {
    if (incomplete) return;
    setSaving(true);

    try {
      const order: order = {
        id:
          "order-" +
          Date.now() +
          (Math.random() * 999999999).toFixed(0),
        date: new Date(),
        adress: wilaya.name + ", " + commune.name,
        command: {
          article_id: article.id,
          title: article.title,
          price: article.price,
          thumb: article.thumbnail,
        },
        name: name + " " + secname,
        phone,
        quantity: amount,
        state: 0,
      };

      await saveOrder(order);
      setMessage(
        "Votre commande a été envoyée. Notre équipe vous contactera le plus tôt possible pour confirmer."
      );
    } finally {
      setSaving(false);
    }
  };

  // Calculate total
  const total = article.price * amount + delivery_price;

  return (
    <div className="flex-grow p-6 border flex flex-col border-gray-400 overflow-auto rounded-xl">
      <div className="text-3xl py-4 font-bold">
        Prix unitaire: {article.price} dzd
      </div>

      <div className="p-6 border rounded-lg space-y-3">
        <div>
          <label>Nom</label>
          <InputText
            className="p-3 w-full border rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label>Prénom</label>
          <InputText
            className="p-3 w-full border rounded-md"
            value={secname}
            onChange={(e) => setSecName(e.target.value)}
          />
        </div>

        <div>
          <label>Téléphone</label>
          <InputText
            className="p-3 w-full border rounded-md"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
          />
        </div>

        <div>
          <label>Wilaya</label>
          <Dropdown
            value={wilaya}
            onChange={(e) => setWilaya(e.value)}
            options={wilaya_data}
            optionLabel="name"
            placeholder="Wilaya"
            className="p-3 w-full border rounded-md"
          />
        </div>

        <div>
          <label>Commune</label>
          <Dropdown
            value={commune}
            onChange={(e) => setCommune(e.value)}
            options={commune_data.filter(
              (c) => wilaya && c.wilaya_id === wilaya.id
            )}
            optionLabel="name"
            placeholder="Commune"
            className="p-3 w-full border rounded-md"
            disabled={!wilaya}
          />
        </div>

        <div>
          <label>Quantité</label>
          <InputText
            className="p-3 w-full border rounded-md"
            value={amount.toString()}
            onChange={(e) =>
              setAmount(Math.max(1, parseInt(e.target.value) || 1))
            }
          />
        </div>
      </div>

      {/* Total */}
      <div className="text-end p-3">
        Prix total :{" "}
        <span className="font-bold">{total} dzd</span>{" "}
        <span className="text-sm text-gray-600">
          (inclut {delivery_price} dzd frais de livraison)
        </span>
      </div>

      {/* Submit */}
      <div>
        <button
          disabled={saving || incomplete}
          onClick={PlaceOrder}
          className="disabled:opacity-40 p-3 w-full border rounded-xl border-black text-xl 
                     hover:bg-black hover:text-white transition"
        >
          {saving ? "Envoi en cours..." : "Commander !"}
        </button>
      </div>

      {/* Success Modal */}
      {message.length > 0 && (
        <div className="fixed h-screen w-screen top-0 left-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="p-10 shadow-2xl rounded-xl w-96 bg-white text-lg text-center">
            <div className="text-4xl mb-4">✅ Merci !</div>
            <p>{message}</p>
            <button
              onClick={() => {
                setMessage("");
                resetForm();
              }}
              className="border border-black hover:bg-black hover:text-white p-2 rounded-lg mt-6 w-full transition"
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
