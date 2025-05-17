//========================================================
//GENERAL DATABASE FUNCTIONS

import { article } from "@/interfaces/article";
import { supabase } from "./superbase";
import { order } from "@/interfaces/order";

//========================================================
export async function getData(table: string) {
  const { data, error } = await supabase.from(table).select("*");

  return data;
}

export async function getDataSpecific(table: string, id: string) {
  const { data, error } = await supabase.from(table).select("*").eq("id", id);

  if (error) console.error("Error fetching items:", error);
  return data?.at(0)
}

export async function deleteData(table: string) {}

export async function updateData(table: string, data_object: object ) {
  const { data, error } = await supabase
    .from(table)
    
    .upsert([data_object],{onConflict:"id"})

    .select();

  console.log(data);
  console.log(error);
}

//========================================================
//ARTICLE DATABASE FUNCTIONS
//========================================================

export async function saveArticle(data: article) {
  await updateData("articles", data);
}

export async function getArticles(): Promise<article[]> {
  const data = await getData("articles");

  if (data == null) return [];
  return Object.values(data as unknown as article[]);
}

export async function getArticle(id: string): Promise<article> {
  const data = await getDataSpecific("articles", id);
  return data as unknown as article;
}

//active
export async function setVisible(id:string, visible: boolean) {
  await updateData("articles", {id:id,  active: visible });
}

//---------------------------------------------------------
// ORDERS
//---------------------------------------------------------
export async function saveOrder(data: order) {

  await updateData("orders", data);
}
export async function getOrders(): Promise<order[]> {
  const data = await getData("orders");
  if (data == null) return [];
  return Object.values(data as unknown as order[]);
}
