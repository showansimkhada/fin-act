import { TaxInfo } from '@/lib/definitions';
import clientPromise from '@/lib/mongodb';
const client = await clientPromise;
const database = client.db(process.env.DB_NAME!);
const tax = database.collection(process.env.TAX_COLLECTION_NAME!);

export async function fetchTax(user: any): Promise<TaxInfo[]> {
  const data = await tax.find({username: user}).project({_id: 0, username: 0}).toArray()
  if (!data) console.log('Error in connection.')
  return data as TaxInfo[];
}