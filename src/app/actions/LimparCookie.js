'use server'

import { cookies } from "next/headers"


export async function limparCookie(){
    const allCookies = cookies().getAll();
  allCookies.forEach(cookie => {
    cookies().set(cookie.name, '', { expires: new Date(0) });
  });
}