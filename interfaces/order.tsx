export interface order {
  id: string;
  date: Date;
  name: string;
  phone: string;
  command: {article_id:string,title:string , price:number ,thumb:string};
  quantity: number;
  adress: string;
  state:number;
}
